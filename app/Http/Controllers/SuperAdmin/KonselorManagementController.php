<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CounselorAvailability; // <-- Import Model Jadwal
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage; // <-- Import Storage
use Illuminate\Validation\Rule;         // <-- Import Rule
use Illuminate\Validation\Rules\Password;

class KonselorManagementController extends Controller
{
    // Mengambil semua user dengan role 'konselor'
    public function index()
    {
        // Eager load relasi jika ada, atau ambil data dasar
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
            // --- Validasi Kolom Baru ---
            'universitas' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
            'spesialisasi' => 'nullable|array', // Validasi jika Anda ingin mengirim spesialisasi dari sini
            'spesialisasi.*' => 'string|max:100', // Validasi tiap item array
            'rating' => 'nullable|numeric|min:0|max:5', // Tambahkan jika perlu
            // Tambahkan validasi lain jika ada (provinsi, alamat, dll.)
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            // Simpan gambar ke storage/app/public/avatars
            // Pastikan folder 'avatars' ada atau dibuat otomatis
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $konselor = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'city' => $validated['city'] ?? null,
            'universitas' => $validated['universitas'] ?? null, // Simpan universitas
            'avatar' => $avatarPath, // Simpan path avatar
            'spesialisasi' => $validated['spesialisasi'] ?? null, // Simpan spesialisasi (jika dikirim)
            'rating' => $validated['rating'] ?? null, // Simpan rating (jika dikirim)
            'role' => 'konselor', // Otomatis set role sebagai konselor
            // Status awal mungkin lebih baik 'Terverifikasi' jika dibuat lgsg oleh Super Admin?
            // Atau tetap 'Verifikasi' jika butuh approval Admin? Sesuaikan.
            'status' => 'Verifikasi',
        ]);

        return response()->json($konselor, 21);
    }


    // Menampilkan detail satu konselor
    public function show(User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }
        return $user;
    }

    // --- METHOD UPDATE BARU ---
    /**
     * Memperbarui data konselor yang sudah ada.
     * Menggunakan POST dengan _method=PUT karena FormData
     */
    public function update(Request $request, User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }

        $validated = $request->validate([
            // 'sometimes' berarti hanya validasi jika field dikirim
            'name' => 'sometimes|required|string|max:255',
            // Abaikan email unik milik user ini sendiri
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'universitas' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'spesialisasi' => 'nullable|array',
            'spesialisasi.*' => 'string|max:100',
            'rating' => 'nullable|numeric|min:0|max:5',
            // Password tidak diupdate di sini, bisa dibuat endpoint terpisah jika perlu
        ]);

        $avatarPath = $user->avatar; // Simpan path lama defaultnya

        if ($request->hasFile('avatar')) {
            // 1. Hapus avatar lama jika ada
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            // 2. Simpan avatar baru
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $avatarPath; // Masukkan path baru ke data yg akan diupdate
        } else {
            // Jika tidak ada file baru, pastikan 'avatar' tidak ikut diupdate
            // (kecuali jika ada fitur hapus avatar, bisa ditambahkan logikanya)
            unset($validated['avatar']);
        }


        // Update data user
        // Filter hanya data yg divalidasi dan bukan null (kecuali yg memang boleh null)
        $updateData = collect($validated)->filter(function ($value, $key) {
            return $value !== null || in_array($key, ['phone', 'city', 'universitas', 'avatar', 'spesialisasi', 'rating']); // Kolom yg boleh null
        })->all();


        // Update spesialisasi secara terpisah jika dikirim
        if (isset($validated['spesialisasi'])) {
            $updateData['spesialisasi'] = $validated['spesialisasi'];
        }

        // Tambahkan path avatar ke updateData jika ada file baru atau path lama (jika tidak ada file baru)
        // Ini memastikan kolom avatar di database selalu terisi path yang benar
        $updateData['avatar'] = $avatarPath;


        $user->update($updateData);


        // Load ulang data user untuk mendapatkan URL avatar terbaru
        $user->refresh();

        return response()->json($user);
    }
    // --- AKHIR METHOD UPDATE ---


    // Menghapus konselor
    public function destroy(User $user)
    {
        if ($user->role !== 'konselor') {
            abort(404);
        }

        // Hapus avatar dari storage jika ada
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
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
        // Saat di-unblock, kembalikan ke status 'Terverifikasi' jika sebelumnya aktif,
        // atau 'Verifikasi' jika belum pernah diverifikasi (logika ini bisa disesuaikan)
        // Untuk sederhana, kita set ke 'Terverifikasi'
        $user->update(['status' => 'Terverifikasi']);
        return response()->json($user);
    }

    // --- METHOD BARU UNTUK MANAJEMEN JADWAL ---

    /**
     * Menampilkan daftar jadwal ketersediaan untuk konselor tertentu.
     * GET /api/super-admin/konselor-management/{user}/availabilities
     */
    public function getAvailabilities(User $user)
    {
        // Pastikan user adalah konselor
        if ($user->role !== 'konselor') {
            return response()->json(['message' => 'User bukan konselor.'], 404);
        }

        $availabilities = CounselorAvailability::where('counselor_id', $user->id)
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return response()->json($availabilities);
    }

    /**
     * Menyimpan jadwal ketersediaan baru untuk konselor.
     * POST /api/super-admin/konselor-management/{user}/availabilities
     */
    public function storeAvailability(Request $request, User $user)
    {
        if ($user->role !== 'konselor') {
            return response()->json(['message' => 'User bukan konselor.'], 404);
        }

        $validated = $request->validate([
            'day_of_week' => 'required|integer|between:0,6', // 0=Minggu, 6=Sabtu
            'start_time' => 'required|date_format:H:i', // Format jam:menit (e.g., 09:00)
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        // Cek overlapping schedule (opsional tapi bagus)
        // TODO: Tambahkan logika untuk mencegah jadwal tumpang tindih

        $availability = CounselorAvailability::create([
            'counselor_id' => $user->id,
            'day_of_week' => $validated['day_of_week'],
            'start_time' => $validated['start_time'] . ':00', // Tambahkan detik
            'end_time' => $validated['end_time'] . ':00', // Tambahkan detik
        ]);

        return response()->json($availability, 201);
    }

    /**
     * Menghapus jadwal ketersediaan.
     * DELETE /api/super-admin/konselor-management/{user}/availabilities/{availability}
     */
    public function destroyAvailability(User $user, CounselorAvailability $availability)
    {
        // Pastikan availability milik user yang benar
        if ($availability->counselor_id !== $user->id) {
            return response()->json(['message' => 'Jadwal tidak ditemukan untuk konselor ini.'], 404);
        }

        $availability->delete();

        return response()->json(['message' => 'Jadwal berhasil dihapus.'], 200);
    }

    // --- AKHIR METHOD BARU ---
}
