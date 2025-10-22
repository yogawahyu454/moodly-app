<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DurasiKonseling;

class DurasiKonselingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $durasiKonselings = [
            ['durasi_menit' => '60 Menit', 'harga' => 100000],
            ['durasi_menit' => '120 Menit', 'harga' => 200000],
            ['durasi_menit' => '180 Menit', 'harga' => 230000],
            ['durasi_menit' => '240 Menit', 'harga' => 300000],
        ];

        foreach ($durasiKonselings as $durasi) {
            DurasiKonseling::create($durasi);
        }
        $this->command->info('DurasiKonselingSeeder berhasil dijalankan.');
    }
}
