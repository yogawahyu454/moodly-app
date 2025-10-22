<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerVerificationController extends Controller
{
    /**
     * Menampilkan daftar customer yang statusnya 'Verifikasi'.
     */
    public function index()
    {
        return User::where('role', 'customer')
            ->where('status', 'Verifikasi') // Filter status
            ->latest()
            ->get();
    }

    /**
     * Menampilkan detail satu customer untuk diverifikasi.
     */
    public function show(User $user)
    {
        if ($user->role !== 'customer') {
            abort(404);
        }
        return $user;
    }

    /**
     * Menyetujui verifikasi customer (mengubah status menjadi 'Terverifikasi').
     */
    public function approve(User $user)
    {
        if ($user->role !== 'customer' || $user->status !== 'Verifikasi') {
            abort(403, 'Aksi tidak diizinkan.');
        }
        $user->update(['status' => 'Terverifikasi']);
        return response()->json(['message' => 'Customer berhasil diverifikasi.', 'user' => $user]);
    }

    /**
     * Menolak verifikasi customer (mengubah status menjadi 'Ditolak').
     */
    public function reject(Request $request, User $user)
    {
        if ($user->role !== 'customer' || $user->status !== 'Verifikasi') {
            abort(403, 'Aksi tidak diizinkan.');
        }
        // Validasi dan simpan alasan penolakan jika ada
        // $validated = $request->validate(['alasan_ditolak' => 'required|string|max:255']);
        // $user->update(['status' => 'Ditolak', 'alasan_ditolak' => $validated['alasan_ditolak']]);

        // Versi sederhana tanpa alasan
        $user->update(['status' => 'Ditolak']);

        return response()->json(['message' => 'Verifikasi customer ditolak.', 'user' => $user]);
    }
}
