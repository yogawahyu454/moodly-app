<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // <-- TAMBAHKAN INI
use Illuminate\Database\Eloquent\Casts\Attribute; // <-- TAMBAHKAN INI

class JenisKonseling extends Model
{
    use HasFactory;

    /**
     * Atribut yang bisa diisi secara massal (mass assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'jenis_konseling',
        'tipe_layanan',
        'image', // Path gambar di storage
        'biaya_layanan',
        'nilai',
        'status',
    ];

    // --- TAMBAHAN BARU: Memberitahu Eloquent untuk SELALU menyertakan 'image_url' ---
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['image_url'];
    // --- AKHIR TAMBAHAN ---

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'image', // Sembunyikan path 'image' asli
    ];

    /**
     * Mendapatkan URL lengkap untuk gambar.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            // --- PERBAIKAN: Menggunakan function() {} ---
            get: function () {
                if ($this->image) {
                    /** @phpstan-ignore-next-line */
                    return Storage::disk('public')->url($this->image);
                }
                // Placeholder default jika tidak ada gambar
                return 'https://placehold.co/400x300/E0F2FE/0EA5E9?text=' . urlencode($this->jenis_konseling);
            }
            // --- AKHIR PERBAIKAN ---
        );
    }
}
