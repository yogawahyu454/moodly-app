<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class JadwalKonsultasiController extends Controller
{
    /**
     * Menampilkan daftar jadwal konsultasi.
     * Mungkin perlu difilter berdasarkan status atau tanggal di masa depan.
     */
    public function index(Request $request)
    {
        // Ambil query builder
        $query = Booking::with(['customer', 'konselor', 'jenisKonseling']);

        // Contoh Filter berdasarkan status (jika ada parameter 'status' di URL)
        if ($request->has('status')) {
            $query->where('status_pesanan', $request->input('status'));
        }

        // Urutkan berdasarkan tanggal terdekat
        $query->orderBy('tanggal_konsultasi', 'asc')->orderBy('jam_konsultasi', 'asc');

        return $query->get();
    }

    /**
     * Menampilkan detail satu jadwal konsultasi.
     */
    public function show(Booking $booking)
    {
        // Load relasi yang dibutuhkan
        return $booking->load(['customer', 'konselor', 'jenisKonseling']);
    }

    /**
     * Menghapus jadwal konsultasi.
     * (Aksi ini mungkin perlu dipertimbangkan ulang, apakah Admin boleh menghapus?)
     * Mungkin lebih cocok 'Batalkan' (mengubah status).
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(null, 204);
    }

    // Metode store dan update tidak diperlukan untuk Admin di halaman ini
    // Mungkin nanti perlu metode untuk 'updateStatus'
}
