<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'account_details',
        'image', // Path gambar di storage
        'status',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['image_url'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'image', // Sembunyikan path 'image' asli
    ];

    /**
     * Accessor untuk mendapatkan URL lengkap gambar QRIS.
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

                // Placeholder jika tidak ada gambar (meskipun seharusnya tidak terjadi jika Super Admin wajib upload)
                return 'https://placehold.co/200x200/E0F2FE/0EA5E9?text=QRIS+Not+Found';
            }
            // --- AKHIR PERBAIKAN ---
        );
    }
}
