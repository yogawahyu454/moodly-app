<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User;
use App\Models\DurasiKonseling;
use App\Models\Booking;
use App\Models\CounselorAvailability;
use App\Models\PaymentMethod; // <-- Import untuk QRIS
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Carbon\CarbonInterval;

class BookingFlowController extends Controller
{
    /**
     * Mengambil daftar tempat konseling yang aktif.
     * GET /api/booking/tempat-konseling
     */
    public function getTempatKonseling()
    {
        try {
            $tempatList = TempatKonseling::where('status', 'Aktif')
                ->select('id', 'nama_tempat', 'alamat', 'image', 'rating', 'review_count')
                ->orderBy('nama_tempat')
                ->get();
            return response()->json($tempatList);
        } catch (\Exception $e) {
            Log::error('Error fetching tempat konseling list:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil data tempat konseling.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil detail satu tempat konseling.
     * GET /api/booking/tempat-konseling/{tempatKonseling}
     */
    public function getTempatDetail(TempatKonseling $tempatKonseling)
    {
        try {
            Log::info('Tempat Detail fetched:', $tempatKonseling->toArray());
            return response()->json($tempatKonseling);
        } catch (\Exception $e) {
            Log::error('Error fetching tempat detail:', ['id' => $tempatKonseling->id ?? null, 'error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil detail tempat konseling.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil daftar konselor yang aktif dan terverifikasi.
     * GET /api/booking/counselors
     */
    public function getCounselors(Request $request)
    {
        try {
            $query = User::where('role', 'konselor')
                ->where('status', 'Terverifikasi')
                ->select('id', 'name', 'avatar', 'universitas', 'spesialisasi', 'rating');

            $counselors = $query->orderBy('name')->get();
            return response()->json($counselors);
        } catch (\Exception $e) {
            Log::error('Error fetching counselors list:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil data konselor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil detail satu konselor.
     * GET /api/booking/counselors/{konselor}
     */
    public function showCounselor(User $konselor)
    {
        try {
            if ($konselor->role !== 'konselor' || $konselor->status !== 'Terverifikasi') {
                return response()->json(['message' => 'Konselor tidak ditemukan atau tidak aktif.'], 404);
            }

            $konselorData = $konselor->only([
                'id',
                'name',
                'avatar', // Akan otomatis di-append oleh $appends di Model
                'universitas',
                'spesialisasi',
                'rating',
                'surat_izin_praktik',
            ]);

            // TODO: Ini masih hardcoded, bisa diganti nanti
            $konselorData['servesVia'] = ['Chat', 'Video Call', 'Voice Call', 'Tatap Muka'];
            $konselorData['reviews'] = '(200+ ulasan)'; // Hardcoded

            Log::info('Counselor Detail fetched:', $konselorData);
            return response()->json($konselorData);
        } catch (\Exception $e) {
            Log::error('Error fetching counselor detail:', ['id' => $konselor->id ?? null, 'error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil detail konselor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // --- METHOD JADWAL DINAMIS ---
    /**
     * Mengambil opsi durasi dan jadwal dinamis untuk konselor tertentu.
     * GET /api/booking/counselors/{konselor}/schedule-options
     */
    public function getScheduleOptions(User $konselor)
    {
        try {
            // Validasi
            if ($konselor->role !== 'konselor' || $konselor->status !== 'Terverifikasi') {
                return response()->json(['message' => 'Konselor tidak ditemukan atau tidak aktif.'], 404);
            }

            // 1. Ambil Durasi Konseling
            $durations = DurasiKonseling::select('id', 'durasi_menit', 'harga')
                ->orderBy('harga')
                ->get();

            if ($durations->isEmpty()) {
                Log::warning('Tidak ada data DurasiKonseling di database.');
                return response()->json(['message' => 'Data durasi konseling tidak ditemukan.'], 404);
            }

            // Dapatkan durasi terpendek untuk interval (fallback ke 60 menit)
            $minDuration = $durations->min('durasi_menit');
            $interval = CarbonInterval::minutes($minDuration ?? 60);

            // 2. Ambil Ketersediaan Konselor
            $availabilities = CounselorAvailability::where('counselor_id', $konselor->id)
                ->get()
                ->keyBy('day_of_week'); // Kunci berdasarkan hari (0=Minggu, 1=Senin, ...)

            // 3. Ambil Booking Mendatang (untuk filter slot)
            $upcomingBookings = Booking::where('konselor_id', $konselor->id)
                ->where('tanggal_konsultasi', '>=', Carbon::today())
                ->whereIn('status_pesanan', ['Dijadwalkan', 'Aktif', 'Menunggu Pembayaran'])
                ->with('durasiKonseling:id,durasi_menit') // Eager load durasi
                ->get(['id', 'tanggal_konsultasi', 'jam_konsultasi', 'durasi_konseling_id']);

            $bookedSlots = [];
            foreach ($upcomingBookings as $booking) {
                // Pastikan durasiKonseling ada
                if (!$booking->durasiKonseling) continue;

                $startTime = Carbon::parse($booking->jam_konsultasi);
                $durationMinutes = $booking->durasiKonseling->durasi_menit;
                $endTime = $startTime->copy()->addMinutes($durationMinutes);

                // Buat daftar semua slot yang terisi oleh booking ini
                $currentSlot = $startTime->copy();
                while ($currentSlot < $endTime) {
                    $bookedSlots[$booking->tanggal_konsultasi . '_' . $currentSlot->format('H:i')] = true;
                    $currentSlot->add($interval);
                }
            }


            // 4. Generate Tanggal (7 hari ke depan)
            $availableDates = [];
            $today = Carbon::today();

            for ($i = 0; $i < 7; $i++) {
                $date = $today->copy()->addDays($i);
                $dayOfWeek = $date->dayOfWeek; // 0=Minggu, 1=Senin, ...

                // Cek apakah konselor tersedia di hari ini
                if (isset($availabilities[$dayOfWeek])) {
                    $availability = $availabilities[$dayOfWeek];
                    $startTime = Carbon::parse($availability->start_time);
                    $endTime = Carbon::parse($availability->end_time);

                    $slots = [];
                    $currentTime = $startTime->copy();

                    // Generate slot berdasarkan interval
                    while ($currentTime < $endTime) {
                        $slotStart = $currentTime->format('H:i'); // "HH:MM"
                        $slotKey = $date->toDateString() . '_' . $slotStart;

                        // Cek apakah slot ini sudah di-booking
                        if (!isset($bookedSlots[$slotKey])) {
                            // Cek apakah slot + durasi terpendek masih dalam jam kerja
                            if ($currentTime->copy()->add($interval) <= $endTime) {
                                $slots[] = $slotStart;
                            }
                        }

                        $currentTime->add($interval);
                    }

                    // Jika ada slot tersedia di hari ini, tambahkan ke array
                    if (!empty($slots)) {
                        $groupedSlots = [
                            'Pagi' => [],
                            'Siang' => [],
                            'Sore' => [],
                            'Malam' => [],
                        ];

                        foreach ($slots as $slot) {
                            $hour = (int) substr($slot, 0, 2);
                            if ($hour >= 6 && $hour < 11) {
                                $groupedSlots['Pagi'][] = $slot;
                            } elseif ($hour >= 11 && $hour < 15) {
                                $groupedSlots['Siang'][] = $slot;
                            } elseif ($hour >= 15 && $hour < 18) {
                                $groupedSlots['Sore'][] = $slot;
                            } elseif ($hour >= 18 && $hour < 22) {
                                $groupedSlots['Malam'][] = $slot;
                            }
                        }

                        // Hanya tambahkan grup yang tidak kosong
                        $availableSlotsGrouped = array_filter($groupedSlots);

                        // Hanya tambahkan tanggal jika ada slot
                        if (!empty($availableSlotsGrouped)) {
                            $availableDates[] = [
                                'date' => $date->toDateString(), // YYYY-MM-DD
                                'dayName' => $date->translatedFormat('l'),
                                'dayOfMonth' => $date->day,
                                'monthName' => $date->translatedFormat('M'),
                                'availableTimes' => $availableSlotsGrouped,
                            ];
                        }
                    }
                }
            }

            return response()->json([
                'durations' => $durations,
                'availableDates' => $availableDates,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching schedule options:', [
                'counselor_id' => $konselor->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Gagal mengambil opsi jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // --- AKHIR METHOD JADWAL DINAMIS ---


    // --- METHOD BARU UNTUK MEMBUAT BOOKING ---
    /**
     * Menyimpan booking baru.
     * POST /api/booking/create
     */
    public function storeBooking(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'counselorId' => 'required|exists:users,id',
            'jenisKonselingId' => 'nullable|exists:jenis_konselings,id',
            'durationId' => 'required|exists:durasi_konselings,id',
            'tempatId' => 'nullable|required_if:method,Tatap Muka|exists:tempat_konselings,id',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'method' => 'required|string|in:Chat,Voice Call,Video Call,Tatap Muka',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        // Buat log request yang diterima
        Log::info('Store booking request validated:', $validated);


        try {
            $user = Auth::user();
            $durasi = DurasiKonseling::find($validated['durationId']);
            if (!$durasi) {
                Log::error('DurasiKonseling not found:', ['durationId' => $validated['durationId']]);
                return response()->json(['message' => 'Durasi konseling tidak valid.'], 404);
            }

            // --- Validasi Ketersediaan ---
            $dayOfWeek = Carbon::parse($validated['date'])->dayOfWeek; // 0=Minggu, 1=Senin
            $slotStartTime = Carbon::parse($validated['time']);
            $slotEndTime = $slotStartTime->copy()->addMinutes($durasi->durasi_menit);

            Log::info('Validating availability:', [
                'counselorId' => $validated['counselorId'],
                'dayOfWeek' => $dayOfWeek,
                'startTime' => $slotStartTime->format('H:i:s'),
                'endTime' => $slotEndTime->format('H:i:s')
            ]);

            $availability = CounselorAvailability::where('counselor_id', $validated['counselorId'])
                ->where('day_of_week', $dayOfWeek)
                ->where('start_time', '<=', $slotStartTime->format('H:i:s'))
                ->where('end_time', '>=', $slotEndTime->format('H:i:s'))
                ->first();

            if (!$availability) {
                Log::warning('Availability check failed:', [
                    'counselor_id' => $validated['counselorId'],
                    'day_of_week' => $dayOfWeek,
                    // --- PERBAIKAN: Menghapus tanda kutip (') di antara key ---
                    'start_time_req' => $slotStartTime->format('H:i:s'),
                    'end_time_req' => $slotEndTime->format('H:i:s')
                    // --- AKHIR PERBAIKAN ---
                ]);
                return response()->json(['message' => 'Jadwal tidak tersedia atau durasi tidak cukup.'], 409); // 409 Conflict
            }

            Log::info('Availability check passed.');

            // Cek tumpang tindih dengan booking lain
            // --- PERBAIKAN: Query tumpang tindih yang lebih sederhana ---
            $existingBooking = Booking::where('konselor_id', $validated['counselorId'])
                ->where('tanggal_konsultasi', $validated['date'])
                ->whereIn('status_pesanan', ['Dijadwalkan', 'Aktif', 'Menunggu Pembayaran'])
                ->with('durasiKonseling:id,durasi_menit')
                ->where(function ($query) use ($slotStartTime, $slotEndTime) {
                    $query->where(function ($q) use ($slotStartTime, $slotEndTime) {
                        // 1. Waktu mulai baru, ada di tengah booking lama?
                        $q->where('jam_konsultasi', '<', $slotStartTime->format('H:i:s'))
                            ->whereRaw('ADDTIME(jam_konsultasi, SEC_TO_TIME(durasi_konselings.durasi_menit * 60)) > ?', [$slotStartTime->format('H:i:s')]);
                    })->orWhere(function ($q) use ($slotStartTime, $slotEndTime) {
                        // 2. Waktu mulai lama, ada di tengah booking baru?
                        $q->where('jam_konsultasi', '>=', $slotStartTime->format('H:i:s'))
                            ->where('jam_konsultasi', '<', $slotEndTime->format('H:i:s'));
                    });
                })
                ->join('durasi_konselings', 'bookings.durasi_konseling_id', '=', 'durasi_konselings.id')
                ->exists(); // Cukup cek exists()
            // --- AKHIR PERBAIKAN QUERY ---

            if ($existingBooking) {
                Log::warning('Booking conflict detected:', $validated);
                return response()->json(['message' => 'Slot waktu ini sudah dipesan. Silakan pilih jam lain.'], 409); // 409 Conflict
            }
            Log::info('Booking conflict check passed.');
            // --- Akhir Validasi Ketersediaan ---


            $hargaKonsultasi = $durasi->harga;
            $biayaLayanan = 5000; // Hardcoded
            $totalHarga = $hargaKonsultasi + $biayaLayanan;

            $booking = Booking::create([
                'customer_id' => $user->id,
                'konselor_id' => $validated['counselorId'],
                'jenis_konseling_id' => $validated['jenisKonselingId'] ?? null,
                'durasi_konseling_id' => $validated['durationId'],
                'tempat_konseling_id' => $validated['method'] === 'Tatap Muka' ? $validated['tempatId'] : null,
                'tanggal_konsultasi' => $validated['date'],
                'jam_konsultasi' => $validated['time'],
                'metode_konsultasi' => $validated['method'],
                'status_pesanan' => 'Menunggu Pembayaran',
                'total_harga' => $totalHarga,
            ]);

            $booking->load('customer:id,name', 'konselor:id,name', 'jenisKonseling', 'durasiKonseling', 'tempatKonseling');

            Log::info('Booking created successfully:', ['booking_id' => $booking->id]);

            return response()->json([
                'message' => 'Booking berhasil dibuat. Silakan lakukan pembayaran.',
                'booking' => $booking
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating booking:', [
                'user_id' => Auth::id(),
                'request' => $validated ?? $request->all(), // Fallback jika validasi gagal
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Gagal membuat booking. Terjadi kesalahan server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // --- AKHIR METHOD BARU ---

    // --- METHOD BARU UNTUK AMBIL QRIS ---
    /**
     * Mengambil daftar metode pembayaran yang aktif untuk customer.
     * GET /api/payment-methods
     */
    public function getPaymentMethods()
    {
        try {
            // --- PERBAIKAN: Ambil semua kolom, biarkan Model yg append URL ---
            $methods = PaymentMethod::where('status', 'Aktif')->get();
            // --- AKHIR PERBAIKAN ---

            return response()->json($methods);
        } catch (\Exception $e) {
            Log::error('Error fetching payment methods:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil metode pembayaran.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // --- AKHIR METHOD BARU ---
}
