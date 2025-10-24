<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', // <-- Pastikan ini ada
        'sender_id',
        'message',
        'is_read',
    ];

    /**
     * Relasi ke Booking yang memiliki pesan ini.
     */
    public function booking(): BelongsTo
    {
        // --- PERUBAHAN: Relasi ke Booking ---
        return $this->belongsTo(Booking::class);
        // --- AKHIR PERUBAHAN ---
    }

    /**
     * Relasi ke User yang mengirim pesan.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Kita tidak pakai receiver_id lagi
    // public function receiver(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'receiver_id');
    // }
}
