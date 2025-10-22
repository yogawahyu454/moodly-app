import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
// Placeholder useAuth, sesuaikan dengan path asli Anda jika diperlukan
// import { useAuth } from "../context/AuthContext";

// --- Placeholder Context (Agar bisa jalan di sini) ---
const AuthContext = React.createContext(null);
const useAuth = () => {
    // Return dummy user/loading state
    return (
        React.useContext(AuthContext) || {
            user: { name: "User", role: ["customer"] },
            loading: false,
        }
    );
};

// --- Komponen Ikon Baru (Disesuaikan dengan Desain Referensi) ---

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

const HomeIcon = ({ active }) => (
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
        {/* Hanya outline path bawah */}
        {!active && <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>}
        {/* Path bawah di-fill saat aktif */}
        {active && (
            <path
                d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
                fill="currentColor"
            ></path>
        )}
    </svg>
);

const CounselingIcon = ({ active }) => (
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

const HistoryIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none" // Clipboard icon biasanya tidak di-fill solid
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

const ProfileIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none" // User icon biasanya tidak di-fill solid
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-500" : "text-gray-400"}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
);

// --- Komponen Navigasi Bawah ---
const BottomNavItem = ({ to, icon, label, active }) => (
    <Link
        to={to}
        className="flex flex-col items-center justify-center gap-1 flex-1 py-1" // Tambahkan padding vertikal jika perlu
    >
        {icon}
        <span
            className={`text-xs ${
                active ? "text-sky-500 font-bold" : "text-gray-500"
            }`}
        >
            {label}
        </span>
    </Link>
);

// --- Komponen Layout Utama ---
export default function MobileLayout() {
    // Gunakan placeholder user jika useAuth asli error
    const { user } = useAuth() || {
        user: {
            name: "User",
            avatar: null,
            city: "Yogyakarta",
            province: "Indonesia DIY",
        },
    };
    const location = useLocation();
    const currentPath = location.pathname;

    // Tentukan apakah header harus ditampilkan
    const showHeader = currentPath === "/beranda"; // Hanya tampil di beranda

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
                {/* Header (Tampil Kondisional) */}
                {showHeader && (
                    <header className="p-4 flex items-center justify-between sticky top-0 z-20 bg-white shadow-sm">
                        {" "}
                        {/* Naikkan z-index */}
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
                        <BellIcon />
                    </header>
                )}

                {/* Konten Halaman */}
                {/* PERBAIKAN: Tambahkan padding-bottom (pb-20) untuk memberi ruang bagi footer */}
                <main className="flex-grow pb-20">
                    {" "}
                    {/* Sesuaikan nilai padding jika perlu */}
                    <Outlet />
                </main>
            </div>

            {/* Navigasi Bawah */}
            <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.05)] z-10">
                {" "}
                {/* Pastikan z-index lebih rendah dari header jika header sticky */}
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
                        to="/profile"
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
