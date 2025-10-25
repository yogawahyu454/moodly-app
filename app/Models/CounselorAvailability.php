<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CounselorAvailability extends Model
{
    use HasFactory;

    protected $fillable = [
        // --- PERBAIKAN: Tambahkan counselor_id ---
        'counselor_id',
        // --- AKHIR PERBAIKAN ---
        'day_of_week',
        'start_time',
        'end_time',
    ];

    /**
     * Relasi ke User (Konselor) yang memiliki jadwal ini.
     */
    public function counselor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'counselor_id');
    }
}
