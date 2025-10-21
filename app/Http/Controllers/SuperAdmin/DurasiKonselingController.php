<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\DurasiKonseling;
use Illuminate\Http\Request;

class DurasiKonselingController extends Controller
{
    public function index()
    {
        return DurasiKonseling::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'durasi_menit' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
        ]);

        $durasi = DurasiKonseling::create($validated);
        return response()->json($durasi, 201);
    }

    public function show(DurasiKonseling $durasiKonseling)
    {
        return $durasiKonseling;
    }

    public function update(Request $request, DurasiKonseling $durasiKonseling)
    {
        $validated = $request->validate([
            'durasi_menit' => 'sometimes|required|string|max:255',
            'harga' => 'sometimes|required|integer|min:0',
        ]);

        $durasiKonseling->update($validated);
        return response()->json($durasiKonseling);
    }

    public function destroy(DurasiKonseling $durasiKonseling)
    {
        $durasiKonseling->delete();
        return response()->json(null, 204);
    }
}
