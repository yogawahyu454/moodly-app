<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JenisKonseling;

class JenisKonselingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jenisKonselings = [
            ['jenis_konseling' => 'Konseling Pernikahan', 'biaya_layanan' => 'Nominal Tetap', 'nilai' => '50000', 'status' => 'Aktif'],
            ['jenis_konseling' => 'Konseling Individu', 'biaya_layanan' => 'Nominal Tetap', 'nilai' => '50000', 'status' => 'Aktif'],
            ['jenis_konseling' => 'Konseling Keluarga', 'biaya_layanan' => 'Persentase', 'nilai' => '10%', 'status' => 'Aktif'],
            ['jenis_konseling' => 'Konseling Karir', 'biaya_layanan' => 'Persentase', 'nilai' => '10%', 'status' => 'Aktif'],
            ['jenis_konseling' => 'Konseling Depresi', 'biaya_layanan' => 'Nominal Tetap', 'nilai' => '50000', 'status' => 'Aktif'],
            ['jenis_konseling' => 'Konseling Anak', 'biaya_layanan' => 'Persentase', 'nilai' => '10%', 'status' => 'Tidak Aktif'], // Contoh tidak aktif
        ];

        foreach ($jenisKonselings as $jenis) {
            JenisKonseling::create($jenis);
        }
        $this->command->info('JenisKonselingSeeder berhasil dijalankan.');
    }
}
