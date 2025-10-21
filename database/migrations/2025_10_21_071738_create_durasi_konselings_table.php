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
        Schema::create('durasi_konselings', function (Blueprint $table) {
            $table->id();
            $table->string('durasi_menit'); // Contoh: "60 Menit"
            $table->unsignedInteger('harga'); // Simpan sebagai angka, contoh: 100000
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('durasi_konselings');
    }
};
