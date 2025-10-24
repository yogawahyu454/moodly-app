import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// Hapus useAuth jika tidak dipakai langsung di sini dan ambil dari context
// import { useAuth } from "../context/AuthContext"; // Sesuaikan path jika perlu

// --- Placeholder Context (Agar bisa jalan di sini) ---
const AuthContext = React.createContext(null);
const useAuth = () => {
    // Return dummy user/loading state
    return (
        React.useContext(AuthContext) || {
            user: {
                name: "Indira Rahmania",
                email: "indirarahmania@gmail.com",
                avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            loading: false,
            logout: () => {},
        }
    );
};
const AuthProvider = ({ children }) => {
    const value = {
        user: {
            name: "Indira Rahmania",
            email: "indirarahmania@gmail.com",
            avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        loading: false,
        logout: () => {
            console.log("logout placeholder");
        },
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
// --- Akhir Placeholder Context ---

// --- Komponen Ikon ---
const UserIcon = () => (
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
        className="text-gray-500"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
const MailIcon = () => (
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
        className="text-gray-500"
    >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);
const LockIcon = () => (
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
        className="text-gray-500"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);
const HelpCircleIcon = () => (
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
        className="text-gray-500"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);
const LogOutIcon = () => (
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
        className="text-gray-500"
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);
const ChevronRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400"
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);
// --- Akhir Komponen Ikon ---

// --- Komponen Item Menu ---
const MenuItem = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 group"
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {label}
            </span>
        </div>
        <ChevronRightIcon />
    </button>
);

export default function ProfilePage() {
    const { user, logout } = useAuth(); // Ambil user dan fungsi logout dari context
    const navigate = useNavigate(); // Hook untuk navigasi

    const handleLogout = () => {
        // Panggil fungsi logout asli dari context jika ada
        logout(); // Memanggil fungsi logout dari placeholder context
        console.log("Logout clicked");
        navigate("/login"); // Arahkan ke login setelah logout
    };

    // Fungsi navigasi baru
    const handleEditProfileClick = () => navigate("/profile/edit");
    const handleChangeEmailClick = () => navigate("/profile/change-email"); // Asumsi path
    const handleChangePasswordClick = () =>
        navigate("/profile/change-password"); // Asumsi path
    const handleHelpClick = () => navigate("/help"); // Asumsi path

    return (
        // Gunakan AuthProvider di sini agar useAuth() bekerja
        <AuthProvider>
            <div className="bg-white min-h-full font-sans pt-8 pb-4 px-4">
                {/* Info Profil Atas */}
                <div className="flex flex-col items-center text-center mb-8">
                    <img
                        // Gunakan avatar user atau fallback
                        src={
                            user?.avatar ||
                            `https://ui-avatars.com/api/?name=${
                                user?.name?.charAt(0) || "U"
                            }&background=EBF4FF&color=3B82F6&bold=true`
                        }
                        alt="Profile Avatar"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-3"
                    />
                    <h2 className="text-xl font-bold text-gray-800">
                        {user?.name || "Nama Pengguna"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {user?.email || "email@example.com"}
                    </p>
                </div>

                {/* Daftar Menu */}
                <div className="space-y-3">
                    {/* PERBAIKAN: Tambahkan onClick ke MenuItem Profile */}
                    <MenuItem
                        icon={<UserIcon />}
                        label="Profile"
                        onClick={handleEditProfileClick} // Memanggil fungsi navigasi
                    />
                    {/* 👇 PERBAIKAN onClick 👇 */}
                    <MenuItem
                        icon={<MailIcon />}
                        label="Email"
                        onClick={handleChangeEmailClick} // Arahkan ke halaman ganti email
                    />
                    <MenuItem
                        icon={<LockIcon />}
                        label="Ubah Kata sandi"
                        onClick={handleChangePasswordClick} // Arahkan ke halaman ganti password
                    />
                    <MenuItem
                        icon={<HelpCircleIcon />}
                        label="Bantuan"
                        onClick={handleHelpClick} // Arahkan ke halaman bantuan
                    />
                    <MenuItem
                        icon={<LogOutIcon />}
                        label="Log Out"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </AuthProvider>
    );
}
