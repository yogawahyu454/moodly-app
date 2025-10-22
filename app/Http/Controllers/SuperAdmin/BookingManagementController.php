<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingManagementController extends Controller
{
    /**
     * Menampilkan daftar semua pesanan dengan data relasi.
     */
    public function index()
    {
        // Eager load relasi untuk efisiensi query
        return Booking::with(['customer', 'konselor', 'jenisKonseling'])
            ->latest() // Urutkan berdasarkan terbaru
            ->get();
    }

    /**
     * Menampilkan detail satu pesanan dengan data relasi lengkap.
     */
    public function show(Booking $booking)
    {
        // Eager load relasi yang dibutuhkan untuk halaman detail
        return $booking->load(['customer', 'konselor', 'jenisKonseling']);
        // Anda bisa tambahkan ->load(['durasiKonseling', 'tempatKonseling']) jika perlu
    }

    /**
     * Menghapus pesanan.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(null, 204);
    }

    // Metode store dan update tidak diperlukan untuk Super Admin di halaman ini
}
