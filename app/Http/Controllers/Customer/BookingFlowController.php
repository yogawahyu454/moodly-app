<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User; // <-- Pastikan User di-import
use App\Models\DurasiKonseling; // <-- Import DurasiKonseling
use Illuminate\Support\Facades\Log;
use Carbon\Carbon; // Untuk manipulasi tanggal

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
                // --- PERUBAHAN: Gunakan status 'Terverifikasi' ---
                ->where('status', 'Terverifikasi')
                // --- AKHIR PERUBAHAN ---
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

    // --- METHOD BARU UNTUK JADWAL ---
    /**
     * Mengambil opsi durasi dan jadwal (dummy) untuk konselor tertentu.
     * GET /api/booking/counselors/{konselor}/schedule-options
     */
    public function getScheduleOptions(User $konselor)
    {
        try {
            // Validasi: Pastikan user adalah konselor dan terverifikasi
            if ($konselor->role !== 'konselor' || $konselor->status !== 'Terverifikasi') {
                return response()->json(['message' => 'Konselor tidak ditemukan atau tidak aktif.'], 404);
            }

            // 1. Ambil Durasi Konseling yang Aktif
            $durations = DurasiKonseling::select('id', 'durasi_menit', 'harga')
                // ->where('status', 'Aktif') // Jika ada kolom status di DurasiKonseling
                ->orderBy('harga') // Urutkan berdasarkan harga atau durasi
                ->get();

            // 2. Buat Dummy Jadwal Ketersediaan (Contoh untuk 5 hari ke depan)
            $availableDates = [];
            $today = Carbon::today();
            for ($i = 0; $i < 5; $i++) {
                $date = $today->copy()->addDays($i);
                $availableDates[] = [
                    'date' => $date->toDateString(), // Format YYYY-MM-DD
                    'dayName' => $date->translatedFormat('l'), // Nama hari (Senin, Selasa, ...)
                    'dayOfMonth' => $date->day,
                    'monthName' => $date->translatedFormat('M'), // Nama bulan singkat (Sep)
                    // Contoh jam tersedia (bisa lebih kompleks berdasarkan hari)
                    'availableTimes' => [
                        'Pagi' => ['09:00', '10:00'], // Jam Pagi
                        'Siang' => ['13:00', '14:00', '15:00'], // Jam Siang
                        'Sore' => ['16:00'], // Jam Sore
                        'Malam' => [], // Jam Malam (kosong)
                    ]
                ];
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
    // --- AKHIR METHOD BARU ---

}
