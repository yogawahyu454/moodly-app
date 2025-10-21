<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DurasiKonseling extends Model
{
    use HasFactory;

    protected $fillable = [
        'durasi_menit',
        'harga',
    ];
}
