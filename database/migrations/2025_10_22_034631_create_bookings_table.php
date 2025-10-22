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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('konselor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('jenis_konseling_id')->constrained('jenis_konselings')->onDelete('cascade');
            $table->foreignId('durasi_konseling_id')->constrained('durasi_konselings')->onDelete('cascade');
            $table->foreignId('tempat_konseling_id')->nullable()->constrained('tempat_konselings')->onDelete('set null'); // Nullable for online

            $table->date('tanggal_konsultasi');
            $table->string('jam_konsultasi'); // e.g., "09.00 - 11.00"
            $table->enum('metode_konsultasi', ['Video Call', 'Voice Call', 'Chat', 'Tatap Muka']);
            $table->enum('status_pesanan', ['Selesai', 'Batal', 'Proses', 'Dijadwalkan', 'Menunggu Konfirmasi'])->default('Menunggu Konfirmasi');
            $table->unsignedInteger('total_harga');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
