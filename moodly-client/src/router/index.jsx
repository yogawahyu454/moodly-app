import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Layouts ---
import MobileLayout from "../layouts/MobileLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthAdminLayout from "../layouts/AuthAdminLayout";
<<<<<<< HEAD
import PageLayout from "../layouts/PageLayout";
=======
import PageLayout from "../layouts/PageLayout"; // <-- Ini penting
>>>>>>> efe0269e20f8984e6176ccecd001b9e69b79cbcc

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
<<<<<<< HEAD

// --- Halaman Admin & Super Admin (Website) ---
import JenisKonselingPage from "../pages/super-admin/konseling/jenis/Index";
=======
import OnboardingPage from "../pages/auth/OnboardingPage";

// --- Halaman Admin & Super Admin (Website) ---
import JenisKonselingPage from "../pages/super-admin/konseling/jenis/Index.jsx";
import DurasiKonselingPage from "../pages/super-admin/konseling/durasi/Index.jsx";
import TempatKonselingPage from "../pages/super-admin/konseling/tempat/Index.jsx";
import AdminManagementPage from "../pages/super-admin/admin/Index.jsx";
import AdminDetailPage from "../pages/super-admin/admin/Show.jsx";
import KonselorManagementPage from "../pages/super-admin/konselor/Index.jsx";
import KonselorDetailPage from "../pages/super-admin/konselor/Show.jsx";
>>>>>>> efe0269e20f8984e6176ccecd001b9e69b79cbcc

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
<<<<<<< HEAD
=======
                {/* 1. Rute yang PAKAI Navigasi Bawah */}
>>>>>>> efe0269e20f8984e6176ccecd001b9e69b79cbcc
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
<<<<<<< HEAD
                    <Route path="/riwayat/:id" element={<DetailRiwayatPage />} />
                    {/* Rute Pembatalan */}
                    <Route path="/detail-pembatalan/:id" element={<DetailPembatalanPage />} />
                    <Route path="/pembatalan/:id" element={<CancellationPage />} />
                </Route>
            </Route>
=======

                    {/* RUTE YANG BENAR UNTUK DETAIL RIWAYAT (Memperbaiki 404) */}
                    <Route
                        path="/riwayat/:id"
                        element={<DetailRiwayatPage />}
                    />
                </Route>
            </Route>
            {/* ====================================================== */}
            {/* == AKHIR PERBAIKAN == */}
            {/* ====================================================== */}
>>>>>>> efe0269e20f8984e6176ccecd001b9e69b79cbcc

            {/* === ZONA ADMIN (WEBSITE) === */}
            <Route element={<AdminGuestGuard />}>
                <Route element={<AuthAdminLayout />}>
                    <Route path="/admin/login" element={<LoginPage />} />
                </Route>
            </Route>
            <Route element={<AdminProtectedGuard />}>
                <Route element={<AdminLayout />}>
<<<<<<< HEAD
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                    <Route path="/admin/dashboard" element={<h1>Selamat Datang di Dasbor!</h1>} />
                    <Route path="/admin/jenis-konseling" element={<JenisKonselingPage />} />
=======
                    <Route
                        path="/admin"
                        element={<Navigate to="/admin/dashboard" />}
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <div>
                                <h1>Selamat Datang di Dasbor!</h1>
                            </div>
                        }
                    />
                    <Route
                        path="/admin/jenis-konseling"
                        element={<JenisKonselingPage />}
                    />
                    <Route
                        path="/admin/durasi-konseling"
                        element={<DurasiKonselingPage />}
                    />
                    <Route
                        path="/admin/tempat-konseling"
                        element={<TempatKonselingPage />}
                    />
                    <Route
                        path="/admin/admin-management"
                        element={<AdminManagementPage />}
                    />
                    <Route
                        path="/admin/admin-management/:id"
                        element={<AdminDetailPage />}
                    />
                    <Route
                        path="/admin/konselor-management"
                        element={<KonselorManagementPage />}
                    />
                    <Route
                        path="/admin/konselor-management/:id"
                        element={<KonselorDetailPage />}
                    />
>>>>>>> efe0269e20f8984e6176ccecd001b9e69b79cbcc
                </Route>
            </Route>

            {/* Fallback Route */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
        </Routes>
    );
};

export default AppRouter;
