<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Di sini Anda bisa mendaftarkan rute web untuk aplikasi Anda.
| File ini SEHARUSNYA TIDAK berisi rute API seperti login atau register.
|
*/

Route::get('/', function () {
    // Rute ini hanya untuk mengecek apakah Laravel berjalan, bisa diakses dari browser.
    return ['Laravel' => app()->version()];
});

// Perhatikan: baris 'require __DIR__.'/auth.php';' SUDAH DIHAPUS.
