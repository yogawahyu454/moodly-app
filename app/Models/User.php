<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute; // <-- TAMBAHKAN INI

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
        'avatar', // Path avatar di storage
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

    // --- TAMBAHAN BARU: Memberitahu Eloquent untuk SELALU menyertakan 'avatar_url' ---
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['avatar_url'];
    // --- AKHIR TAMBAHAN ---


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'avatar', // Sembunyikan path 'avatar' asli, tampilkan 'avatar_url' saja
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

    // --- ACCESSOR BARU UNTUK AVATAR (Gaya Baru) ---

    /**
     * Mendapatkan URL lengkap untuk avatar.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            // --- PERBAIKAN: Menggunakan function() {}
            get: function () {
                if ($this->avatar) {
                    // Gunakan disk 'public'
                    /** @phpstan-ignore-next-line */
                    return Storage::disk('public')->url($this->avatar);
                }

                // Fallback ke UI Avatars
                $name = urlencode($this->name);
                return "https://ui-avatars.com/api/?name={$name}&background=EBF4FF&color=3B82F6&bold=true";
            }
            // --- AKHIR PERBAIKAN ---
        );
    }
}
