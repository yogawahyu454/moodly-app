<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // MODIFIKASI PENTING:
        // Jika permintaan datang dari API (mengharapkan JSON), jangan redirect.
        // Cukup kembalikan null, dan Laravel akan secara otomatis mengirim
        // respons error 401 Unauthorized dalam format JSON.
        // Ini akan mencegah redirect yang menyebabkan error CORS.
        if ($request->expectsJson()) {
            return null;
        }

        // Baris ini adalah perilaku default untuk aplikasi web biasa,
        // kita biarkan saja untuk keamanan.
        return route('login');
    }
}
