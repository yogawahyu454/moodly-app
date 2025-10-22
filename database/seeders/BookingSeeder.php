<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\JenisKonseling;
use App\Models\DurasiKonseling;
use App\Models\Booking;
use Carbon\Carbon; // Untuk manipulasi tanggal

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ambil ID yang ada dari tabel relasi
        $customerIds = User::where('role', 'customer')->pluck('id')->toArray();
        $konselorIds = User::where('role', 'konselor')->pluck('id')->toArray();
        $jenisKonselingIds = JenisKonseling::pluck('id')->toArray();
        $durasiKonselingIds = DurasiKonseling::pluck('id')->toArray();

        // Pastikan ada data di tabel relasi sebelum melanjutkan
        if (empty($customerIds) || empty($konselorIds) || empty($jenisKonselingIds) || empty($durasiKonselingIds)) {
            $this->command->info('Tidak dapat membuat seeder Booking. Pastikan tabel users (customer & konselor), jenis_konselings, dan durasi_konselings sudah terisi data.');
            return;
        }

        // 2. Daftar kemungkinan status dan metode
        $statuses = ['Selesai', 'Batal', 'Proses', 'Dijadwalkan', 'Menunggu Konfirmasi'];
        $metodes = ['Video Call', 'Voice Call', 'Chat', 'Tatap Muka'];
        $jamKonsultasiOptions = ["09.00 - 10.00", "10.00 - 11.00", "13.00 - 14.00", "14.00 - 15.00"];

        // 3. Buat 15 data booking contoh
        for ($i = 0; $i < 15; $i++) {
            $durasi = DurasiKonseling::find($durasiKonselingIds[array_rand($durasiKonselingIds)]); // Ambil model durasi untuk harga

            Booking::create([
                'customer_id' => $customerIds[array_rand($customerIds)],
                'konselor_id' => $konselorIds[array_rand($konselorIds)],
                'jenis_konseling_id' => $jenisKonselingIds[array_rand($jenisKonselingIds)],
                'durasi_konseling_id' => $durasi->id,
                // 'tempat_konseling_id' => null, // Biarkan null untuk contoh
                'tanggal_konsultasi' => Carbon::now()->subDays(rand(1, 30))->toDateString(), // Tanggal acak dalam 30 hari terakhir
                'jam_konsultasi' => $jamKonsultasiOptions[array_rand($jamKonsultasiOptions)],
                'metode_konsultasi' => $metodes[array_rand($metodes)],
                'status_pesanan' => $statuses[array_rand($statuses)],
                'total_harga' => $durasi->harga, // Ambil harga dari durasi yang dipilih
            ]);
        }

        $this->command->info('Seeder Booking berhasil dijalankan.');
    }
}
