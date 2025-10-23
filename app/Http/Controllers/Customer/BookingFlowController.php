<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempatKonseling;
use App\Models\User;

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
                ->select('id', 'nama_tempat', 'alamat') // Hanya ambil kolom yang relevan
                ->orderBy('nama_tempat') // Urutkan berdasarkan nama
                ->get();

            return response()->json($tempatList);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data tempat konseling.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

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

            $counselors = $query->orderBy('name')->get();

            return response()->json($counselors);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data konselor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Nanti kita bisa tambahkan method lain di sini
    // (misal: getDurasiKonseling, getKonselorByService, dll)
}
