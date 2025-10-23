<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany; // <-- TAMBAHKAN
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage; // <-- TAMBAHKAN
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'email',
        'role',
        'status',
        'phone',
        'province',
        'city',
        'district',
        'postal_code',
        'street_address',
        'balance',
        'password',
        'surat_izin_praktik',
        'spesialisasi',
        'rating',
        'universitas',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'spesialisasi' => 'array',
    ];

    // --- RELASI BARU ---

    /**
     * Get all of the bookings for the User (sebagai customer).
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'customer_id');
    }

    // --- ACCESSOR BARU UNTUK AVATAR ---

    /**
     * Mengambil atribut avatar.
     * Mengubah path (e.g., "avatars/abc.png") menjadi URL lengkap
     * atau memberikan fallback jika tidak ada.
     *
     * @param  string|null  $value
     * @return string|null
     */
    public function getAvatarAttribute($value)
    {
        // Jika value ada (path ke file), kembalikan URL lengkap.
        if ($value) {
            return Storage::url($value);
        }

        // Fallback ke UI Avatars jika tidak ada avatar
        $name = urlencode($this->name);
        return "https://ui-avatars.com/api/?name={$name}&background=EBF4FF&color=3B82F6&bold=true";
    }
}
