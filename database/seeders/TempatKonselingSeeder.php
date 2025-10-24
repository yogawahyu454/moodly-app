<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TempatKonseling; // <-- Import model
use Illuminate\Support\Facades\DB; // <-- Import DB facade if truncating

class TempatKonselingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama (opsional, tapi disarankan)
        // DB::table('tempat_konselings')->truncate(); // Hapus semua data sebelum seeding

        TempatKonseling::create([
            'nama_tempat' => 'Rumah Moodly Sleman',
            'alamat' => 'Jl. Magelang Km 4.5 No. 18, Mlati, Sleman, Yogyakarta 55284',
            'image' => 'tempat-konseling-icons/rumah_moodly_sleman.jpg', // <-- Ganti nama file jika perlu
            'rating' => 5.0,
            'review_count' => 198,
            'status' => 'Aktif',
        ]);

        TempatKonseling::create([
            'nama_tempat' => 'Rumah Moodly Bantul',
            'alamat' => 'Jl. Parangtritis Km 8, Sewon, Bantul, Yogyakarta 55188',
            'image' => 'tempat-konseling-icons/rumah_moodly_bantul.jpg', // <-- Ganti nama file jika perlu
            'rating' => 5.0,
            'review_count' => 170,
            'status' => 'Aktif',
        ]);

        TempatKonseling::create([
            'nama_tempat' => 'Rumah Moodly Kraton',
            'alamat' => 'Jl. Rotowijayan No. 10, Kadipaten, Kraton, Yogyakarta 55132',
            'image' => 'tempat-konseling-icons/rumah_moodly_kraton.jpg', // <-- Ganti nama file jika perlu
            'rating' => 5.0,
            'review_count' => 188,
            'status' => 'Aktif',
        ]);

        // Tambahkan data lain jika perlu
        TempatKonseling::create([
            'nama_tempat' => 'Cabang Nonaktif Contoh',
            'alamat' => 'Alamat Cabang Nonaktif',
            'image' => null, // Tidak ada gambar
            'rating' => null, // Tidak ada rating
            'review_count' => 0,
            'status' => 'Tidak Aktif', // Contoh status tidak aktif
        ]);
    }
}
