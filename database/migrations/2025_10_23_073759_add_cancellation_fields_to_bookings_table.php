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
            // Menambahkan kolom setelah 'total_harga'
            $table->string('alasan_pembatalan')->nullable()->after('total_harga');
            $table->text('catatan_pembatalan')->nullable()->after('alasan_pembatalan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['alasan_pembatalan', 'catatan_pembatalan']);
        });
    }
};
