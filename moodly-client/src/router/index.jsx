import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Layouts ---
import AuthLayout from "../layouts/AuthLayout";
import MobileLayout from "../layouts/MobileLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthAdminLayout from "../layouts/AuthAdminLayout";

// --- Halaman Auth (Tamu) ---
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OnboardingPage from "../pages/auth/OnboardingPage";
// ... Halaman auth lainnya bisa diimpor di sini

// --- Halaman Customer (Terproteksi) ---
import BerandaPage from "../pages/customer/BerandaPage";
import KonselingPage from "../pages/customer/KonselingPage";
import RiwayatPage from "../pages/customer/RiwayatPage";
// ... Halaman customer lainnya

// --- Halaman Admin (Placeholder) ---
const AdminDashboardPage = () => (
    <div>
        <h1 className="text-2xl font-bold">Halo, Super Admin!</h1>
        <p>Ini adalah halaman dasbor utama Anda.</p>
    </div>
);

// --- PENJAGA (GUARDS) ---

// Untuk tamu mobile (customer/konselor)
const GuestGuard = () => {
    const { user } = useAuth();
    return user && !user.role?.includes("admin") ? (
        <Navigate to="/beranda" />
    ) : (
        <Outlet />
    );
};

// Untuk pengguna mobile (customer/konselor)
const ProtectedGuard = () => {
    const { user } = useAuth();
    return user && !user.role?.includes("admin") ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

// Untuk tamu admin
const AdminGuestGuard = () => {
    const { user } = useAuth();
    return user && user.role?.includes("admin") ? (
        <Navigate to="/admin/dashboard" />
    ) : (
        <Outlet />
    );
};

// Untuk admin yang sudah login
const AdminProtectedGuard = () => {
    const { user } = useAuth();
    return user && user.role?.includes("admin") ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" />
    );
};

// --- PETA APLIKASI (ROUTER UTAMA) ---
const AppRouter = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen font-sans">
                Memuat Sesi...
            </div>
        );
    }

    // Perhatikan: <BrowserRouter> sudah DIHAPUS dari sini.
    // File ini sekarang hanya mengembalikan <Routes>.
    return (
        <Routes>
            {/* == ZONA CUSTOMER & KONSELOR (TAMPILAN MOBILE) == */}
            <Route element={<GuestGuard />}>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<OnboardingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>

            <Route element={<ProtectedGuard />}>
                <Route element={<MobileLayout />}>
                    <Route path="/beranda" element={<BerandaPage />} />
                    <Route path="/konseling" element={<KonselingPage />} />
                    <Route path="/riwayat" element={<RiwayatPage />} />
                </Route>
            </Route>

            {/* == ZONA ADMIN & SUPER ADMIN (TAMPILAN WEBSITE) == */}
            <Route element={<AdminGuestGuard />}>
                <Route path="/admin/login" element={<AuthAdminLayout />}>
                    <Route index element={<LoginPage />} />
                </Route>
            </Route>

            <Route element={<AdminProtectedGuard />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                </Route>
            </Route>

            {/* Rute cadangan jika tidak ada yang cocok */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
