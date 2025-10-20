<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // Untuk API, kita tidak me-redirect, tapi bisa mengembalikan response JSON jika diperlukan
                // atau biarkan saja untuk melanjutkan ke home jika diakses via web.
                // Untuk kasus API kita, biasanya middleware ini tidak terlalu berpengaruh.
            }
        }

        return $next($request);
    }
}
