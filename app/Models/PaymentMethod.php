<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // Pastikan Storage di-import
use Illuminate\Database\Eloquent\Casts\Attribute; // Pastikan Attribute di-import

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'account_details',
        'image',
        'status', // 'Aktif', 'Tidak Aktif'
    ];

    /**
     * protected $casts = [
     * 'account_details' => 'json', // Jika Anda menyimpannya sebagai JSON
     * ];
     */

    // --- TAMBAHAN BARU: Memberitahu Eloquent untuk SELALU menyertakan 'image_url' ---
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['image_url'];
    // --- AKHIR TAMBAHAN ---


    /**
     * Accessor untuk mendapatkan URL lengkap gambar QRIS.
     * Nama method: imageUrl() -> akan diakses sebagai $model->image_url
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->image
                /** @phpstan-ignore-next-line */
                ? Storage::disk('public')->url($this->image)
                : null,
        );
    }
}
