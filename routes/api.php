<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Di bawah ini kita tidak lagi bergantung pada grup middleware 'api' dari Kernel.
| Kita secara manual menyuntikkan middleware yang dibutuhkan untuk sesi stateful.
|
*/

// --- INTERVENSI LANGSUNG ---
// Kita memaksa Laravel untuk menjalankan middleware sesi dan cookie
// sebelum memproses rute-rute di dalamnya.
Route::group(['middleware' => [
    \Illuminate\Cookie\Middleware\EncryptCookies::class,
    \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    \Illuminate\Session\Middleware\StartSession::class,
]], function () {

    // Rute untuk pengguna yang sudah login (terproteksi)
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    // Memuat semua rute autentikasi (login, register, logout, dll.)
    // di dalam grup yang sudah kita paksa untuk memiliki sesi ini.
    require __DIR__ . '/auth.php';
});
