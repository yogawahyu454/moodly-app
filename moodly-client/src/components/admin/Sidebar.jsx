import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// --- Komponen Ikon (dipindahkan ke sini) ---
const DashboardIcon = ({ active }) => (
    <svg
        className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
        ></path>
    </svg>
);
const JenisKonselingIcon = ({ active }) => (
    <svg
        className={`w-6 h-6 ${active ? "text-white" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        ></path>
    </svg>
);
const LogoutIcon = () => (
    <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        ></path>
    </svg>
);
// Tambahkan ikon lain sesuai kebutuhan di sini...

// --- Komponen Link Navigasi ---
const NavLink = ({ to, icon: Icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                    ? "bg-sky-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
        >
            <Icon active={isActive} />
            <span className="font-medium">{children}</span>
        </Link>
    );
};

// --- Komponen Utama Sidebar ---
export default function Sidebar() {
    const { user, logout } = useAuth();
    const role = user?.role || ""; // e.g., 'super-admin' or 'admin'

    return (
        <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col h-screen fixed">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">MOODLY</h1>
                <p className="text-sm text-gray-400 capitalize">
                    {role.replace("-", " ")}
                </p>
            </div>

            <nav className="flex flex-col gap-4">
                <NavLink to="/admin/dashboard" icon={DashboardIcon}>
                    Dashboard
                </NavLink>

                {/* Tampilkan menu ini HANYA untuk Super Admin */}
                {role === "super-admin" && (
                    <NavLink
                        to="/admin/jenis-konseling"
                        icon={JenisKonselingIcon}
                    >
                        Jenis Konseling
                    </NavLink>
                )}

                {/* Tambahkan menu lain untuk Admin di sini... */}
            </nav>

            <div className="mt-auto">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white w-full"
                >
                    <LogoutIcon />
                    <span className="font-medium">Keluar</span>
                </button>
            </div>
        </aside>
    );
}
