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
        Schema::table('jenis_konselings', function (Blueprint $table) {
            // Kita ganti nama kolomnya
            // 'image' akan menyimpan path seperti 'jenis-konseling-icons/gambar.png'
            $table->renameColumn('image_url', 'image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jenis_konselings', function (Blueprint $table) {
            // Logika untuk rollback jika diperlukan
            $table->renameColumn('image', 'image_url');
        });
    }
};
