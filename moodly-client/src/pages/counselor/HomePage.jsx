import React from "react";
// Import ikon-ikon yang kita butuhkan HANYA untuk halaman ini
import {
    Wallet,
    Download,
    Calendar,
    Clock,
    Bell, // Untuk ikon notifikasi
    // Ikon untuk NavBar (Home, ClipboardList, User, MessageSquare) TELAH DIHAPUS
    // karena sudah dipindahkan ke MobileLayout.jsx
} from "lucide-react";

// --- DATA DUMMY ---
const scheduleData = [
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
        type: "Vidio Call",
        img: "https://randomuser.me/api/portraits/women/66.jpg", // Ganti dengan URL gambar
    },
];

// --- Komponen-Komponen Kecil ---

const CounselorHeader = () => (
    // Dibuat sticky agar header tetap di atas saat scroll
    <header className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <img
                src="https://randomuser.me/api/portraits/women/4.jpg" // Ganti dengan URL gambar profil konselor
                alt="Laras Sekarwati"
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
                <h1 className="text-base font-semibold text-gray-800">
                    Laras Sekarwati, M.Psi., Psikolog
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    Yogyakarta, Indonesia{" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </p>
            </div>
        </div>
        <Bell size={24} className="text-gray-600" />
    </header>
);

const WelcomeBanner = () => (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg flex items-center overflow-hidden h-32">
        <img
            src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-10023.jpg?w=1380"
            alt="Konselor"
            className="w-2/5 h-full object-cover object-center"
        />
        <div className="p-4 w-3/5">
            <p className="text-white font-medium text-sm leading-snug">
                Berikan pendampingan terbaik,{" "}
                <span className="font-bold">MOODLY</span> mendukung perjalananmu
                sebagai konselor.
            </p>
        </div>
    </div>
);

const BalanceCard = () => (
    <div className="bg-sky-400 rounded-2xl shadow-lg p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
            <Wallet size={32} />
            <span className="text-2xl font-bold">Rp 500.000</span>
        </div>
        <button className="bg-white/30 p-2 rounded-lg active:bg-white/50 transition-all">
            <Download size={24} />
        </button>
    </div>
);

const ScheduleCard = ({ item }) => (
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

// --- Komponen BottomNavBar TELAH DIHAPUS DARI SINI ---
// (Karena sudah di-handle oleh MobileLayout.jsx)


// --- Komponen Utama (Nama diubah agar sesuai nama file) ---
export default function HomePage() {
    return (
        // Kontainer utama untuk seluruh halaman
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <CounselorHeader />

            {/* Konten utama yang bisa discroll */}
            {/* pb-24 untuk memberi ruang bottom nav DARI LAYOUT */}
            <main className="flex-grow p-4 space-y-6 pb-24"> 
                <WelcomeBanner />
                <BalanceCard />
                {/* Bagian Jadwal Terbaru */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-lg font-bold text-gray-800">
                            Jadwal Terbaru
                        </h2>
                        <a
                            href="#" // Ganti dengan <Link to="/counselor/schedule"> jika perlu
                            className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    {/* List Jadwal */}
                    <div>
                        {scheduleData.map((item) => (
                            <ScheduleCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Pemanggilan <BottomNavBar /> TELAH DIHAPUS DARI SINI */}
        </div>
    );
}