<?php

namespace Database\Seeders;

use App\Models\JenisKonseling;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            JenisKonselingSeeder::class,
            DurasiKonselingSeeder::class,
            TempatKonselingSeeder::class,
            BookingSeeder::class,
            CounselorAvailabilitySeeder::class,
        ]);
    }
}
