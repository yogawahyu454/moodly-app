import React from "react";
// Import ikon-ikon yang kita butuhkan HANYA UNTUK KONTEN HALAMAN INI
import {
    Calendar,
    Clock,
    // Ikon-ikon Navbar (Home, MessageSquare, dll) TELAH DIHAPUS
} from "lucide-react";

// --- DATA DUMMY ---
const patientScheduleData = [
    {
        id: 1,
        name: "Indira Rahmania Putri",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Voice Call",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        id: 2,
        name: "Nada Edelweis Azkiya",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Vidio Call",
        img: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
        id: 3,
        name: "Erika Putri Renayma",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Janji Temu",
        img: "https://randomuser.me/api/portraits/women/66.jpg",
    },
    {
        id: 4,
        name: "Diana Rahas Nadhifa",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Chat",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
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

// --- Komponen Bottom Navigation Bar TELAH DIHAPUS DARI SINI ---


// --- Komponen Utama CounselorSchedulePage ---
export default function CounselorSchedulePage() {
    return (
        // Kontainer utama untuk seluruh halaman
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Halaman Jadwal Pasien */}
            <ScheduleHeader />

            {/* Konten utama yang bisa discroll */}
            {/* pb-24 memberi ruang untuk BottomNav DARI LAYOUT */}
            <main className="flex-grow p-4 pt-6 space-y-4 pb-24">
                {patientScheduleData.map((item) => (
                    <PatientScheduleCard key={item.id} item={item} />
                ))}
            </main>

            {/* Pemanggilan <BottomNavBar /> TELAH DIHAPUS DARI SINI */}
        </div>
    );
}