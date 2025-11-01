<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Filesystem\FilesystemAdapter;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'account_details',
        'image',
        'status',
    ];

    /**
     * Accessor untuk mendapatkan URL lengkap gambar QRIS.
     */
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {

            /** @var FilesystemAdapter $disk */
            $disk = Storage::disk('public');
            return $disk->url($this->image);
        }
        // Fallback jika tidak ada gambar
        return 'https://placehold.co/300x300/EBF8FF/3B82F6?text=QRIS';
    }
}
