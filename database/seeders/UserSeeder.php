<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- SUPER ADMIN ---
        User::updateOrCreate(
            ['email' => 'ullulazmia.l@gmail.com'],
            [
                'name' => 'Super Admin Moodly',
                'role' => 'super-admin',
                'status' => 'Online',
                'phone' => '081234567890',
                'city' => 'Yogyakarta',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // --- ADMIN ---
        User::updateOrCreate(
            ['email' => 'admin@moodly.com'],
            [
                'name' => 'Admin Satu',
                'role' => 'admin',
                'status' => 'Offline',
                'phone' => '081234567891',
                'city' => 'Yogyakarta',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        User::updateOrCreate(
            ['email' => 'admin1@moodly.com'],
            [
                'name' => 'Admin Dua',
                'role' => 'admin',
                'status' => 'Offline',
                'phone' => '081234567892',
                'city' => 'Solo',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // --- KONSELOR ---
        $konselorStatuses = ['Verifikasi', 'Terverifikasi', 'Ditolak', 'Banned'];
        for ($i = 1; $i <= 5; $i++) {
            User::updateOrCreate(
                ['email' => 'konselor' . $i . '@moodly.com'],
                [
                    'name' => 'Konselor ' . $i,
                    'role' => 'konselor',
                    'status' => $konselorStatuses[array_rand($konselorStatuses)],
                    'phone' => '082' . str_pad($i, 9, '0', STR_PAD_LEFT),
                    'city' => ['Yogyakarta', 'Jakarta', 'Bandung', 'Surabaya'][array_rand(['Yogyakarta', 'Jakarta', 'Bandung', 'Surabaya'])],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'surat_izin_praktik' => 'SIP-00' . $i,
                    'spesialisasi' => ['Keluarga', 'Anak', 'Remaja'], // Array langsung, cast di model akan handle
                    'rating' => rand(40, 50) / 10,
                ]
            );
        }

        // --- CUSTOMER ---
        // PERBAIKAN: Tambahkan 'Verifikasi' ke kemungkinan status
        $customerStatuses = ['Offline', 'Banned', 'Verifikasi', 'Verifikasi', 'Verifikasi']; // Perbanyak Verifikasi
        for ($i = 1; $i <= 10; $i++) {
            User::updateOrCreate(
                ['email' => 'customer' . $i . '@moodly.com'],
                [
                    'name' => 'Customer ' . $i,
                    'role' => 'customer',
                    'status' => $customerStatuses[array_rand($customerStatuses)],
                    'phone' => '083' . str_pad($i, 9, '0', STR_PAD_LEFT),
                    'city' => ['Yogyakarta', 'Jakarta', 'Bandung', 'Surabaya', 'Tangerang'][array_rand(['Yogyakarta', 'Jakarta', 'Bandung', 'Surabaya', 'Tangerang'])],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );
        }

        $this->command->info('UserSeeder berhasil dijalankan.');
    }
}
