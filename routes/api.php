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

use App\Http\Controllers\Customer\BerandaController;
use App\Http\Controllers\Customer\HistoryController;
use App\Http\Controllers\Customer\BookingFlowController;
use App\Http\Controllers\BookingChatController;

use App\Http\Middleware\RoleMiddleware;
use App\Models\User;
use App\Models\Booking;
use App\Models\TempatKonseling;

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

        // --- RUTE UNTUK CUSTOMER ---
        Route::get('/beranda-data', [BerandaController::class, 'getBerandaData']);

        // History
        Route::get('/history', [HistoryController::class, 'index']);
        Route::get('/history/{booking}', [HistoryController::class, 'show']);
        Route::patch('/history/{booking}/cancel', [HistoryController::class, 'cancel']);
        Route::patch('/history/{booking}/reschedule', [HistoryController::class, 'reschedule']);

        // Booking Flow
        Route::get('/booking/tempat-konseling', [BookingFlowController::class, 'getTempatKonseling']);
        Route::get('/booking/tempat-konseling/{tempatKonseling}', [BookingFlowController::class, 'getTempatDetail'])
            ->where('tempatKonseling', '[0-9]+');
        Route::get('/booking/counselors', [BookingFlowController::class, 'getCounselors']);
        Route::get('/booking/counselors/{konselor}', [BookingFlowController::class, 'showCounselor'])
            ->where('konselor', '[0-9]+');

        // --- INI RUTE YANG HILANG (SUDAH DITAMBAHKAN) ---
        Route::get('/booking/counselors/{konselor}/schedule-options', [BookingFlowController::class, 'getScheduleOptions'])
            ->where('konselor', '[0-9]+');

        // Booking Chat
        Route::prefix('booking/{booking}/chat')->group(function () {
            Route::get('/messages', [BookingChatController::class, 'index'])->where('booking', '[0-9]+');
            Route::post('/messages', [BookingChatController::class, 'store'])->where('booking', '[0-9]+');
        });


        // --- RUTE UNTUK SUPER ADMIN ---
        Route::middleware(RoleMiddleware::class . ':super-admin')->prefix('super-admin')->group(function () {
            Route::apiResource('jenis-konseling', JenisKonselingController::class);
            Route::post('jenis-konseling/{jenisKonseling}', [JenisKonselingController::class, 'update']);
            Route::apiResource('durasi-konseling', DurasiKonselingController::class);
            Route::apiResource('tempat-konseling', TempatKonselingController::class);
            Route::post('tempat-konseling/{tempatKonseling}', [TempatKonselingController::class, 'update']);

            // Manajemen Admin
            Route::post('admin-management/{user}/block', [AdminManagementController::class, 'block']);
            Route::post('admin-management/{user}/unblock', [AdminManagementController::class, 'unblock']);
            Route::apiResource('admin-management', AdminManagementController::class)->parameters(['admin-management' => 'user']);

            // Manajemen Konselor
            Route::post('konselor-management/{user}/block', [KonselorManagementController::class, 'block']);
            Route::post('konselor-management/{user}/unblock', [KonselorManagementController::class, 'unblock']);
            Route::apiResource('konselor-management', KonselorManagementController::class)->parameters(['konselor-management' => 'user']);
            Route::post('konselor-management/{user}', [KonselorManagementController::class, 'update']);

            // Manajemen Jadwal Konselor
            Route::get('konselor-management/{user}/availabilities', [KonselorManagementController::class, 'getAvailabilities']);
            Route::post('konselor-management/{user}/availabilities', [KonselorManagementController::class, 'storeAvailability']);
            Route::put('konselor-management/{user}/availabilities/{availability}', [KonselorManagementController::class, 'updateAvailability']);
            Route::delete('konselor-management/{user}/availabilities/{availability}', [KonselorManagementController::class, 'destroyAvailability']);

            // Manajemen Customer
            Route::post('customer-management/{user}/block', [CustomerManagementController::class, 'block']);
            Route::post('customer-management/{user}/unblock', [CustomerManagementController::class, 'unblock']);
            Route::apiResource('customer-management', CustomerManagementController::class)->parameters(['customer-management' => 'user'])->only(['index', 'show', 'destroy']);

            // Manajemen Booking
            Route::apiResource('booking-management', BookingManagementController::class)->only(['index', 'show', 'destroy']);
        });

        // --- RUTE UNTUK ADMIN ---
        Route::middleware(RoleMiddleware::class . ':admin,super-admin')->prefix('admin')->group(function () {
            // Jadwal Konsultasi
            Route::get('jadwal-konsultasi', [JadwalKonsultasiController::class, 'index']);
            Route::get('jadwal-konsultasi/{booking:id}', [JadwalKonsultasiController::class, 'show']);
            Route::delete('jadwal-konsultasi/{booking:id}', [JadwalKonsultasiController::class, 'destroy']);
            Route::patch('jadwal-konsultasi/{booking:id}/status', [JadwalKonsultasiController::class, 'updateStatus']);

            // Verifikasi Konselor
            Route::get('verifikasi-konselor', [KonselorVerificationController::class, 'index']);
            Route::get('verifikasi-konselor/{user:id}', [KonselorVerificationController::class, 'show']);
            Route::post('verifikasi-konselor/{user:id}/approve', [KonselorVerificationController::class, 'approve']);
            Route::post('verifikasi-konselor/{user:id}/reject', [KonselorVerificationController::class, 'reject']);

            // Verifikasi Customer
            Route::get('verifikasi-customer', [CustomerVerificationController::class, 'index']);
            Route::get('verifikasi-customer/{user:id}', [CustomerVerificationController::class, 'show']);
            Route::post('verifikasi-customer/{user:id}/approve', [CustomerVerificationController::class, 'approve']);
            Route::post('verifikasi-customer/{user:id}/reject', [CustomerVerificationController::class, 'reject']);
        });
    });
});
