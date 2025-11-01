<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PaymentMethodController extends Controller
{
    /**
     * Menampilkan semua metode pembayaran.
     */
    public function index()
    {
        return PaymentMethod::latest()->get();
    }

    /**
     * Menyimpan metode pembayaran baru (termasuk upload gambar).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'account_details' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
            'status' => 'required|string|in:Aktif,Tidak Aktif',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Simpan di storage/app/public/payment_methods
            $imagePath = $request->file('image')->store('payment_methods', 'public');
        }

        $paymentMethod = PaymentMethod::create([
            'name' => $validated['name'],
            'account_details' => $validated['account_details'],
            'image' => $imagePath,
            'status' => $validated['status'],
        ]);

        return response()->json($paymentMethod, 201);
    }

    /**
     * Menampilkan detail satu metode (tidak terlalu dipakai, tapi ada).
     */
    public function show(PaymentMethod $paymentMethod)
    {
        return $paymentMethod;
    }

    /**
     * Mengupdate metode pembayaran (termasuk ganti gambar).
     * Kita harus pakai POST + _method=PUT untuk FormData
     */
    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'account_details' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string|in:Aktif,Tidak Aktif',
        ]);

        $imagePath = $paymentMethod->image; // Path lama

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($paymentMethod->image) {
                Storage::disk('public')->delete($paymentMethod->image);
            }
            // Simpan gambar baru
            $imagePath = $request->file('image')->store('payment_methods', 'public');
        }

        $paymentMethod->update([
            'name' => $validated['name'],
            'account_details' => $validated['account_details'],
            'image' => $imagePath,
            'status' => $validated['status'],
        ]);

        // Muat ulang data untuk mendapatkan image_url terbaru
        $paymentMethod->refresh();

        return response()->json($paymentMethod);
    }

    /**
     * Menghapus metode pembayaran (dan gambarnya).
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        // Hapus gambar dari storage
        if ($paymentMethod->image) {
            Storage::disk('public')->delete($paymentMethod->image);
        }

        $paymentMethod->delete();

        return response()->json(null, 204);
    }
}
