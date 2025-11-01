<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Perlebar kolom agar muat "Menunggu Pembayaran" (19 karakter)
            // Kita set ke 50 untuk keamanan
            $table->string('status_pesanan', 50)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Jika kita ingin revert, kita bisa kembalikan ke default (255)
            // atau panjang spesifik sebelumnya jika diketahui (misal 20)
            // Untuk amannya, kita biarkan saja string default (255)
            $table->string('status_pesanan')->change();
        });
    }
};
