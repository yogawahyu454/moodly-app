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
            $table->enum('tipe_layanan', ['Online', 'Offline'])
                ->default('Online')
                ->after('jenis_konseling');

            $table->string('image_url')->nullable()->after('tipe_layanan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jenis_konselings', function (Blueprint $table) {
            $table->dropColumn(['tipe_layanan', 'image_url']);
        });
    }
};
