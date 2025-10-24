<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User; // <-- Pastikan User di-import
use Illuminate\Support\Facades\Log;

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

    // --- METHOD BARU ---
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
            // Anda bisa memuat relasi lain jika perlu di sini
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
                // Tambahkan kolom lain jika perlu (misal: deskripsi bio, pengalaman, dll)
            ]);

            // TODO: Tambahkan logika untuk mengambil metode layanan yang tersedia (dari tabel lain?)
            // Untuk sementara, kita hardcode
            $konselorData['servesVia'] = ['Chat', 'Video Call', 'Voice Call', 'Tatap Muka'];
            // TODO: Tambahkan logika untuk mengambil jumlah review (dari tabel lain?)
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
    // --- AKHIR METHOD BARU ---

}
