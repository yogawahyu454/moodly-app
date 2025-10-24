<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\TempatKonseling;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage; // <-- Import Storage

class TempatKonselingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TempatKonseling::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_tempat' => 'required|string|max:255|unique:tempat_konselings,nama_tempat',
            'alamat' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi gambar
            'rating' => 'nullable|numeric|min:0|max:5', // Validasi rating (0-5)
            'review_count' => 'nullable|integer|min:0', // Validasi jumlah review (angka bulat >= 0)
            'status' => ['required', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Simpan gambar ke 'storage/app/public/tempat-konseling-images'
            $imagePath = $request->file('image')->store('tempat-konseling-images', 'public');
            $validated['image'] = $imagePath; // Simpan path relatif ke database
        }

        // Pastikan nilai default jika null
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['review_count'] = $validated['review_count'] ?? 0;


        $tempat = TempatKonseling::create($validated);
        return response()->json($tempat, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TempatKonseling $tempatKonseling)
    {
        return $tempatKonseling;
    }

    /**
     * Update the specified resource in storage.
     * Note: Kita gunakan POST (bukan PUT/PATCH) karena form frontend akan mengirim FormData
     */
    public function update(Request $request, TempatKonseling $tempatKonseling)
    {
        $validated = $request->validate([
            'nama_tempat' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('tempat_konselings')->ignore($tempatKonseling->id)],
            'alamat' => 'sometimes|required|string',
            // Image bersifat nullable saat update, artinya tidak wajib diubah
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // Rating dan review count juga nullable, tapi jika diisi harus valid
            'rating' => 'nullable|numeric|min:0|max:5',
            'review_count' => 'nullable|integer|min:0',
            'status' => ['sometimes', 'required', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        // Handle update gambar
        if ($request->hasFile('image')) {
            // 1. Hapus gambar lama jika ada
            if ($tempatKonseling->image) {
                Storage::disk('public')->delete($tempatKonseling->image);
            }
            // 2. Simpan gambar baru
            $imagePath = $request->file('image')->store('tempat-konseling-images', 'public');
            $validated['image'] = $imagePath;
        } else {
            // Jika tidak ada file baru di-upload, jangan ubah kolom 'image'
            unset($validated['image']);
        }

        // Pastikan nilai default jika null saat update (jika field dikirim tapi kosong)
        if (array_key_exists('rating', $validated)) {
            $validated['rating'] = $validated['rating'] ?? 0;
        }
        if (array_key_exists('review_count', $validated)) {
            $validated['review_count'] = $validated['review_count'] ?? 0;
        }

        $tempatKonseling->update($validated);
        // Load ulang data untuk memastikan accessor image terpanggil
        return response()->json($tempatKonseling->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TempatKonseling $tempatKonseling)
    {
        // Hapus gambar terkait jika ada sebelum menghapus record
        if ($tempatKonseling->image) {
            Storage::disk('public')->delete($tempatKonseling->image);
        }

        $tempatKonseling->delete();
        return response()->json(null, 204);
    }
}
