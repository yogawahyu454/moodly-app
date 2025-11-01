import React from "react";
// PERBAIKAN: Gunakan NavLink untuk status aktif, bukan Link
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// [BARU] Import ikon-ikon untuk Navbar Konselor
import {
    Home as CounselorHomeIcon,
    ClipboardList as CounselorHistoryIcon,
    User as CounselorProfileIcon,
    MessageSquare as CounselorScheduleIcon,
} from "lucide-react";

// --- Ikon-ikon (dari kode Anda untuk Customer) ---

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
        className="text-gray-500 ml-1"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const CustomerHomeIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill={active ? "currentColor" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
        {!active && <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>}
        {active && (
            <path
                d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
                fill="currentColor"
            ></path>
        )}
    </svg>
);

const CustomerCounselingIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
        <path d="M8 12h8"></path>
        <path d="M8 9h6"></path>
    </svg>
);

const CustomerHistoryIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
        <path d="M9 12l.01 0"></path>
        <path d="M13 12l2 0"></path>
        <path d="M9 16l.01 0"></path>
        <path d="M13 16l2 0"></path>
    </svg>
);

const CustomerProfileIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
);

// --- [BARU] Komponen Navbar Konselor ---
const CounselorNavBar = () => (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
            <NavLink
                to="/counselor/home"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-1 flex-1 ${
                        isActive ? "text-sky-500" : "text-gray-500"
                    } hover:text-sky-500`
                }
            >
                <CounselorHomeIcon size={24} />
                <span className="text-xs">Beranda</span>
            </NavLink>
            <NavLink
                to="/counselor/schedule"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-1 flex-1 ${
                        isActive ? "text-sky-500" : "text-gray-500"
                    } hover:text-sky-500`
                }
            >
                <CounselorScheduleIcon size={24} />
                <span className="text-xs">Jadwal</span>
            </NavLink>
            <NavLink
                to="/counselor/history"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-1 flex-1 ${
                        isActive ? "text-sky-500" : "text-gray-500"
                    } hover:text-sky-500`
                }
            >
                <CounselorHistoryIcon size={24} />
                <span className="text-xs">Riwayat</span>
            </NavLink>
            <NavLink
                to="/counselor/profile"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-1 flex-1 ${
                        isActive ? "text-sky-500" : "text-gray-500"
                    } hover:text-sky-500`
                }
            >
                <CounselorProfileIcon size={24} />
                <span className="text-xs">Profile</span>
            </NavLink>
        </div>
    </nav>
);

// --- Komponen Navigasi Bawah (Customer) ---
const CustomerBottomNavItem = ({ to, icon, label, active }) => (
    // PERBAIKAN: Gunakan NavLink di sini
    <NavLink
        to={to}
        className="flex flex-col items-center justify-center gap-1 flex-1 py-1"
    >
        {icon}
        <span
            className={`text-xs ${
                active ? "text-sky-500 font-bold" : "text-gray-500"
            }`}
        >
            {label}
        </span>
    </NavLink>
);

// --- Komponen Navbar Customer (dari kode Anda) ---
const CustomerNavBar = ({ currentPath }) => (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.05)] z-10">
        <div className="flex justify-around items-center h-16">
            <CustomerBottomNavItem
                to="/home"
                icon={<CustomerHomeIcon active={currentPath === "/home"} />}
                label="Home"
                active={currentPath === "/home"}
            />
            <CustomerBottomNavItem
                to="/booking"
                icon={
                    <CustomerCounselingIcon
                        active={currentPath.startsWith("/booking")}
                    />
                }
                label="Booking"
                active={currentPath.startsWith("/booking")}
            />
            <CustomerBottomNavItem
                to="/history"
                icon={
                    <CustomerHistoryIcon active={currentPath.startsWith("/history")} />
                }
                label="History"
                active={currentPath.startsWith("/history")}
            />
            <CustomerBottomNavItem
                to="/profile"
                icon={
                    <CustomerProfileIcon active={currentPath.startsWith("/profile")} />
                }
                label="Profile"
                active={currentPath.startsWith("/profile")}
            />
        </div>
    </footer>
);

// --- Komponen Header Customer (dari kode Anda) ---
const CustomerHeader = ({ user }) => (
    <header className="p-4 flex items-center justify-between sticky top-0 z-20 bg-white shadow-sm">
        <div className="flex items-center gap-3">
            <img
                src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${
                        user?.name || "User"
                    }&background=EBF4FF&color=3B82F6&bold=true`
                }
                alt="User Avatar"
                className="w-11 h-11 rounded-full"
            />
            <div>
                <p className="text-base text-gray-800 font-bold">
                    Hi, {user?.name || "Pengguna"}
                </p>
                <div className="flex items-center cursor-pointer">
                    <p className="text-xs text-gray-500">
                        {user?.city || "Yogyakarta"},{" "}
                        {user?.province
                            ? user.province.split(" ").pop()
                            : "Indonesia"}
                    </p>
                    <ChevronDownIcon />
                </div>
            </div>
        </div>
        {/* PERBAIKAN: Gunakan NavLink/Link agar tidak me-refresh halaman */}
        <NavLink to="/notifications">
            <BellIcon />
        </NavLink>
    </header>
);

// --- Komponen Layout Utama (YANG DIPERBAIKI) ---
export default function MobileLayout() {
    const { user } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    // [PERBAIKAN] Cek role user
    // --- PERUBAHAN DI SINI ---
    const isCounselor = user && user.role?.includes("konselor"); // <-- Diubah dari "counselor"

    // [PERBAIKAN] Tentukan apakah header customer harus ditampilkan
    // (Hanya jika BUKAN konselor DAN ada di /home)
    const showCustomerHeader = !isCounselor && currentPath === "/home";

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
                
                {/* Header Customer (Tampil Kondisional) */}
                {/* Header Konselor sudah ada di halamannya sendiri (HomePage.jsx) */}
                {showCustomerHeader && <CustomerHeader user={user} />}

                {/* Konten Halaman */}
                <main className="flex-grow pb-20">
                    <Outlet />
                </main>
            </div>

            {/* [PERBAIKAN] Navigasi Bawah Tampil Kondisional */}
            {isCounselor ? (
                <CounselorNavBar />
            ) : (
                <CustomerNavBar currentPath={currentPath} />
            )}
        </div>
    );
}