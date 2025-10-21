<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AdminManagementController extends Controller
{
    // Mengambil semua user dengan role 'admin'
    public function index()
    {
        return User::where('role', 'admin')->latest()->get();
    }

    // Menyimpan admin baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
        ]);

        $admin = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'city' => $validated['city'],
            'role' => 'admin',
            'status' => 'Offline',
        ]);

        return response()->json($admin, 201);
    }

    // Menampilkan detail satu admin
    // PERBAIKAN: Mengubah nama variabel $user menjadi $admin_management agar cocok dengan nama rute
    public function show(User $admin_management)
    {
        if ($admin_management->role !== 'admin') {
            abort(404);
        }
        return $admin_management;
    }

    // (Metode update tidak kita gunakan)

    // Menghapus admin
    // PERBAIKAN: Mengubah nama variabel $user menjadi $admin_management
    public function destroy(User $admin_management)
    {
        if ($admin_management->role !== 'admin') {
            abort(404);
        }
        $admin_management->delete();
        return response()->json(null, 204);
    }

    // --- METODE KHUSUS UNTUK STATUS (nama variabel $user sudah benar karena rutenya beda) ---
    public function block(User $user)
    {
        if ($user->role !== 'admin') {
            abort(404);
        }
        $user->update(['status' => 'Banned']);
        return response()->json($user);
    }

    public function unblock(User $user)
    {
        if ($user->role !== 'admin') {
            abort(404);
        }
        $user->update(['status' => 'Offline']);
        return response()->json($user);
    }
}
