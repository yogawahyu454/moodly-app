<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuperAdmin\JenisKonselingController;
use App\Http\Controllers\SuperAdmin\DurasiKonselingController;
use App\Http\Controllers\SuperAdmin\TempatKonselingController;
use App\Http\Controllers\SuperAdmin\AdminManagementController;
use App\Http\Controllers\SuperAdmin\KonselorManagementController;
use App\Http\Controllers\SuperAdmin\CustomerManagementController;
use App\Http\Controllers\SuperAdmin\BookingManagementController;

use App\Http\Controllers\Admin\JadwalKonsultasiController;
use App\Http\Controllers\Admin\KonselorVerificationController;
use App\Http\Middleware\RoleMiddleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- GRUP UTAMA UNTUK SEMUA RUTE YANG MEMBUTUHKAN SESI ---
Route::group(['middleware' => [
    \Illuminate\Cookie\Middleware\EncryptCookies::class,
    \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    \Illuminate\Session\Middleware\StartSession::class,
]], function () {

    // 1. Rute Autentikasi
    require __DIR__ . '/auth.php';

    // 2. Grup untuk SEMUA rute yang terproteksi
    Route::middleware('auth:sanctum')->group(function () {

        // Rute umum
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // Rute khusus Super Admin
        Route::middleware(RoleMiddleware::class . ':super-admin')->prefix('super-admin')->group(function () {
            Route::apiResource('jenis-konseling', JenisKonselingController::class);
            Route::apiResource('durasi-konseling', DurasiKonselingController::class);
            Route::apiResource('tempat-konseling', TempatKonselingController::class);

            // Rute untuk manajemen admin
            Route::post('admin-management/{user}/block', [AdminManagementController::class, 'block']);
            Route::post('admin-management/{user}/unblock', [AdminManagementController::class, 'unblock']);
            Route::apiResource('admin-management', AdminManagementController::class)->parameters(['admin-management' => 'user']);

            // Rute untuk manajemen konselor
            Route::post('konselor-management/{user}/block', [KonselorManagementController::class, 'block']);
            Route::post('konselor-management/{user}/unblock', [KonselorManagementController::class, 'unblock']);
            Route::apiResource('konselor-management', KonselorManagementController::class)->parameters(['konselor-management' => 'user']);

            // Rute untuk manajemen customer
            Route::post('customer-management/{user}/block', [CustomerManagementController::class, 'block']);
            Route::post('customer-management/{user}/unblock', [CustomerManagementController::class, 'unblock']);
            Route::apiResource('customer-management', CustomerManagementController::class)->parameters(['customer-management' => 'user'])->only(['index', 'show', 'destroy']);

            Route::apiResource('booking-management', BookingManagementController::class)->only(['index', 'show', 'destroy']);
        });

        Route::middleware(RoleMiddleware::class . ':admin,super-admin')->prefix('admin')->group(function () {
            Route::apiResource('jadwal-konsultasi', JadwalKonsultasiController::class)->only(['index', 'show', 'destroy']);
            Route::get('verifikasi-konselor', [KonselorVerificationController::class, 'index']);
            Route::get('verifikasi-konselor/{user}', [KonselorVerificationController::class, 'show']);
            Route::post('verifikasi-konselor/{user}/approve', [KonselorVerificationController::class, 'approve']);
            Route::post('verifikasi-konselor/{user}/reject', [KonselorVerificationController::class, 'reject']);
        });
    });
});
