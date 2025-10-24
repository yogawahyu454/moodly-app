<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User;
use Illuminate\Support\Facades\Log; // Pastikan Log di-import

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
                // Ambil kolom baru rating & review_count
                ->select('id', 'nama_tempat', 'alamat', 'image', 'rating', 'review_count')
                ->orderBy('nama_tempat')
                ->get();

            // Log data yang diambil (opsional, untuk debugging)
            // Log::info('Tempat Konseling List:', $tempatList->toArray());

            return response()->json($tempatList);
        } catch (\Exception $e) {
            Log::error('Error fetching tempat konseling list:', ['error' => $e->getMessage()]); // Log error
            return response()->json([
                'message' => 'Gagal mengambil data tempat konseling.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil daftar konselor yang aktif.
     * GET /api/booking/counselors
     */
    public function getCounselors(Request $request)
    {
        // Validasi input (opsional, jika ada filter)
        // $request->validate(['serviceId' => 'nullable|integer|exists:jenis_konselings,id']);

        try {
            $query = User::where('role', 'konselor')
                ->where('status', 'Active') // Hanya ambil yang aktif
                ->select('id', 'name', 'avatar', 'universitas', 'spesialisasi', 'rating'); // Pilih kolom yg relevan

            // TODO: Logika filter berdasarkan serviceId (jika diperlukan)
            // if ($request->has('serviceId')) {
            //     // Ambil spesialisasi yang relevan dengan serviceId
            //     // Lalu filter konselor berdasarkan spesialisasi tersebut
            // }
            // TODO: Logika filter berdasarkan tempatId (jika diperlukan untuk Cara B)
            // if ($request->has('tempatId')) {
            //     $tempatId = $request->input('tempatId');
            //     $query->whereHas('tempatKonseling', function ($q) use ($tempatId) {
            //         $q->where('tempat_konseling_id', $tempatId);
            //     });
            // }


            $counselors = $query->orderBy('name')->get();

            return response()->json($counselors);
        } catch (\Exception $e) {
            Log::error('Error fetching counselors:', ['error' => $e->getMessage()]); // Log error
            return response()->json([
                'message' => 'Gagal mengambil data konselor.',
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
            if ($tempatKonseling->status !== 'Aktif') {
                return response()->json(['message' => 'Tempat konseling tidak ditemukan atau tidak aktif.'], 404);
            }

            // Log tipe data rating sebelum dikirim
            Log::info('Tempat Detail Rating Type:', ['type' => gettype($tempatKonseling->rating)]);
            Log::info('Tempat Detail Data Before Response:', $tempatKonseling->toArray());


            // Data konselor akan diambil terpisah oleh frontend via getCounselors()
            return response()->json($tempatKonseling);
        } catch (\Exception $e) {
            Log::error('Error fetching tempat detail:', ['id' => $tempatKonseling->id ?? null, 'error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Gagal mengambil detail tempat konseling.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Nanti kita bisa tambahkan method lain di sini
    // (misal: getDurasiKonseling, dll)
}
