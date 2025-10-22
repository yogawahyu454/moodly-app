<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class KonselorVerificationController extends Controller
{
    /**
     * Menampilkan daftar konselor yang statusnya 'Verifikasi'.
     */
    public function index()
    {
        return User::where('role', 'konselor')
            ->where('status', 'Verifikasi') // Hanya tampilkan yang perlu diverifikasi
            ->latest()
            ->get();
    }

    /**
     * Menampilkan detail satu konselor untuk diverifikasi.
     */
    public function show(User $user)
    {
        // ============= DEBUGGING =============
        // Hentikan eksekusi di sini dan tampilkan isi variabel $user
        dd($user);
        // =====================================

        // Pastikan user adalah konselor
        if ($user->role !== 'konselor') {
            abort(404);
        }
        return $user;
    }

    /**
     * Menyetujui verifikasi konselor (mengubah status menjadi 'Terverifikasi').
     */
    public function approve(User $user)
    {
        if ($user->role !== 'konselor' || $user->status !== 'Verifikasi') {
            // Hanya bisa approve konselor yang statusnya Verifikasi
            abort(403, 'Aksi tidak diizinkan.');
        }

        $user->update(['status' => 'Terverifikasi']);

        // TODO: Kirim notifikasi ke konselor jika perlu

        return response()->json(['message' => 'Konselor berhasil diverifikasi.', 'user' => $user]);
    }

    /**
     * Menolak verifikasi konselor (mengubah status menjadi 'Ditolak').
     */
    public function reject(Request $request, User $user) // Tambahkan Request jika perlu alasan penolakan
    {
        if ($user->role !== 'konselor' || $user->status !== 'Verifikasi') {
            abort(403, 'Aksi tidak diizinkan.');
        }

        // Anda bisa menambahkan validasi untuk alasan penolakan jika ada input
        // $request->validate(['alasan_penolakan' => 'required|string']);

        $user->update(['status' => 'Ditolak']);

        // TODO: Kirim notifikasi ke konselor beserta alasan jika perlu

        return response()->json(['message' => 'Verifikasi konselor ditolak.', 'user' => $user]);
    }
}
