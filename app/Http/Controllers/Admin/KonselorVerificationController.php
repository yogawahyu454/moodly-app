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
            ->where('status', 'Verifikasi')
            ->latest()
            ->get();
    }

    /**
     * Menampilkan detail satu konselor untuk diverifikasi.
     */
    public function show(User $user)
    {
        // Hapus dd() dari sini

        // Pastikan user adalah konselor
        if ($user->role !== 'konselor') {
            abort(404);
        }
        return $user; // Kembalikan data user
    }

    /**
     * Menyetujui verifikasi konselor.
     */
    public function approve(User $user)
    {
        if ($user->role !== 'konselor' || $user->status !== 'Verifikasi') {
            abort(403, 'Aksi tidak diizinkan.');
        }
        $user->update(['status' => 'Terverifikasi']);
        return response()->json(['message' => 'Konselor berhasil diverifikasi.', 'user' => $user]);
    }

    /**
     * Menolak verifikasi konselor.
     */
    public function reject(Request $request, User $user)
    {
        if ($user->role !== 'konselor' || $user->status !== 'Verifikasi') {
            abort(403, 'Aksi tidak diizinkan.');
        }
        $user->update(['status' => 'Ditolak']);
        return response()->json(['message' => 'Verifikasi konselor ditolak.', 'user' => $user]);
    }
}
