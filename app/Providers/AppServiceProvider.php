<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate; // <-- Import Gate
use App\Models\User; // <-- Import User
use App\Models\Booking; // <-- Import Booking

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
        Gate::define('viewChat', function (User $user, Booking $booking) {
            // Izinkan jika user adalah customer ATAU konselor dari booking tsb
            return $user->id === $booking->customer_id || $user->id === $booking->konselor_id;
        });

        // Gate untuk mengirim pesan
        Gate::define('sendMessage', function (User $user, Booking $booking) {
            // Izinkan jika user adalah customer ATAU konselor
            // DAN status booking masih relevan (misal: 'Aktif' atau 'Dijadwalkan')
            $isParticipant = $user->id === $booking->customer_id || $user->id === $booking->konselor_id;

            // Asumsikan chat hanya bisa dilakukan jika status 'Aktif' atau 'Dijadwalkan'
            // Sesuaikan logika status ini jika perlu
            $isBookingActive = in_array($booking->status_pesanan, ['Aktif', 'Dijadwalkan']);

            return $isParticipant && $isBookingActive;
        });
    }
}
