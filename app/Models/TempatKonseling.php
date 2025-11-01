<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute; // <-- TAMBAHKAN INI

class TempatKonseling extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_tempat',
        'alamat',
        'image',        // Path gambar di storage
        'rating',
        'review_count',
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

    protected $casts = [
        'rating' => 'float',
    ];

    /**
     * Accessor untuk mendapatkan URL gambar lengkap (Gaya Baru).
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
                return 'https://placehold.co/400x300/E0F2FE/0EA5E9?text=' . urlencode($this->nama_tempat);
            }
            // --- AKHIR PERBAIKAN ---
        );
    }
}
