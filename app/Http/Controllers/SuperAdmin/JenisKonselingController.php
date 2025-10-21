<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\JenisKonseling;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JenisKonselingController extends Controller
{
    /**
     * Menampilkan daftar semua jenis konseling.
     * GET /api/super-admin/jenis-konseling
     */
    public function index()
    {
        // Mengambil semua data dan mengurutkannya berdasarkan ID terbaru
        return JenisKonseling::latest()->get();
    }

    /**
     * Menyimpan jenis konseling baru ke database.
     * POST /api/super-admin/jenis-konseling
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_konseling' => 'required|string|max:255|unique:jenis_konselings,jenis_konseling',
            'biaya_layanan' => ['required', 'string', Rule::in(['Nominal Tetap', 'Persentase'])],
            'nilai' => 'required|string|max:50',
            'status' => ['required', 'string', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        $jenisKonseling = JenisKonseling::create($validated);

        return response()->json($jenisKonseling, 201); // 201 = Created
    }

    /**
     * Menampilkan satu jenis konseling spesifik.
     * GET /api/super-admin/jenis-konseling/{id}
     */
    public function show(JenisKonseling $jenisKonseling)
    {
        // Route model binding otomatis menemukan data berdasarkan ID
        return $jenisKonseling;
    }

    /**
     * Memperbarui jenis konseling yang sudah ada.
     * PUT /api/super-admin/jenis-konseling/{id}
     */
    public function update(Request $request, JenisKonseling $jenisKonseling)
    {
        $validated = $request->validate([
            // 'sometimes' berarti validasi hanya jika field dikirim
            'jenis_konseling' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('jenis_konselings')->ignore($jenisKonseling->id)],
            'biaya_layanan' => ['sometimes', 'required', 'string', Rule::in(['Nominal Tetap', 'Persentase'])],
            'nilai' => 'sometimes|required|string|max:50',
            'status' => ['sometimes', 'required', 'string', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        $jenisKonseling->update($validated);

        return response()->json($jenisKonseling);
    }

    /**
     * Menghapus jenis konseling dari database.
     * DELETE /api/super-admin/jenis-konseling/{id}
     */
    public function destroy(JenisKonseling $jenisKonseling)
    {
        $jenisKonseling->delete();

        return response()->json(null, 204); // 204 = No Content
    }
}
