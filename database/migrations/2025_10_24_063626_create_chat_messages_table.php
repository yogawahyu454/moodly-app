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
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            // --- PERUBAHAN: Ganti chat_room_id menjadi booking_id ---
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            // --- AKHIR PERUBAHAN ---
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade'); // Pengirim (Customer atau Konselor)
            // Hapus receiver_id, karena penerima implisit adalah user lain dalam booking tsb
            // $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->text('message');
            $table->boolean('is_read')->default(false); // Penanda dibaca (oleh penerima)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
