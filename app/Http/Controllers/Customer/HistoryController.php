<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking; // <-- TAMBAHKAN IMPORT

class HistoryController extends Controller
{
    /**
     * Mengambil semua data riwayat booking untuk customer yang sedang login.
     * GET /api/history
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */ // <-- INI DIA PERBAIKANNYA
        $user = Auth::user();

        try {
            // Ambil semua booking milik user
            // 'bookings()' sekarang akan dikenali oleh linter
            $bookings = $user->bookings()
                // Eager load data konselor, tapi HANYA field yang kita perlukan
                ->with('konselor:id,name,avatar,spesialisasi')
                // Urutkan berdasarkan tanggal terbaru
                ->latest('tanggal_konsultasi')
                ->get();

            return response()->json($bookings);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data riwayat.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * METHOD BARU: Menampilkan satu detail booking.
     * GET /api/history/{booking}
     */
    public function show(Booking $booking)
    {
        // Pastikan customer ini pemilik booking
        if (Auth::id() !== $booking->customer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Load data konselor
        $booking->load('konselor:id,name,avatar,spesialisasi');

        return response()->json($booking);
    }

    /**
     * METHOD BARU: Membatalkan booking.
     * PATCH /api/history/{booking}/cancel
     */
    public function cancel(Request $request, Booking $booking)
    {
        // Pastikan customer ini pemilik booking
        if (Auth::id() !== $booking->customer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validasi input
        $validated = $request->validate([
            'alasan' => 'required|string|max:255',
            'catatan' => 'nullable|string',
        ]);

        // Update booking
        try {
            $booking->update([
                'status_pesanan' => 'Batal',
                'alasan_pembatalan' => $validated['alasan'],
                'catatan_pembatalan' => $validated['catatan'],
            ]);

            return response()->json(['message' => 'Booking berhasil dibatalkan.']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membatalkan booking.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function reschedule(Request $request, Booking $booking)
    {
        // Pastikan customer ini pemilik booking
        if (Auth::id() !== $booking->customer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Pastikan status booking memungkinkan untuk reschedule (misal: bukan 'Selesai' atau 'Batal')
        if (!in_array($booking->status_pesanan, ['Dijadwalkan', 'Proses', 'Menunggu Konfirmasi'])) {
            return response()->json(['message' => 'Status booking tidak memungkinkan untuk ganti jadwal.'], 400);
        }

        // Validasi input
        $validated = $request->validate([
            'alasan' => 'required|string|max:255',
            'tanggalBaru' => 'required|date|after_or_equal:today', // Tanggal baru harus hari ini atau setelahnya
            'catatan' => 'nullable|string',
            // Kita mungkin perlu validasi jam baru juga di masa depan
        ]);

        // Update booking
        try {
            $booking->update([
                // Set status kembali agar Admin bisa approve ulang
                'status_pesanan' => 'Menunggu Konfirmasi',
                'tanggal_konsultasi' => $validated['tanggalBaru'],
                // Kosongkan alasan pembatalan jika sebelumnya ada
                'alasan_pembatalan' => null,
                'catatan_pembatalan' => null,
                // TODO: Simpan alasan reschedule jika perlu (butuh kolom baru)
                // 'alasan_reschedule' => $validated['alasan'],
                // 'catatan_reschedule' => $validated['catatan'],
            ]);

            // TODO: Kirim notifikasi ke Admin?

            return response()->json(['message' => 'Permintaan ganti jadwal berhasil dikirim. Menunggu konfirmasi Admin.']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengajukan ganti jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
