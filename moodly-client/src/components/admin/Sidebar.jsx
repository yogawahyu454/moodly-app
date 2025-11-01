import React, { useState, useEffect } from "react"; // <-- TAMBAHKAN useEffect DI SINI
import { NavLink, useLocation } from "react-router-dom";
// --- PERBAIKAN: Menggunakan path relatif yang benar ---
import { useAuth } from "../../context/AuthContext";
// --- AKHIR PERBAIKAN ---

// --- Komponen Ikon ---
// (Definisi semua ikon tetap sama, disembunyikan untuk keringkasan)
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
const CalendarIcon = ({ className }) => (
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
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);
const CheckSquareIcon = ({ className }) => (
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
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
);
const SettingsIcon = ({ className }) => (
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
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

// --- Komponen Item Navigasi Tunggal ---
const NavItem = ({ item, isChild = false }) => (
    <NavLink
        to={item.path}
        className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 transition-colors duration-200
            ${isChild ? "py-2 text-sm" : ""}
            ${
                isActive
                    ? "bg-blue-600 text-white shadow-inner"
                    : "hover:bg-gray-700 hover:text-white"
            }`
        }
    >
        {item.icon && (
            <item.icon
                className={`${
                    isChild ? "w-3 h-3 opacity-80" : "text-gray-400"
                }`}
            />
        )}
        <span>{item.label}</span>
    </NavLink>
);

// --- Komponen Item Navigasi Dropdown ---
const NavDropdown = ({ item, isActive }) => {
    const [isOpen, setIsOpen] = useState(isActive);

    // Update state isOpen jika isActive berubah (misal saat navigasi)
    useEffect(() => {
        setIsOpen(isActive);
    }, [isActive]); // Tambahkan dependensi isActive

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center text-left px-4 py-3 rounded-lg transition-colors duration-200
                            ${
                                isActive
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
            >
                <div className="flex items-center gap-4">
                    {item.icon && (
                        <item.icon
                            className={`${
                                isActive ? "text-white" : "text-gray-400"
                            }`}
                        />
                    )}
                    <span>{item.label}</span>
                </div>
                <ChevronDownIcon isOpen={isOpen} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                <div className="pl-8 pt-1 pb-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                        <NavItem key={child.path} item={child} isChild={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Menu Berdasarkan Role ---
const SidebarMenu = ({ role }) => {
    const location = useLocation();

    // Menu untuk Admin Biasa
    const adminMenu = [
        { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
        {
            label: "Jadwal Konsultasi",
            path: "/admin/jadwal-konsultasi",
            icon: CalendarIcon,
        },
        {
            label: "Verifikasi Data",
            icon: CheckSquareIcon,
            children: [
                { label: "Konselor", path: "/admin/verifikasi-konselor" },
                { label: "Customer", path: "/admin/verifikasi-customer" },
            ],
        },
    ];

    // Menu untuk Super Admin
    const superAdminMenu = [
        { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
        {
            label: "Pesanan",
            path: "/admin/booking-management",
            icon: PesananIcon,
        },
        {
            label: "Customer",
            path: "/admin/customer-management",
            icon: CustomerIcon,
        },
        {
            label: "Konselor",
            path: "/admin/konselor-management",
            icon: KonselorIcon,
        },
        { label: "Admin", path: "/admin/admin-management", icon: AdminIcon },
        {
            label: "Pengaturan",
            icon: SettingsIcon,
            children: [
                { label: "Jenis Konseling", path: "/admin/jenis-konseling" },
                { label: "Durasi Konseling", path: "/admin/durasi-konseling" },
                { label: "Tempat Konseling", path: "/admin/tempat-konseling" },
                // --- TAMBAHKAN INI ---
                { label: "Metode Pembayaran", path: "/admin/payment-methods" },
                // --- AKHIR TAMBAHAN ---
            ],
        },
    ];

    const menuItems = role === "super-admin" ? superAdminMenu : adminMenu;

    return (
        <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
                const isActive = item.children
                    ? item.children.some(
                          (child) =>
                              location.pathname === child.path ||
                              (location.pathname.startsWith(child.path) &&
                                  child.path !== "/admin/dashboard")
                      )
                    : location.pathname === item.path ||
                      (location.pathname.startsWith(item.path) &&
                          item.path !== "/admin/dashboard");

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
            <div className="mb-8 pl-3">
                <h1 className="text-2xl font-bold">MOODLY</h1>
                <p className="text-sm text-gray-400 capitalize">
                    {user?.role?.replace("-", " ") || "Admin Panel"}
                </p>
            </div>
            <div className="flex-grow overflow-y-auto">
                <SidebarMenu role={user?.role} />
            </div>
            <div className="mt-4">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
                >
                    <LogoutIcon />
                    <span>Keluar</span>
                </button>
            </div>
        </aside>
    );
}
