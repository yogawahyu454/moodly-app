import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Komponen Ikon ---
const BellIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-600"
    >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);
const ChevronDownIcon = () => (
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
        className="text-gray-500"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);
const HomeIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);
const CounselingIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);
const HistoryIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path d="M1 4v6h6"></path>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    </svg>
);
const ProfileIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
// --- Akhir dari Ikon ---

// --- Komponen Navigasi Bawah ---
const BottomNavItem = ({ to, icon, label, active }) => (
    <Link
        to={to}
        className="flex flex-col items-center justify-center gap-1 flex-1"
    >
        {icon}
        <span
            className={`text-xs ${
                active ? "text-sky-500 font-bold" : "text-gray-400"
            }`}
        >
            {label}
        </span>
    </Link>
);

// --- Komponen Layout Utama ---
export default function MobileLayout() {
    const { user } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-4 flex items-center justify-between sticky top-0 z-10 bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                user?.avatar ||
                                `https://ui-avatars.com/api/?name=${
                                    user?.name || "P"
                                }&background=E2E8F0&color=4A5568`
                            }
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="text-sm text-gray-800 font-semibold">
                                Hi, {user?.name || "Pengguna"}
                            </p>
                            <div className="flex items-center">
                                <p className="text-xs text-gray-500">
                                    Yogyakarta, Indonesia
                                </p>
                                <ChevronDownIcon />
                            </div>
                        </div>
                    </div>
                    <BellIcon />
                </header>

                {/* Konten Halaman (Beranda, Riwayat, dll) akan dimuat di sini */}
                <main className="flex-grow pb-20">
                    <Outlet />
                </main>
            </div>

            {/* Navigasi Bawah */}
            <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200">
                <div className="flex justify-around items-center h-16">
                    <BottomNavItem
                        to="/beranda"
                        icon={<HomeIcon active={currentPath === "/beranda"} />}
                        label="Beranda"
                        active={currentPath === "/beranda"}
                    />
                    <BottomNavItem
                        to="/konseling"
                        icon={
                            <CounselingIcon
                                active={currentPath === "/konseling"}
                            />
                        }
                        label="Konseling"
                        active={currentPath === "/konseling"}
                    />
                    <BottomNavItem
                        to="/riwayat"
                        icon={
                            <HistoryIcon active={currentPath === "/riwayat"} />
                        }
                        label="Riwayat"
                        active={currentPath === "/riwayat"}
                    />
                    <BottomNavItem
                        to="/profile" // Rute /profile perlu ditambahkan ke router
                        icon={
                            <ProfileIcon active={currentPath === "/profile"} />
                        }
                        label="Profile"
                        active={currentPath === "/profile"}
                    />
                </div>
            </footer>
        </div>
    );
}
