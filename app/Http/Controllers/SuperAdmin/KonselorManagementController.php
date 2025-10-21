<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class KonselorManagementController extends Controller
{
    // Mengambil semua user dengan role 'konselor'
    public function index()
    {
        return User::where('role', 'konselor')->latest()->get();
    }

    /**
     * Menyimpan konselor baru yang dibuat oleh Super Admin.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
        ]);

        $konselor = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'city' => $validated['city'],
            'role' => 'konselor', // Otomatis set role sebagai konselor
            'status' => 'Verifikasi', // Status awal untuk konselor baru
        ]);

        return response()->json($konselor, 201);
    }


    // Menampilkan detail satu konselor
    public function show(User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }
        return $user;
    }

    // Menghapus konselor
    public function destroy(User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }
        $user->delete();
        return response()->json(null, 204);
    }

    // --- METODE KHUSUS UNTUK STATUS ---
    public function block(User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }
        $user->update(['status' => 'Banned']);
        return response()->json($user);
    }

    public function unblock(User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }
        // Saat di-unblock, kembalikan ke status Verifikasi atau Terverifikasi
        $user->update(['status' => 'Verifikasi']);
        return response()->json($user);
    }
}
