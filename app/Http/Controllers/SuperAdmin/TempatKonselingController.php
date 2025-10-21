<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\TempatKonseling;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TempatKonselingController extends Controller
{
    public function index()
    {
        return TempatKonseling::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_tempat' => 'required|string|max:255',
            'alamat' => 'required|string',
            'status' => ['required', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        $tempat = TempatKonseling::create($validated);
        return response()->json($tempat, 201);
    }

    public function show(TempatKonseling $tempatKonseling)
    {
        return $tempatKonseling;
    }

    public function update(Request $request, TempatKonseling $tempatKonseling)
    {
        $validated = $request->validate([
            'nama_tempat' => 'sometimes|required|string|max:255',
            'alamat' => 'sometimes|required|string',
            'status' => ['sometimes', 'required', Rule::in(['Aktif', 'Tidak Aktif'])],
        ]);

        $tempatKonseling->update($validated);
        return response()->json($tempatKonseling);
    }

    public function destroy(TempatKonseling $tempatKonseling)
    {
        $tempatKonseling->delete();
        return response()->json(null, 204);
    }
}
