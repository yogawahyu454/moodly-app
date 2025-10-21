import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Layouts ---
import MobileLayout from "../layouts/MobileLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthAdminLayout from "../layouts/AuthAdminLayout";
import PageLayout from "../layouts/PageLayout";

// --- Halaman Customer & Auth (Mobile) ---
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BerandaPage from "../pages/customer/BerandaPage";
import KonselingPage from "../pages/customer/KonselingPage";
import RiwayatPage from "../pages/customer/RiwayatPage";
import NotifikasiPage from "../pages/customer/NotifikasiPage";
import GantiJadwalPage from "../pages/customer/GantiJadwalPage";
import DetailRiwayatPage from "../pages/customer/DetailRiwayatPage";
// import DetailPembatalanPage from "../pages/customer/DetailPembatalanPage"; // <-- Dihapus karena diganti CancellationPage
import CancellationPage from "../pages/customer/CancellationPage"; // <-- PERBAIKAN PATH DI SINI (sebelumnya ../../)
import PsikologPage from "../pages/customer/PsikologPage";

// --- Halaman Admin & Super Admin (Website) ---
import JenisKonselingPage from "../pages/super-admin/konseling/jenis/Index";

// ==================================================================
// --- PENJAGA ZONA CUSTOMER / KONSELOR (TAMPILAN MOBILE) ---
// ==================================================================
const GuestGuard = () => {
    const { user } = useAuth();
    if (user) {
        // Jika sudah login, lempar ke beranda yang sesuai
        return user.role?.includes("admin") ||
            user.role?.includes("super-admin") ? (
            <Navigate to="/admin/dashboard" />
        ) : (
            <Navigate to="/beranda" />
        );
    }
    return <Outlet />; // Jika belum login, tampilkan halaman (login, register)
};

const ProtectedGuard = () => {
    const { user } = useAuth();
    // Admin & Super Admin tidak boleh mengakses zona mobile
    if (
        !user ||
        user.role?.includes("admin") ||
        user.role?.includes("super-admin")
    ) {
        return <Navigate to="/login" />;
    }
    return <Outlet />; // Jika user adalah customer/konselor, izinkan akses
};

// ==================================================================
// --- PENJAGA ZONA ADMIN / SUPER ADMIN (TAMPILAN WEBSITE) ---
// ==================================================================
const AdminGuestGuard = () => {
    const { user } = useAuth();
    // Jika sudah login sebagai admin, lempar ke dashboard
    return user &&
        (user.role?.includes("admin") || user.role?.includes("super-admin")) ? (
        <Navigate to="/admin/dashboard" />
    ) : (
        <Outlet />
    );
};

const AdminProtectedGuard = () => {
    const { user } = useAuth();
    // Hanya izinkan jika sudah login DAN rolenya admin atau super-admin
    return user &&
        (user.role?.includes("admin") || user.role?.includes("super-admin")) ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" />
    );
};

// --- PETA APLIKASI UTAMA ---
const AppRouter = () => {
    const { loading } = useAuth();

    // Tampilkan loading screen saat status autentikasi sedang diperiksa
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <Routes>
            {/* === ZONA CUSTOMER (MOBILE) === */}
            <Route element={<GuestGuard />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>

            {/* === ZONA CUSTOMER (DENGAN PEMBATALAN DAN DETAIL PEMBATALAN) === */}
            <Route element={<ProtectedGuard />}>
                <Route element={<MobileLayout />}>
                    <Route path="/beranda" element={<BerandaPage />} />
                    <Route path="/konseling" element={<KonselingPage />} />
                    <Route path="/riwayat" element={<RiwayatPage />} />
                    <Route path="/notifikasi" element={<NotifikasiPage />} />
                </Route>

                {/* Rute Full-Screen (Tanpa Navigasi Bawah) */}
                <Route element={<PageLayout />}>
                    <Route path="/ganti-jadwal" element={<GantiJadwalPage />} />
                    <Route path="/psikolog" element={<PsikologPage />} />
                    <Route path="/riwayat/:id" element={<DetailRiwayatPage />} />
                    {/* Rute Pembatalan */}
                    <Route path="/detail-pembatalan/:id" element={<DetailPembatalanPage />} />
                    <Route path="/pembatalan/:id" element={<CancellationPage />} />
                </Route>
            </Route>

            {/* === ZONA ADMIN (WEBSITE) === */}
            <Route element={<AdminGuestGuard />}>
                <Route element={<AuthAdminLayout />}>
                    <Route path="/admin/login" element={<LoginPage />} />
                </Route>
            </Route>
            <Route element={<AdminProtectedGuard />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                    <Route path="/admin/dashboard" element={<h1>Selamat Datang di Dasbor!</h1>} />
                    <Route path="/admin/jenis-konseling" element={<JenisKonselingPage />} />
                </Route>
            </Route>

            {/* Fallback Route */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
        </Routes>
    );
};

export default AppRouter;
