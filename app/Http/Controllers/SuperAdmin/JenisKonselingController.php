<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\JenisKonseling;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage; // 1. Import Storage

class JenisKonselingController extends Controller
{
    /**
     * Menampilkan daftar semua jenis konseling.
     */
    public function index()
    {
        return JenisKonseling::latest()->get();
    }

    /**
     * Menyimpan jenis konseling baru ke database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_konseling' => 'required|string|max:255|unique:jenis_konselings,jenis_konseling',
            'tipe_layanan' => ['required', 'string', Rule::in(['Online', 'Offline'])],

            // 2. Validasi diubah menjadi 'image' (file)
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048', // 2MB Max

            'biaya_layanan' => ['required', 'string', Rule::in(['Nominal Tetap', 'Persentase'])],
            'nilai' => 'required|string|max:50',
            'status' => ['required', 'string', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        $imagePath = null;
        // 3. Logika untuk menyimpan file jika ada
        if ($request->hasFile('image')) {
            // Simpan di 'storage/app/public/jenis-konseling-icons'
            $imagePath = $request->file('image')->store('jenis-konseling-icons', 'public');
        }

        // 4. Gabungkan data tervalidasi dengan path gambar
        $dataToCreate = array_merge($validated, ['image' => $imagePath]);

        $jenisKonseling = JenisKonseling::create($dataToCreate);

        return response()->json($jenisKonseling, 201);
    }

    /**
     * Menampilkan satu jenis konseling spesifik.
     */
    public function show(JenisKonseling $jenisKonseling)
    {
        return $jenisKonseling;
    }

    /**
     * Memperbarui jenis konseling yang sudah ada.
     */
    public function update(Request $request, $id)
    {
        $jenisKonseling = JenisKonseling::findOrFail($id);

        $validated = $request->validate([
            'jenis_konseling' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('jenis_konselings')->ignore($jenisKonseling->id)],
            'tipe_layanan' => ['sometimes', 'required', 'string', Rule::in(['Online', 'Offline'])],

            // 5. Validasi gambar untuk update
            // 'nullable' jika tidak ada gambar baru, 'image' jika ada
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',

            'biaya_layanan' => ['sometimes', 'required', 'string', Rule::in(['Nominal Tetap', 'Persentase'])],
            'nilai' => 'sometimes|required|string|max:50',
            'status' => ['sometimes', 'required', 'string', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        // Ambil semua data kecuali 'image'
        $dataToUpdate = $request->except('image');

        // 6. Logika Update Gambar (Hapus yg lama, simpan yg baru)
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($jenisKonseling->image) {
                Storage::disk('public')->delete($jenisKonseling->getRawOriginal('image'));
            }

            // Simpan gambar baru
            $imagePath = $request->file('image')->store('jenis-konseling-icons', 'public');
            $dataToUpdate['image'] = $imagePath;
        }

        $jenisKonseling->update($dataToUpdate);

        // Kita return model yang baru di-refresh agar URL Accessor-nya ter-trigger
        return response()->json($jenisKonseling->fresh());
    }

    /**
     * Menghapus jenis konseling dari database.
     */
    public function destroy(JenisKonseling $jenisKonseling)
    {
        // 7. Hapus gambar dari storage saat data dihapus
        if ($jenisKonseling->image) {
            // getRawOriginal() mengambil path mentah, bukan URL dari Accessor
            Storage::disk('public')->delete($jenisKonseling->getRawOriginal('image'));
        }

        $jenisKonseling->delete();

        return response()->json(null, 204);
    }
}
