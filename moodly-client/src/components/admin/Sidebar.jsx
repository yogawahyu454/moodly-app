import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// --- Komponen Ikon ---
const DashboardIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);
const PesananIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);
const CustomerIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);
const KonselorIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
);
const AdminIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const CounselingIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const MapPinIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const LogoutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
const ChevronDownIcon = ({ isOpen }) => (
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
        className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
        }`}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);
const ClockIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

// --- Komponen Item Navigasi Dropdown ---
const NavDropdown = ({ item, isActive }) => {
    const [isOpen, setIsOpen] = useState(isActive);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700"
            >
                <div className="flex items-center gap-4">
                    <item.icon className="text-gray-400" />
                    <span>{item.label}</span>
                </div>
                <ChevronDownIcon isOpen={isOpen} />
            </button>
            {isOpen && (
                <div className="pl-8 pt-2">
                    {item.children.map((child) => (
                        <NavItem key={child.path} item={child} isChild={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Komponen Item Navigasi Tunggal ---
const NavItem = ({ item, isChild = false }) => (
    <NavLink
        to={item.path}
        className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 transition-colors duration-200
            ${isChild ? "py-2" : ""}
            ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`
        }
    >
        {item.icon && (
            <item.icon className={isChild ? "w-3 h-3" : "text-gray-400"} />
        )}
        <span>{item.label}</span>
    </NavLink>
);

// --- Komponen Utama Sidebar ---
const SidebarMenu = ({ role }) => {
    const location = useLocation();

    // Definisikan menu untuk Super Admin
    const superAdminMenu = [
        { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
        { label: "Pesanan", path: "/admin/pesanan", icon: PesananIcon },
        { label: "Customer", path: "/admin/customer", icon: CustomerIcon },
        { label: "Konselor", path: "/admin/konselor", icon: KonselorIcon },
        { label: "Admin", path: "/admin/admin", icon: AdminIcon },
        {
            label: "Konseling",
            icon: CounselingIcon,
            children: [
                { label: "Jenis Konseling", path: "/admin/jenis-konseling" },
                { label: "Durasi Konseling", path: "/admin/durasi-konseling" },
                {
                    label: "Tempat Konseling",
                    path: "/admin/tempat-konseling",
                    icon: MapPinIcon,
                },
                // { label: "Tempat Konseling", path: "/admin/tempat-konseling" },
            ],
        },
    ];

    // Definisikan menu untuk Admin (jika berbeda)
    const adminMenu = [
        // Contoh:
        { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
        {
            label: "Verifikasi Konselor",
            path: "/admin/verifikasi-konselor",
            icon: KonselorIcon,
        },
    ];

    // Pilih menu berdasarkan role
    const menuItems = role === "super-admin" ? superAdminMenu : adminMenu;

    return (
        <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
                const isActive = item.children
                    ? item.children.some((child) =>
                          location.pathname.startsWith(child.path)
                      )
                    : location.pathname.startsWith(item.path);

                return item.children ? (
                    <NavDropdown
                        key={item.label}
                        item={item}
                        isActive={isActive}
                    />
                ) : (
                    <NavItem key={item.path} item={item} />
                );
            })}
        </nav>
    );
};

export default function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen p-4">
            {/* --- Header Sidebar --- */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">MOODLY</h1>
                <p className="text-sm text-gray-400 capitalize">
                    {user?.role || "Admin Panel"}
                </p>
            </div>

            {/* --- Menu Navigasi --- */}
            <div className="flex-grow">
                <SidebarMenu role={user?.role} />
            </div>

            {/* --- Footer Sidebar (Logout) --- */}
            <div>
                <button
                    onClick={logout}
                    className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500 hover:text-white"
                >
                    <LogoutIcon />
                    <span>Keluar</span>
                </button>
            </div>
        </aside>
    );
}
