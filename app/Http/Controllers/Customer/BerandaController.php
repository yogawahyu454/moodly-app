<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\JenisKonseling;

class BerandaController extends Controller
{
    /**
     * Mengambil data yang diperlukan untuk halaman beranda customer.
     */
    public function getBerandaData()
    {
        // 1. Ambil semua jenis konseling yang statusnya 'Aktif'
        $services = JenisKonseling::where('status', 'Aktif')
            ->select('id', 'jenis_konseling', 'tipe_layanan', 'image_url')
            ->get();

        // 2. Ambil user yang rolenya 'konselor' dan statusnya 'Terverifikasi'
        // (Asumsi status 'Terverifikasi' atau 'Aktif'. Kita gunakan 'Terverifikasi'
        //    sesuai alur Verifikasi Konselor Admin)
        $counselors = User::where('role', 'konselor')
            ->where('status', 'Terverifikasi') // Pastikan ini sesuai dengan status approval admin
            ->select('id', 'name', 'avatar', 'spesialisasi', 'rating', 'universitas')
            ->take(5) // Ambil 5 konselor teratas (nanti bisa di-order by rating)
            ->get();

        return response()->json([
            'services' => $services,
            'counselors' => $counselors,
        ]);
    }
}
