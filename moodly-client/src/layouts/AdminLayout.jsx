import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Komponen Ikon SVG untuk Admin Layout ---

const DashboardIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 4h6v6h-6z"></path>
        <path d="M14 4h6v6h-6z"></path>
        <path d="M4 14h6v6h-6z"></path>
        <path d="M14 14h6v6h-6z"></path>
    </svg>
);

const ScheduleIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
        <path d="M16 3v4"></path>
        <path d="M8 3v4"></path>
        <path d="M4 11h16"></path>
        <path d="M11 15h1"></path>
        <path d="M12 15v3"></path>
    </svg>
);

const LocationIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13z"></path>
        <path d="M9 4v13"></path>
        <path d="M15 7v13"></path>
    </svg>
);

const CounselorIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
);

const LogoutIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
        <path d="M9 12h12l-3 -3"></path>
        <path d="M18 15l3 -3"></path>
    </svg>
);

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
        <path d="M21 21l-6 -6"></path>
    </svg>
);

// --- Komponen Link Sidebar ---
const SidebarLink = ({ to, icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <NavLink
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
            {icon}
            <span className="font-medium">{children}</span>
        </NavLink>
    );
};

// --- Komponen Layout Utama ---
export default function AdminLayout() {
    // Di sini Anda bisa menambahkan logika untuk membedakan menu
    // antara Admin dan Super Admin jika diperlukan.
    // Contoh: const { user } = useAuth(); const isAdmin = user.role === 'admin';
    const { logout } = useAuth();

    // Untuk saat ini, kita hardcode role sebagai "Admin"
    const userRole = "Admin";

    return (
        <div className="bg-gray-50 min-h-screen flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col p-4 fixed h-full">
                <div className="text-center py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">MOODLY</h1>
                    <p className="text-sm text-gray-500">{userRole}</p>
                </div>

                <nav className="mt-8 flex-grow">
                    <ul className="space-y-2">
                        <li>
                            <SidebarLink
                                to="/admin/dashboard"
                                icon={<DashboardIcon className="w-6 h-6" />}
                            >
                                Dashboard
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink
                                to="/admin/jadwal-konsultasi"
                                icon={<ScheduleIcon className="w-6 h-6" />}
                            >
                                Jadwal Konsultasi
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink
                                to="/admin/tempat-konseling"
                                icon={<LocationIcon className="w-6 h-6" />}
                            >
                                Tempat Konseling
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink
                                to="/admin/data-konselor"
                                icon={<CounselorIcon className="w-6 h-6" />}
                            >
                                Data Konselor
                            </SidebarLink>
                        </li>
                        {/* Tambahkan link lain untuk Super Admin di sini dengan kondisional */}
                    </ul>
                </nav>

                <div className="py-4">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 w-full text-left"
                    >
                        <LogoutIcon className="w-6 h-6" />
                        <span className="font-medium">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Konten Utama */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <header className="bg-white shadow-sm p-6 sticky top-0 z-10">
                    <div className="relative max-w-xs">
                        <input
                            type="text"
                            placeholder="Cari disini..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                    </div>
                </header>

                {/* Area Konten Halaman */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
