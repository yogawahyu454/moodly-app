<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany; // <-- TAMBAHKAN Import HasMany

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
        'alasan_pembatalan', // <-- Pastikan ada dari migrasi sebelumnya
        'catatan_pembatalan', // <-- Pastikan ada dari migrasi sebelumnya
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

    // --- RELASI BARU ---
    /**
     * Get all of the chat messages for the booking.
     */
    public function chatMessages(): HasMany
    {
        return $this->hasMany(ChatMessage::class);
    }
    // --- AKHIR RELASI BARU ---

    // Tambahkan relasi lain jika perlu (Durasi, Tempat)
    public function durasiKonseling(): BelongsTo
    {
        return $this->belongsTo(DurasiKonseling::class);
    }

    public function tempatKonseling(): BelongsTo
    {
        return $this->belongsTo(TempatKonseling::class);
    }
}
