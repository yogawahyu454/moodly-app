<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // <-- Import Storage

class TempatKonseling extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_tempat',
        'alamat',
        'image',        // <-- TAMBAHKAN
        'rating',       // <-- TAMBAHKAN
        'review_count', // <-- TAMBAHKAN
        'status',
    ];

    protected $casts = [
        'rating' => 'float', // Coba ganti ke float
    ];

    /**
     * Accessor untuk mendapatkan URL gambar lengkap.
     *
     * @param string|null $value
     * @return string|null
     */
    public function getImageAttribute($value)
    {
        // Jika ada path gambar, buat URL lengkapnya
        // Jika tidak, kembalikan null atau URL placeholder
        if ($value) {
            // Pastikan APP_URL di .env sudah benar (http://localhost:8000)
            return Storage::url($value);
        }
        // Ganti dengan URL placeholder jika Anda mau
        return null;
        // Contoh Placeholder:
        // return 'https://placehold.co/400x300/E0F2FE/0EA5E9?text=Tempat';
    }

    // TODO: Definisikan relasi ke Konselor jika perlu
    // Misal, jika satu tempat hanya punya konselor tertentu
    // public function konselors() {
    //     return $this->belongsToMany(User::class, 'konselor_tempat'); // Contoh pivot table
    // }
}
