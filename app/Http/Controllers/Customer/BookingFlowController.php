<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User;
use App\Models\DurasiKonseling;
use App\Models\Booking;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
// --- PASTIKAN IMPORT BARU INI ADA ---
use App\Models\CounselorAvailability;
use Carbon\CarbonInterval;
// --- AKHIR IMPORT BARU ---

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
                'avatar',
                'universitas',
                'spesialisasi',
                'rating',
                'surat_izin_praktik',
            ]);

            // TODO: Ini masih hardcoded, bisa diganti nanti
            $konselorData['servesVia'] = ['Chat', 'Video Call', 'Voice Call', 'Tatap Muka'];
            $konselorData['reviews'] = '(200+ ulasan)';

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
                ->get(['tanggal_konsultasi', 'jam_konsultasi', 'durasi_konseling_id'])
                ->mapWithKeys(function ($booking) {
                    $startTime = Carbon::parse($booking->jam_konsultasi);
                    $durationMinutes = $booking->durasiKonseling ? $booking->durasiKonseling->durasi_menit : 60; // Fallback
                    $endTime = $startTime->copy()->addMinutes($durationMinutes)->format('H:i:s');

                    // Format key: "YYYY-MM-DD_HH:MM:SS" => "HH:MM:SS" (end time)
                    return [$booking->tanggal_konsultasi . '_' . $booking->jam_konsultasi => $endTime];
                });

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
                        $slotStartFull = $currentTime->format('H:i:s'); // "HH:MM:SS"
                        $slotKey = $date->toDateString() . '_' . $slotStartFull;

                        // Cek apakah slot ini sudah di-booking
                        if (!isset($upcomingBookings[$slotKey])) {
                            // TODO: Cek tumpang tindih dengan durasi booking lain
                            // (Logika ini bisa lebih kompleks, untuk saat ini kita cek start time)
                            $slots[] = $slotStart;
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
                'trace' => $e->getTraceAsString() // Tambahkan trace untuk debug
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
            'jenisKonselingId' => 'required|exists:jenis_konselings,id',
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

        try {
            $user = Auth::user();
            $durasi = DurasiKonseling::find($validated['durationId']);
            if (!$durasi) {
                return response()->json(['message' => 'Durasi konseling tidak valid.'], 404);
            }

            // --- Validasi Ketersediaan ---
            $dayOfWeek = Carbon::parse($validated['date'])->dayOfWeek; // 0=Minggu, 1=Senin
            $slotStartTime = Carbon::parse($validated['time']);

            $availability = CounselorAvailability::where('counselor_id', $validated['counselorId'])
                ->where('day_of_week', $dayOfWeek)
                ->where('start_time', '<=', $slotStartTime->format('H:i:s'))
                ->where('end_time', '>=', $slotStartTime->copy()->addMinutes($durasi->durasi_menit)->format('H:i:s'))
                ->first();

            if (!$availability) {
                return response()->json(['message' => 'Jadwal tidak tersedia atau durasi tidak cukup.'], 409); // 409 Conflict
            }

            // Cek tumpang tindih dengan booking lain
            $existingBooking = Booking::where('counselor_id', $validated['counselorId'])
                ->where('tanggal_konsultasi', $validated['date'])
                ->whereIn('status_pesanan', ['Dijadwalkan', 'Aktif', 'Menunggu Pembayaran'])
                ->whereHas('durasiKonseling', function ($query) use ($slotStartTime, $durasi) {
                    $slotEndTime = $slotStartTime->copy()->addMinutes($durasi->durasi_menit);
                    $query
                        // Cek jika booking baru mulai di tengah booking lama
                        ->whereRaw('? BETWEEN jam_konsultasi AND ADDTIME(jam_konsultasi, SEC_TO_TIME(durasi_menit * 60))', [$slotStartTime->format('H:i:s')])
                        // Cek jika booking baru berakhir di tengah booking lama
                        ->whereRaw('? BETWEEN jam_konsultasi AND ADDTIME(jam_konsultasi, SEC_TO_TIME(durasi_menit * 60))', [$slotEndTime->format('H:i:s')])
                        // Cek jika booking baru mencakup booking lama
                        ->whereRaw('jam_konsultasi BETWEEN ? AND ?', [$slotStartTime->format('H:i:s'), $slotEndTime->format('H:i:s')]);
                })
                ->exists();

            if ($existingBooking) {
                return response()->json(['message' => 'Slot waktu ini sudah dipesan. Silakan pilih jam lain.'], 409); // 409 Conflict
            }
            // --- Akhir Validasi Ketersediaan ---


            $hargaKonsultasi = $durasi->harga;
            $biayaLayanan = 5000; // Hardcoded
            $totalHarga = $hargaKonsultasi + $biayaLayanan;

            $booking = Booking::create([
                'customer_id' => $user->id,
                'konselor_id' => $validated['counselorId'],
                'jenis_konseling_id' => $validated['jenisKonselingId'],
                'durasi_konseling_id' => $validated['durationId'],
                'tempat_konseling_id' => $validated['method'] === 'Tatap Muka' ? $validated['tempatId'] : null,
                'tanggal_konsultasi' => $validated['date'],
                'jam_konsultasi' => $validated['time'],
                'metode_konsultasi' => $validated['method'],
                'status_pesanan' => 'Menunggu Pembayaran',
                'total_harga' => $totalHarga,
            ]);

            $booking->load('customer:id,name', 'konselor:id,name', 'jenisKonseling', 'durasiKonseling', 'tempatKonseling');

            return response()->json([
                'message' => 'Booking berhasil dibuat. Silakan lakukan pembayaran.',
                'booking' => $booking
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating booking:', [
                'user_id' => Auth::id(),
                'request' => $validated,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString() // Tambahkan trace untuk debug
            ]);
            return response()->json([
                'message' => 'Gagal membuat booking.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // --- AKHIR METHOD BARU ---
}
