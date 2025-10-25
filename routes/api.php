<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- Import Controllers ---
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

// --- Import Middleware & Models ---
use App\Http\Middleware\RoleMiddleware;
use App\Models\User; // Digunakan di route model binding
use App\Models\Booking; // Digunakan di route model binding
use App\Models\TempatKonseling; // Digunakan di route model binding
use App\Models\JenisKonseling; // Digunakan di route model binding

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

    // 1. Rute Autentikasi (Didefinisikan di auth.php)
    require __DIR__ . '/auth.php';

    // 2. Grup untuk SEMUA rute yang terproteksi (membutuhkan login)
    Route::middleware('auth:sanctum')->group(function () {

        // Rute umum: Mengambil data user yang sedang login
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // ============================
        // --- RUTE UNTUK CUSTOMER ---
        // ============================
        Route::get('/beranda-data', [BerandaController::class, 'getBerandaData']);

        // History Routes
        Route::prefix('history')->group(function () {
            Route::get('/', [HistoryController::class, 'index']);
            Route::get('/{booking}', [HistoryController::class, 'show'])->where('booking', '[0-9]+');
            Route::patch('/{booking}/cancel', [HistoryController::class, 'cancel'])->where('booking', '[0-9]+');
            Route::patch('/{booking}/reschedule', [HistoryController::class, 'reschedule'])->where('booking', '[0-9]+');
        });

        // Booking Flow Routes
        Route::prefix('booking')->group(function () {
            Route::get('/tempat-konseling', [BookingFlowController::class, 'getTempatKonseling']);
            // Gunakan nama parameter yang sama dengan variabel di method controller
            Route::get('/tempat-konseling/{tempatKonseling}', [BookingFlowController::class, 'getTempatDetail'])
                ->where('tempatKonseling', '[0-9]+');
            Route::get('/counselors', [BookingFlowController::class, 'getCounselors']);
            // Gunakan nama parameter yang sama dengan variabel di method controller
            Route::get('/counselors/{konselor}', [BookingFlowController::class, 'showCounselor'])
                ->where('konselor', '[0-9]+');
            // --- RUTE BARU: Opsi Jadwal ---
            Route::get('/counselors/{konselor}/schedule-options', [BookingFlowController::class, 'getScheduleOptions'])
                ->where('konselor', '[0-9]+'); // Pastikan constraint ada
            // --- AKHIR RUTE BARU ---
        });

        // Booking Chat Routes
        Route::prefix('booking/{booking}/chat')
            ->where('booking', '[0-9]+') // Constraint untuk {booking}
            ->group(function () {
                Route::get('/messages', [BookingChatController::class, 'getMessages']);
                Route::post('/messages', [BookingChatController::class, 'sendMessage']);
            });

        // =============================
        // --- RUTE UNTUK SUPER ADMIN ---
        // =============================
        Route::middleware(RoleMiddleware::class . ':super-admin')->prefix('super-admin')->group(function () {
            // Pengaturan Konseling
            Route::apiResource('jenis-konseling', JenisKonselingController::class);
            // Gunakan nama parameter default {jenis_konseling} atau sesuaikan parameter di controller/resource
            Route::post('jenis-konseling/{jenis_konseling}', [JenisKonselingController::class, 'update'])->where('jenis_konseling', '[0-9]+');
            Route::apiResource('durasi-konseling', DurasiKonselingController::class);
            Route::apiResource('tempat-konseling', TempatKonselingController::class);
            // Gunakan nama parameter default {tempat_konseling} atau sesuaikan
            Route::post('tempat-konseling/{tempat_konseling}', [TempatKonselingController::class, 'update'])->where('tempat_konseling', '[0-9]+');

            // Manajemen User (Admin)
            Route::prefix('admin-management')->group(function () {
                Route::post('/{user}/block', [AdminManagementController::class, 'block'])->where('user', '[0-9]+');
                Route::post('/{user}/unblock', [AdminManagementController::class, 'unblock'])->where('user', '[0-9]+');
                // Rute update POST (karena frontend kirim FormData)
                Route::post('/{user}', [AdminManagementController::class, 'update'])->where('user', '[0-9]+');
            });
            Route::apiResource('admin-management', AdminManagementController::class)->parameters(['admin-management' => 'user']); // 'user' adalah nama parameter

            // Manajemen User (Konselor)
            Route::prefix('konselor-management')->group(function () {
                Route::post('/{user}/block', [KonselorManagementController::class, 'block'])->where('user', '[0-9]+');
                Route::post('/{user}/unblock', [KonselorManagementController::class, 'unblock'])->where('user', '[0-9]+');
                // Rute update POST (karena frontend kirim FormData)
                Route::post('/{user}', [KonselorManagementController::class, 'update'])->where('user', '[0-9]+');
            });
            Route::apiResource('konselor-management', KonselorManagementController::class)->parameters(['konselor-management' => 'user']); // 'user' adalah nama parameter

            // Manajemen User (Customer)
            Route::prefix('customer-management')->group(function () {
                Route::post('/{user}/block', [CustomerManagementController::class, 'block'])->where('user', '[0-9]+');
                Route::post('/{user}/unblock', [CustomerManagementController::class, 'unblock'])->where('user', '[0-9]+');
                // Tidak ada method update untuk customer oleh super-admin
            });
            Route::apiResource('customer-management', CustomerManagementController::class)->parameters(['customer-management' => 'user'])->only(['index', 'show', 'destroy']);
            Route::apiResource('booking-management', BookingManagementController::class)->only(['index', 'show', 'destroy']);
        });

        // =======================
        // --- RUTE UNTUK ADMIN ---
        // =======================
        Route::middleware(RoleMiddleware::class . ':admin,super-admin')->prefix('admin')->group(function () {
            // Jadwal Konsultasi (Verifikasi Booking)
            Route::prefix('jadwal-konsultasi')->group(function () {
                Route::get('/', [JadwalKonsultasiController::class, 'index']);
                // Gunakan nama parameter {booking} agar konsisten dengan controller/model binding
                Route::get('/{booking}', [JadwalKonsultasiController::class, 'show'])->where('booking', '[0-9]+');
                Route::delete('/{booking}', [JadwalKonsultasiController::class, 'destroy'])->where('booking', '[0-9]+');
                Route::patch('/{booking}/status', [JadwalKonsultasiController::class, 'updateStatus'])->where('booking', '[0-9]+');
            });

            // Verifikasi Konselor
            Route::prefix('verifikasi-konselor')->group(function () {
                Route::get('/', [KonselorVerificationController::class, 'index']);
                // Gunakan nama parameter {user}
                Route::get('/{user}', [KonselorVerificationController::class, 'show'])->where('user', '[0-9]+');
                Route::post('/{user}/approve', [KonselorVerificationController::class, 'approve'])->where('user', '[0-9]+');
                Route::post('/{user}/reject', [KonselorVerificationController::class, 'reject'])->where('user', '[0-9]+');
            });

            // Verifikasi Customer
            Route::prefix('verifikasi-customer')->group(function () {
                Route::get('/', [CustomerVerificationController::class, 'index']);
                // Gunakan nama parameter {user}
                Route::get('/{user}', [CustomerVerificationController::class, 'show'])->where('user', '[0-9]+');
                Route::post('/{user}/approve', [CustomerVerificationController::class, 'approve'])->where('user', '[0-9]+');
                Route::post('/{user}/reject', [CustomerVerificationController::class, 'reject'])->where('user', '[0-9]+');
            });
        });
    }); // End auth:sanctum group
}); // End main group
