<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User; // <-- Pastikan User di-import
use App\Models\DurasiKonseling; // <-- Import DurasiKonseling
use App\Models\Booking; // <-- IMPORT BOOKING
use App\Models\CounselorAvailability; // <-- IMPORT MODEL BARU
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth; // <-- IMPORT AUTH
use Illuminate\Support\Facades\Validator; // <-- IMPORT VALIDATOR
use Carbon\Carbon; // Untuk manipulasi tanggal
use Carbon\CarbonInterval; // Untuk interval waktu

class BookingFlowController extends Controller
{
    /**
     * Mengambil daftar tempat konseling yang aktif.
     * GET /api/booking/tempat-konseling
     */
    public function getTempatKonseling()
    {
        try {
            // Ambil semua kolom yang dibutuhkan, termasuk yang baru
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
    public function getTempatDetail(TempatKonseling $tempatKonseling) // Gunakan Route Model Binding
    {
        try {
            // Validasi: Pastikan tempat aktif (opsional)
            // if ($tempatKonseling->status !== 'Aktif') {
            //     return response()->json(['message' => 'Tempat konseling tidak ditemukan atau tidak aktif.'], 404);
            // }

            // Kita hanya butuh data tempat itu sendiri
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
                ->select('id', 'name', 'avatar', 'universitas', 'spesialisasi', 'rating'); // Pilih kolom yg relevan

            // TODO: Logika filter

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
    public function showCounselor(User $konselor) // Gunakan Route Model Binding (User $konselor)
    {
        try {
            // Validasi: Pastikan user adalah konselor dan terverifikasi
            if ($konselor->role !== 'konselor' || $konselor->status !== 'Terverifikasi') {
                return response()->json(['message' => 'Konselor tidak ditemukan atau tidak aktif.'], 404);
            }

            // Pilih kolom yang ingin ditampilkan di detail (lebih banyak dari list)
            $konselorData = $konselor->only([
                'id',
                'name',
                'avatar',
                'email', // Mungkin tidak perlu ditampilkan ke customer?
                'phone', // Mungkin tidak perlu ditampilkan ke customer?
                'universitas',
                'spesialisasi',
                'rating',
                'surat_izin_praktik',
                // Tambahkan kolom lain jika perlu
            ]);

            // TODO: Ambil metode layanan dari database (jika ada relasi)
            $konselorData['servesVia'] = ['Chat', 'Video Call', 'Voice Call', 'Tatap Muka']; // Hardcoded
            // TODO: Ambil jumlah review dari database (jika ada relasi)
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

    /**
     * Mengambil opsi durasi dan jadwal (DINAMIS) untuk konselor tertentu.
     * GET /api/booking/counselors/{konselor}/schedule-options
     */
    public function getScheduleOptions(User $konselor)
    {
        try {
            // Validasi konselor
            if ($konselor->role !== 'konselor' || $konselor->status !== 'Terverifikasi') {
                return response()->json(['message' => 'Konselor tidak ditemukan atau tidak aktif.'], 404);
            }

            // 1. Ambil Durasi Konseling
            $durations = DurasiKonseling::select('id', 'durasi_menit', 'harga')
                ->orderBy('harga')
                ->get();
            // Asumsi durasi terpendek untuk interval slot, default 60 menit jika tidak ada durasi
            $slotIntervalMinutes = $durations->min('durasi_menit') ?: 60;

            // 2. Ambil Ketersediaan Konselor
            $availabilities = CounselorAvailability::where('counselor_id', $konselor->id)
                ->get()
                ->keyBy('day_of_week'); // Key berdasarkan hari (0-6)

            // 3. Ambil Booking Mendatang (untuk cek slot terisi)
            $upcomingBookings = Booking::where('konselor_id', $konselor->id)
                ->where('tanggal_konsultasi', '>=', Carbon::today()->toDateString())
                // Hanya ambil status yang relevan (misal, tidak termasuk yang dibatalkan)
                ->whereIn('status_pesanan', ['Menunggu Pembayaran', 'Dijadwalkan', 'Aktif', 'Selesai'])
                ->select('tanggal_konsultasi', 'jam_konsultasi')
                ->get()
                ->mapToGroups(function ($booking) {
                    // Kelompokkan jam booking berdasarkan tanggal
                    return [$booking->tanggal_konsultasi => Carbon::parse($booking->jam_konsultasi)->format('H:i')];
                });

            // 4. Generate Tanggal dan Slot Waktu yang Tersedia (misal 7 hari ke depan)
            $availableDates = [];
            $startDate = Carbon::today();
            $endDate = Carbon::today()->addDays(7); // Tampilkan jadwal untuk 7 hari

            for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
                $dayOfWeek = $date->dayOfWeek; // 0 (Minggu) - 6 (Sabtu)
                $dateString = $date->toDateString();
                $bookedSlotsOnDate = $upcomingBookings->get($dateString) ?? collect(); // Jam yg sudah dibooking di tanggal ini

                $dailyAvailableTimes = [
                    'Pagi' => [],
                    'Siang' => [],
                    'Sore' => [],
                    'Malam' => []
                ];

                // Cek apakah ada jadwal availability untuk hari ini
                if ($availabilities->has($dayOfWeek)) {
                    $availability = $availabilities->get($dayOfWeek);
                    $startTime = Carbon::parse($availability->start_time);
                    $endTime = Carbon::parse($availability->end_time);

                    // Generate slot waktu berdasarkan interval
                    for (
                        $slotTime = $startTime->copy();
                        // Pastikan slot terakhir masih memungkinkan durasi terpendek
                        $slotTime->copy()->addMinutes($slotIntervalMinutes)->lte($endTime);
                        $slotTime->addMinutes($slotIntervalMinutes) // Lompat ke slot berikutnya
                    ) {
                        $slotTimeString = $slotTime->format('H:i');

                        // Cek apakah slot ini sudah dibooking
                        if (!$bookedSlotsOnDate->contains($slotTimeString)) {
                            // Kelompokkan berdasarkan waktu
                            $hour = $slotTime->hour;
                            if ($hour >= 5 && $hour < 12) {
                                $dailyAvailableTimes['Pagi'][] = $slotTimeString;
                            } elseif ($hour >= 12 && $hour < 15) {
                                $dailyAvailableTimes['Siang'][] = $slotTimeString;
                            } elseif ($hour >= 15 && $hour < 18) {
                                $dailyAvailableTimes['Sore'][] = $slotTimeString;
                            } elseif ($hour >= 18 && $hour < 22) { // Asumsi malam sampai jam 10
                                $dailyAvailableTimes['Malam'][] = $slotTimeString;
                            }
                        }
                    }
                }

                // Tambahkan data tanggal HANYA jika ada slot tersedia
                if (
                    !empty($dailyAvailableTimes['Pagi']) ||
                    !empty($dailyAvailableTimes['Siang']) ||
                    !empty($dailyAvailableTimes['Sore']) ||
                    !empty($dailyAvailableTimes['Malam'])
                ) {
                    $availableDates[] = [
                        'date' => $dateString,
                        'dayName' => $date->translatedFormat('l'),
                        'dayOfMonth' => $date->day,
                        'monthName' => $date->translatedFormat('M'),
                        'availableTimes' => $dailyAvailableTimes
                    ];
                }
            }

            return response()->json([
                'durations' => $durations,
                'availableDates' => $availableDates,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching schedule options:', ['counselor_id' => $konselor->id, 'error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil opsi jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Menyimpan booking baru.
     * POST /api/booking/create
     */
    public function storeBooking(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Ganti nama field sesuai payload dari frontend
            'counselorId' => 'required|exists:users,id',
            'jenisKonselingId' => 'required|exists:jenis_konselings,id',
            'durationId' => 'required|exists:durasi_konselings,id',
            'tempatId' => 'nullable|required_if:method,Tatap Muka|exists:tempat_konselings,id', // Wajib jika 'method' == 'Tatap Muka'
            'date' => 'required|date_format:Y-m-d|after_or_equal:today', // Pastikan tanggal valid
            'time' => 'required|date_format:H:i',
            'method' => 'required|string|in:Chat,Voice Call,Video Call,Tatap Muka',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        try {
            $user = Auth::user();

            // 1. Validasi Ketersediaan Jadwal (PENTING!)
            $dayOfWeek = Carbon::parse($validated['date'])->dayOfWeek;
            $availability = CounselorAvailability::where('counselor_id', $validated['counselorId'])
                ->where('day_of_week', $dayOfWeek)
                ->first();

            if (!$availability) {
                return response()->json(['message' => 'Konselor tidak tersedia pada hari yang dipilih.'], 400);
            }

            $requestedStartTime = Carbon::parse($validated['time']);
            $scheduleStartTime = Carbon::parse($availability->start_time);
            $scheduleEndTime = Carbon::parse($availability->end_time);

            // Ambil durasi untuk cek jam selesai
            $durasi = DurasiKonseling::find($validated['durationId']);
            if (!$durasi) {
                return response()->json(['message' => 'Durasi konseling tidak valid.'], 400);
            }
            $requestedEndTime = $requestedStartTime->copy()->addMinutes($durasi->durasi_menit);

            // Cek apakah jam yang diminta berada dalam rentang availability
            if (
                $requestedStartTime->lt($scheduleStartTime) ||
                $requestedEndTime->gt($scheduleEndTime)
            ) {
                return response()->json(['message' => 'Waktu yang dipilih berada di luar jam kerja konselor.'], 400);
            }


            // Cek apakah slot sudah dibooking
            $existingBooking = Booking::where('konselor_id', $validated['counselorId'])
                ->where('tanggal_konsultasi', $validated['date'])
                ->where('jam_konsultasi', $validated['time'])
                ->whereIn('status_pesanan', ['Menunggu Pembayaran', 'Dijadwalkan', 'Aktif']) // Status yg memblokir slot
                ->exists();

            if ($existingBooking) {
                return response()->json(['message' => 'Jadwal pada jam tersebut sudah dipesan.'], 409); // 409 Conflict
            }

            // 2. Ambil harga dari durasi (sudah ada di validasi)
            $hargaKonsultasi = $durasi->harga;

            // 3. Tentukan biaya layanan (dummy)
            $biayaLayanan = 5000; // Hardcoded, bisa diambil dari config
            $totalHarga = $hargaKonsultasi + $biayaLayanan;

            // 4. Buat Booking
            $booking = Booking::create([
                'customer_id' => $user->id,
                'konselor_id' => $validated['counselorId'],
                'jenis_konseling_id' => $validated['jenisKonselingId'],
                'durasi_konseling_id' => $validated['durationId'],
                'tempat_konseling_id' => $validated['method'] === 'Tatap Muka' ? $validated['tempatId'] : null,
                'tanggal_konsultasi' => $validated['date'],
                'jam_konsultasi' => $validated['time'],
                'metode_konsultasi' => $validated['method'],
                'status_pesanan' => 'Menunggu Pembayaran', // Status awal
                'total_harga' => $totalHarga,
            ]);

            // 5. Muat relasi (opsional, jika frontend perlu data lengkap)
            $booking->load('customer:id,name', 'konselor:id,name', 'jenisKonseling', 'durasiKonseling', 'tempatKonseling');

            // 6. Respon sukses
            return response()->json([
                'message' => 'Booking berhasil dibuat. Silakan lakukan pembayaran.',
                'booking' => $booking
            ], 201); // 201 = Created

        } catch (\Exception $e) {
            Log::error('Error creating booking:', [
                'user_id' => Auth::id(),
                'request' => $validated ?? $request->all(), // Log raw request if validation fails
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'message' => 'Gagal membuat booking. Terjadi kesalahan internal.',
                'error' => $e->getMessage() // Hanya tampilkan di log / dev env
            ], 500);
        }
    }
}
