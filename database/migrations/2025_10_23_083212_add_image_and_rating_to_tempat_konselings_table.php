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
        Schema::table('tempat_konselings', function (Blueprint $table) {
            // Kolom untuk menyimpan path gambar, setelah 'alamat'
            $table->string('image')->nullable()->after('alamat');
            // Kolom untuk rating (misal: 4.8), setelah 'image'
            $table->decimal('rating', 2, 1)->nullable()->after('image');
            // Kolom untuk jumlah review (misal: 198), setelah 'rating'
            $table->unsignedInteger('review_count')->nullable()->default(0)->after('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tempat_konselings', function (Blueprint $table) {
            $table->dropColumn(['image', 'rating', 'review_count']);
        });
    }
};
