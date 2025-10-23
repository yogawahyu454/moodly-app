<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'konselor_id',
        'jenis_konseling_id',
        'durasi_konseling_id',
        'tempat_konseling_id',
        'tanggal_konsultasi',
        'jam_konsultasi',
        'metode_konsultasi',
        'status_pesanan',
        'total_harga',
        'alasan_pembatalan',
        'catatan_pembatalan',
    ];

    /**
     * Get the customer that owns the booking.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get the konselor associated with the booking.
     */
    public function konselor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'konselor_id');
    }

    /**
     * Get the jenis konseling associated with the booking.
     */
    public function jenisKonseling(): BelongsTo
    {
        return $this->belongsTo(JenisKonseling::class);
    }

    // Tambahkan relasi lain jika perlu (Durasi, Tempat)
}
