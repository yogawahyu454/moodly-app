import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// --- Komponen-komponen Kecil ---

// Tombol Tab
const TabButton = ({ title, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 pb-2 text-sm font-semibold text-center ${
            isActive
                ? "border-b-2 border-sky-500 text-sky-500"
                : "text-gray-400 border-b-2 border-transparent"
        }`}
    >
        {title}
    </button>
);

// Icon Bintang (SVG)
function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.552.97 5.367c.205 1.133-.972 2.006-1.992 1.442L12 18.354l-4.757 2.927c-1.02.564-2.197-.31-1.992-1.442l.97-5.367-4.116-3.552c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
                clipRule="evenodd"
            />
        </svg>
    );
}

// Daftar Appointment (Reusable)
const AppointmentList = ({ data, status }) => (
    <>
        {data.length > 0 ? (
            data.map((item) => (
                <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                >
                    {/* Bagian Atas Kartu */}
                    <div className="flex items-start space-x-3">
                        <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                                {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {item.date} | {item.time}
                            </p>
                            <span className="text-xs font-medium text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full mt-2 inline-block">
                                {item.type}
                            </span>
                        </div>
                    </div>

                    {/* Bagian Bawah Kartu (berbeda per status) */}
                    {status === "upcoming" && (
                        <div className="flex justify-end space-x-2 mt-3">
                            <Link
                                to="/ganti-jadwal" // Tautkan ke halaman ganti jadwal
                                className="text-xs text-sky-500 font-semibold px-4 py-2 rounded-full border border-sky-500 hover:bg-sky-50"
                            >
                                Ganti Jadwal
                            </Link>
                            <button className="text-xs text-white font-semibold px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600">
                                Mulai
                            </button>
                        </div>
                    )}
                    {status === "canceled" && (
                        <div className="mt-3 text-right">
                            <p className="text-xs font-semibold text-red-500">
                                {item.reason}
                            </p>
                        </div>
                    )}
                    {status === "completed" && (
                        <div className="mt-3 border-t pt-3">
                            <div className="flex items-center space-x-1">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-bold text-gray-700">
                                    {item.rating}
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                {item.review}
                            </p>
                        </div>
                    )}
                </div>
            ))
        ) : (
            <div className="text-center py-10">
                <p className="text-gray-500">
                    Tidak ada riwayat untuk ditampilkan.
                </p>
            </div>
        )}
    </>
);

// --- Komponen Halaman Utama ---
export default function RiwayatPage() {
    const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming', 'canceled', 'completed'

    // Ganti data palsu dengan state
    const [upcomingData, setUpcomingData] = useState([]);
    const [canceledData, setCanceledData] = useState([]);
    const [completedData, setCompletedData] = useState([]);

    // TODO: Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
    useEffect(() => {
        // Contoh: Ambil data upcoming
        // setUpcomingData(fetchUpcomingData());
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case "upcoming":
                return (
                    <AppointmentList data={upcomingData} status="upcoming" />
                );
            case "canceled":
                return (
                    <AppointmentList data={canceledData} status="canceled" />
                );
            case "completed":
                return (
                    <AppointmentList data={completedData} status="completed" />
                );
            default:
                return null;
        }
    };

    return (
        // Wrapper MobileLayout telah dihapus
        <div className="p-4 bg-gray-50">
            <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
                Riwayat
            </h1>

            {/* Tab Navigator */}
            <div className="flex justify-around mb-4 border-b">
                <TabButton
                    title="Akan Datang"
                    isActive={activeTab === "upcoming"}
                    onClick={() => setActiveTab("upcoming")}
                />
                <TabButton
                    title="Dibatalkan"
                    isActive={activeTab === "canceled"}
                    onClick={() => setActiveTab("canceled")}
                />
                <TabButton
                    title="Selesai"
                    isActive={activeTab === "completed"}
                    onClick={() => setActiveTab("completed")}
                />
            </div>

            {/* Konten Tab */}
            <div className="space-y-4">{renderContent()}</div>
        </div>
    );
}
