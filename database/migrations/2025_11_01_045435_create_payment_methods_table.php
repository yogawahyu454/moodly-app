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
            Schema::create('payment_methods', function (Blueprint $table) {
                $table->id();
                $table->string('name'); // Misal: "QRIS - BCA"
                $table->string('account_details')->nullable(); // Misal: "a/n PT. Moodly Digital"
                $table->string('image')->nullable(); // Path ke gambar QRIS
                $table->string('status')->default('Aktif'); // Aktif / Tidak Aktif
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('payment_methods');
        }
    };
