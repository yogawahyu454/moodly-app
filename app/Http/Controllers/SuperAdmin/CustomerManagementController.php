<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerManagementController extends Controller
{
    // Mengambil semua user dengan role 'customer'
    public function index()
    {
        return User::where('role', 'customer')->latest()->get();
    }

    // Menampilkan detail satu customer
    public function show(User $user)
    {
        if ($user->role !== 'customer') {
            abort(404);
        }
        return $user;
    }

    // Menghapus customer
    public function destroy(User $user)
    {
        if ($user->role !== 'customer') {
            abort(404);
        }
        $user->delete();
        return response()->json(null, 204);
    }

    // --- METODE KHUSUS UNTUK STATUS ---
    public function block(User $user)
    {
        if ($user->role !== 'customer') {
            abort(404);
        }
        $user->update(['status' => 'Banned']);
        return response()->json($user);
    }

    public function unblock(User $user)
    {
        if ($user->role !== 'customer') {
            abort(404);
        }
        // Saat di-unblock, kembalikan ke status Offline
        $user->update(['status' => 'Offline']);
        return response()->json($user);
    }

    // Metode store dan update tidak diperlukan karena customer mendaftar sendiri
}
