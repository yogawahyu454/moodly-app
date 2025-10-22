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
use App\Http\Controllers\Admin\CustomerVerificationController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\User;

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

    Route::get('admin/verifikasi-konselor/{user:id}', function (User $user) {
        // Tes apakah $user berhasil di-binding
        if ($user && $user->role === 'konselor') {
            return response()->json([
                'message' => 'TES ISOLASI BERHASIL!',
                'user_id' => $user->id,
                'user_name' => $user->name,
                'user_role' => $user->role,
                'user_status' => $user->status,
            ]);
        } else {
            // Jika binding gagal atau role salah
            return response()->json(['message' => 'TES ISOLASI GAGAL: Binding User gagal atau role salah.'], 404);
        }
    });

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

            // Route::get('verifikasi-konselor/{user:id}', [KonselorVerificationController::class, 'show']);
            Route::post('verifikasi-konselor/{user:id}/approve', [KonselorVerificationController::class, 'approve']);
            Route::post('verifikasi-konselor/{user:id}/reject', [KonselorVerificationController::class, 'reject']);

            // --- Rute Verifikasi Customer ---
            Route::get('verifikasi-customer', [CustomerVerificationController::class, 'index']);
            Route::get('verifikasi-customer/{user:id}', [CustomerVerificationController::class, 'show']);
            Route::post('verifikasi-customer/{user:id}/approve', [CustomerVerificationController::class, 'approve']);
            Route::post('verifikasi-customer/{user:id}/reject', [CustomerVerificationController::class, 'reject']);
        });
    });
});
