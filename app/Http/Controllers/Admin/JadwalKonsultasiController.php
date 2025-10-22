<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule; // <-- Import Rule

class JadwalKonsultasiController extends Controller
{
    /**
     * Menampilkan daftar jadwal konsultasi.
     */
    public function index(Request $request)
    {
        $query = Booking::with(['customer', 'konselor', 'jenisKonseling']);
        if ($request->has('status')) {
            $query->where('status_pesanan', $request->input('status'));
        }
        $query->orderBy('tanggal_konsultasi', 'asc')->orderBy('jam_konsultasi', 'asc');
        return $query->get();
    }

    /**
     * Menampilkan detail satu jadwal konsultasi.
     */
    // Pastikan menerima model Booking
    public function show(Booking $booking)
    {
        return $booking->load(['customer', 'konselor', 'jenisKonseling']);
    }

    /**
     * Menghapus jadwal konsultasi.
     */
    // Pastikan menerima model Booking
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(null, 204);
    }

    /**
     * Metode baru untuk memperbarui status pesanan/jadwal.
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        // Tentukan status apa saja yang valid
        $allowedStatuses = ['Selesai', 'Batal', 'Proses', 'Dijadwalkan', 'Berlangsung', 'Menunggu Konfirmasi'];

        // Validasi input 'status_pesanan'
        $validated = $request->validate([
            'status_pesanan' => ['required', 'string', Rule::in($allowedStatuses)],
        ]);

        // Update status di database
        $booking->update(['status_pesanan' => $validated['status_pesanan']]);

        // Kirim notifikasi jika perlu (misal ke customer/konselor)

        // Kembalikan respons sukses beserta data booking yang sudah diupdate
        return response()->json($booking);
    }
}
