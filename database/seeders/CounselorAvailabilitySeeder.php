<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\CounselorAvailability;
use Illuminate\Support\Facades\DB; // Import DB Facade

class CounselorAvailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama jika ada
        DB::table('counselor_availabilities')->delete();

        // Cari konselor pertama (atau sesuaikan logikanya)
        $konselor1 = User::where('role', 'konselor')->first();

        if ($konselor1) {
            CounselorAvailability::create([
                'counselor_id' => $konselor1->id,
                'day_of_week' => 1, // Senin
                'start_time' => '09:00:00',
                'end_time' => '12:00:00',
            ]);
            CounselorAvailability::create([
                'counselor_id' => $konselor1->id,
                'day_of_week' => 1, // Senin
                'start_time' => '13:00:00',
                'end_time' => '16:00:00',
            ]);
            CounselorAvailability::create([
                'counselor_id' => $konselor1->id,
                'day_of_week' => 3, // Rabu
                'start_time' => '10:00:00',
                'end_time' => '15:00:00',
            ]);
        }

        // Tambahkan untuk konselor lain jika perlu
        // $konselor2 = User::where('role', 'konselor')->skip(1)->first();
        // if ($konselor2) { ... }

        $this->command->info('Counselor availability seeded!'); // Pesan sukses
    }
}
