<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuperAdmin\JenisKonselingController;

/*
|--------------------------------------------------------------------------
| Super Admin Routes
|--------------------------------------------------------------------------
|
| Rute-rute ini khusus untuk Super Admin dan akan diproteksi
| dengan middleware yang sesuai.
|
*/

// Grup rute untuk Super Admin
Route::middleware(['auth:sanctum', 'role:super-admin'])->prefix('super-admin')->group(function () {
    // Rute untuk mengelola Jenis Konseling (CRUD)
    Route::apiResource('jenis-konseling', JenisKonselingController::class);
});
