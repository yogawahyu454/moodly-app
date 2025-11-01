import React, { useState } from "react";
import { Calendar, Clock, Star } from "lucide-react";

// --- Data Dummy (Nanti ganti dengan data dari API) ---

// Data untuk tab "Akan Datang"
const dummyUpcomingData = [
    {
        id: 1,
        sesi: "1 Jam Sesi",
        name: "Indira Rahmania",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Vidio Call",
    },
    {
        id: 2,
        sesi: "1 Jam Sesi",
        name: "Pelita Maharani",
        img: "https://randomuser.me/api/portraits/women/67.jpg",
        date: "12 - 09 - 2025",
        time: "17.00 - 18.00",
        type: "Chat",
    },
];

// Data untuk tab "Dibatalkan"
const dummyCancelledData = [
    {
        id: 1,
        sesi: "1 Jam Sesi",
        name: "Indira Rahmania",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Chat",
        status: "Telah Dibatalkan Customer",
    },
    {
        id: 2,
        sesi: "1 Jam Sesi",
        name: "Pelita Maharani",
        img: "https://randomuser.me/api/portraits/women/67.jpg",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Vidio Call",
        status: "Telah Dibatalkan Psikolog",
    },
    {
        id: 3,
        sesi: "1 Jam Sesi",
        name: "Mawaaz Hakim",
        img: "https://randomuser.me/api/portraits/men/65.jpg",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Tatap Muka",
        status: "Telah Dibatalkan Customer",
    },
];

// Data untuk tab "Selesai"
const dummyCompletedData = [
    {
        id: 1,
        name: "Indira Rahmania",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4.0,
        review: "Konselornya sabar dan membuat saya merasa didengar. Setelah sesi, hati saya jauh lebih tenang",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Chat",
    },
    {
        id: 2,
        name: "Pelita Maharani",
        img: "https://randomuser.me/api/portraits/women/67.jpg",
        rating: 5.0,
        review: "Penjelasannya jelas dan sangat membantu saya menemukan solusi.",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Vidio Call",
    },
    {
        id: 3,
        name: "Mawaaz Hakim",
        img: "https://randomuser.me/api/portraits/men/65.jpg",
        rating: 5.0,
        review: "Mendengarkan tanpa menghakimi, sangat membantu saya berpikir jernih.",
        date: "12 - 09 - 2025",
        time: "16.00 - 17.00",
        type: "Tatap Muka",
    },
];

// --- Komponen Internal ---

// Komponen Ikon Bintang
const StarIcon = ({ filled }) => (
    <Star
        size={16}
        className={` ${
            filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
    />
);

// Komponen Rating (Bintang)
const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.floor(rating)} />
            ))}
            <span className="text-sm font-semibold text-gray-700 ml-1">
                {rating.toFixed(1)}
            </span>
        </div>
    );
};

// Komponen Tab Navigasi
const TabNavigation = ({ activeTab, onTabClick }) => {
    const tabs = ["Akan Datang", "Dibatalkan", "Selesai"];

    return (
        <div className="flex bg-white p-1 rounded-full shadow-md">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabClick(tab)}
                    className={`w-1/3 py-2 px-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                        activeTab === tab
                            ? "bg-sky-500 text-white shadow"
                            : "bg-white text-gray-500"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

// Komponen Kartu untuk "Akan Datang"
const UpcomingCard = ({ item }) => (
    <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
        {/* Bagian Atas: Info Sesi & Foto */}
        <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">
                {item.sesi}
            </span>
            <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
        </div>

        {/* Bagian Tengah: Nama & Tipe Sesi */}
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-sky-700">{item.name}</h3>
            <span className="text-sm font-bold text-sky-500">{item.type}</span>
        </div>

        {/* Bagian Bawah: Waktu & Tanggal */}
        <div className="flex items-center gap-4 text-sm text-gray-600 border-t pt-3">
            <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-gray-400" />
                {item.date}
            </span>
            <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-gray-400" />
                {item.time}
            </span>
        </div>

        {/* Bagian Aksi: Tombol */}
        <div className="flex items-center gap-3 pt-2">
            <button className="flex-1 py-2 px-4 border border-sky-500 text-sky-500 rounded-full text-sm font-semibold transition-all hover:bg-sky-50">
                Ganti Jadwal
            </button>
            <button className="flex-1 py-2 px-4 bg-sky-500 text-white rounded-full text-sm font-semibold transition-all hover:bg-sky-600">
                Mulai
            </button>
        </div>
    </div>
);

// Komponen Kartu untuk "Dibatalkan"
const CancelledCard = ({ item }) => (
    <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3 opacity-90">
        <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">
                {item.sesi}
            </span>
            <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
        </div>

        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-sky-700">{item.name}</h3>
            <span className="text-sm font-bold text-sky-500">{item.type}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 border-t pt-3">
            <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-gray-400" />
                {item.date}
            </span>
            <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-gray-400" />
                {item.time}
            </span>
        </div>

        {/* Status Pembatalan */}
        <div className="pt-2">
            <p className="text-red-600 font-semibold text-sm">{item.status}</p>
        </div>
    </div>
);

// Komponen Kartu untuk "Selesai" (Review)
const CompletedCard = ({ item }) => (
    <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
        {/* Bagian Atas: Info Konselor & Rating */}
        <div className="flex items-start gap-3">
            <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <div className="flex-1">
                <h3 className="text-lg font-bold text-sky-700">{item.name}</h3>
                <RatingStars rating={item.rating} />
            </div>
        </div>

        {/* Bagian Tengah: Teks Review */}
        <p className="text-sm text-gray-700 pt-2">{item.review}</p>

        {/* Bagian Bawah: Tipe & Waktu */}
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 border-t pt-3 gap-2">
            <span className="font-bold text-sky-500">{item.type}</span>
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-gray-400" />
                    {item.date}
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-gray-400" />
                    {item.time}
                </span>
            </div>
        </div>
    </div>
);

// --- Komponen Utama Halaman Riwayat ---
export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState("Akan Datang");

    const renderContent = () => {
        switch (activeTab) {
            case "Akan Datang":
                return dummyUpcomingData.map((item) => (
                    <UpcomingCard key={item.id} item={item} />
                ));
            case "Dibatalkan":
                return dummyCancelledData.map((item) => (
                    <CancelledCard key={item.id} item={item} />
                ));
            case "Selesai":
                return dummyCompletedData.map((item) => (
                    <CompletedCard key={item.id} item={item} />
                ));
            default:
                return null;
        }
    };

    return (
        // Latar belakang pink/biru muda seperti di Figma
        // pb-24 memberi ruang untuk bottom navigation bar
        <div className="bg-pink-50 min-h-full p-4 pb-24">
            <TabNavigation activeTab={activeTab} onTabClick={setActiveTab} />

            <div className="mt-6 space-y-4">{renderContent()}</div>
        </div>
    );
}
