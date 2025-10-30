import React from "react";
// Import ikon-ikon yang kita butuhkan dari Lucide React
import {
    Calendar,
    Clock,
    Home,
    MessageSquare, // Ikon untuk "Jadwal"
    ClipboardList, // Ikon untuk "Riwayat"
    User,
} from "lucide-react";

// --- DATA DUMMY ---
// Nanti ini bisa diganti dengan data dari API
const patientScheduleData = [
    {
        id: 1,
        name: "Indira Rahmania Putri",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Voice Call",
        img: "https://randomuser.me/api/portraits/women/68.jpg", // Ganti dengan URL gambar
    },
    {
        id: 2,
        name: "Nada Edelweis Azkiya",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Vidio Call",
        img: "https://randomuser.me/api/portraits/women/67.jpg", // Ganti dengan URL gambar
    },
    {
        id: 3,
        name: "Erika Putri Renayma",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Janji Temu", // Perubahan jenis sesuai gambar
        img: "https://randomuser.me/api/portraits/women/66.jpg", // Ganti dengan URL gambar
    },
    {
        id: 4,
        name: "Diana Rahas Nadhifa",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Chat", // Perubahan jenis sesuai gambar
        img: "https://randomuser.me/api/portraits/women/65.jpg", // Ganti dengan URL gambar
    },
];

// --- Komponen Header ---
const ScheduleHeader = () => (
    <header className="relative bg-sky-500 h-28 flex items-center justify-center rounded-b-3xl shadow-md">
        <h1 className="text-xl font-bold text-white">Jadwal Pasien</h1>
    </header>
);

// --- Komponen Kartu Jadwal Individual ---
const PatientScheduleCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 transition-all hover:shadow-lg">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-500 font-medium">
                1 Jam Sesi
            </span>
            <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">{item.name}</h3>

        <div className="flex flex-wrap justify-between items-center text-sm gap-y-2">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    {item.date}
                </span>
                <span className="flex items-center gap-1.5 text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    {item.time}
                </span>
            </div>
            <span className="font-bold text-blue-500 cursor-pointer">
                {item.type}
            </span>
        </div>
    </div>
);

// --- Komponen Bottom Navigation Bar ---
const BottomNavBar = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
            <a
                href="#"
                className="flex flex-col items-center text-gray-500 hover:text-sky-500"
            >
                <Home size={24} />
                <span className="text-xs mt-1">Beranda</span>
            </a>
            {/* Icon Jadwal aktif */}
            <a href="#" className="flex flex-col items-center text-sky-500">
                <MessageSquare size={24} />
                <span className="text-xs mt-1">Jadwal</span>
            </a>
            <a
                href="#"
                className="flex flex-col items-center text-gray-500 hover:text-sky-500"
            >
                <ClipboardList size={24} />
                <span className="text-xs mt-1">Riwayat</span>
            </a>
            <a
                href="#"
                className="flex flex-col items-center text-gray-500 hover:text-sky-500"
            >
                <User size={24} />
                <span className="text-xs mt-1">Profile</span>
            </a>
        </div>
    </nav>
);

// --- Komponen Utama CounselorSchedulePage ---
export default function CounselorSchedulePage() {
    return (
        // Kontainer utama untuk seluruh halaman, memastikan tinggi penuh dan latar belakang abu-abu
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Halaman Jadwal Pasien */}
            <ScheduleHeader />

            {/* Konten utama yang bisa discroll */}
            <main className="flex-grow p-4 pt-6 space-y-4 pb-24">
                {" "}
                {/* pt-6 agar konten tidak terlalu dekat dengan header */}
                {patientScheduleData.map((item) => (
                    <PatientScheduleCard key={item.id} item={item} />
                ))}
            </main>

            {/* Bottom Navigation Bar */}
            <BottomNavBar />
        </div>
    );
}
