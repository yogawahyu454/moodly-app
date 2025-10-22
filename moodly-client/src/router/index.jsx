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
import AddressPage from "../pages/auth/AddressPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BerandaPage from "../pages/customer/BerandaPage";
import KonselingPage from "../pages/customer/KonselingPage";
import RiwayatPage from "../pages/customer/RiwayatPage";
import NotifikasiPage from "../pages/customer/NotifikasiPage";
import GantiJadwalPage from "../pages/customer/GantiJadwalPage";
import DetailRiwayatPage from "../pages/customer/DetailRiwayatPage";
import DetailPembatalanPage from "../pages/customer/DetailPembatalanPage";
import CancellationPage from "../pages/customer/CancellationPage";
import PsikologPage from "../pages/customer/PsikologPage";
import PaymentInstructionsPage from "../pages/customer/PaymentInstructionsPage";
import OnboardingPage from "../pages/auth/OnboardingPage";
import RatingPage from "../pages/customer/RatingPage";
import ChatPage from "../pages/customer/ChatPage";

// --- Halaman Admin & Super Admin (Website) ---
import JenisKonselingPage from "../pages/super-admin/konseling/jenis/Index.jsx";
import DurasiKonselingPage from "../pages/super-admin/konseling/durasi/Index.jsx";
import TempatKonselingPage from "../pages/super-admin/konseling/tempat/Index.jsx";
import AdminManagementPage from "../pages/super-admin/admin/Index.jsx";
import AdminDetailPage from "../pages/super-admin/admin/Show.jsx";
import KonselorManagementPage from "../pages/super-admin/konselor/Index.jsx";
import KonselorDetailPage from "../pages/super-admin/konselor/Show.jsx";
import CustomerManagementPage from "../pages/super-admin/customer/Index.jsx";
import CustomerDetailPage from "../pages/super-admin/customer/Show.jsx";
import BookingManagementPage from "../pages/super-admin/pesanan/Index.jsx";
import BookingDetailPage from "../pages/super-admin/pesanan/Show.jsx";

import JadwalKonsultasiPage from "../pages/admin/jadwal-konsultasi/Index.jsx";
import JadwalDetailPage from "../pages/admin/jadwal-konsultasi/Show.jsx";
import VerifikasiKonselorPage from "../pages/admin/verifikasi-konselor/Index.jsx";
import VerifikasiDetailPage from "../pages/admin/verifikasi-konselor/Show.jsx";
import VerifikasiCustomerPage from "../pages/admin/verifikasi-customer/Index.jsx";
import VerifikasiCustomerDetailPage from "../pages/admin/verifikasi-customer/Show.jsx";

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
                    {/* <Route path="/" element={<OnboardingPage />} /> */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>
            {/* ====================================================== */}
            {/* == PERBAIKAN DI SINI == */}
            {/* ====================================================== */}
            <Route element={<ProtectedGuard />}>
                {/* 1. Rute yang PAKAI Navigasi Bawah */}
                <Route element={<MobileLayout />}>
                    <Route path="/beranda" element={<BerandaPage />} />
                    <Route path="/konseling" element={<KonselingPage />} />
                    <Route path="/riwayat" element={<RiwayatPage />} />
                    <Route path="/notifikasi" element={<NotifikasiPage />} />
                </Route>

                {/* 2. Rute Full-Screen (TANPA Navigasi Bawah) */}
                <Route element={<PageLayout />}>
                    <Route path="/ganti-jadwal" element={<GantiJadwalPage />} />{" "}
                    {/* <-- Komponen yang benar sekarang */}
                    <Route path="/psikolog" element={<PsikologPage />} />
                    {/* --- RUTE ADDRESS PAGE DITAMBAHKAN DI SINI --- */}
                    <Route path="/address" element={<AddressPage />} />
                    {/* RUTE UNTUK DETAIL RIWAYAT */}
                    <Route
                        path="/riwayat/:id"
                        element={<DetailRiwayatPage />}
                    />
                    {/* === PERBAIKAN RUTE PEMBATALAN === */}
                    {/* Rute untuk HALAMAN MELAKUKAN PEMBATALAN (Aksi) */}
                    <Route
                        path="/batalkan/:id"
                        element={<CancellationPage />}
                    />
                    {/* Rute untuk MELIHAT DETAIL PEMBATALAN (View) */}
                    <Route
                        path="/detail-pembatalan/:id"
                        element={<DetailPembatalanPage />}
                    />
                    {/* --- RUTE BARU UNTUK RATING PAGE --- */}
                    <Route path="/beri-nilai/:id" element={<RatingPage />} />
                    {/* --- RUTE BARU UNTUK CHAT PAGE --- */}
                    <Route path="/chat/:id" element={<ChatPage />} />
                    {/* --- RUTE BARU UNTUK PAYMENT INSTRUCTIONS --- */}
                    <Route
                        path="/payment-instructions/:id"
                        element={<PaymentInstructionsPage />}
                    />
                    <Route path="/chat/:id" element={<ChatPage />} />
                    {/* === AKHIR PERBAIKAN === */}
                </Route>

                {/* RUTE DUPLIKAT DIHAPUS DARI SINI */}
                {/* <Route path="/cancel/:id" element={<CancellationPage />} /> */}
            </Route>{" "}
            {/* <-- Tag penutup ProtectedGuard */}
            {/* ====================================================== */}
            {/* == AKHIR PERBAIKAN == */}
            {/* ====================================================== */}
            {/* === ZONA ADMIN (WEBSITE) === */}
            <Route element={<AdminGuestGuard />}>
                <Route element={<AuthAdminLayout />}>
                    <Route path="/admin/login" element={<LoginPage />} />
                </Route>
            </Route>
            <Route element={<AdminProtectedGuard />}>
                <Route element={<AdminLayout />}>
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
                    <Route
                        path="/admin/customer-management"
                        element={<CustomerManagementPage />}
                    />
                    <Route
                        path="/admin/customer-management/:id"
                        element={<CustomerDetailPage />}
                    />
                    {/* --- RUTE BARU UNTUK BOOKING --- */}
                    <Route
                        path="/admin/booking-management"
                        element={<BookingManagementPage />}
                    />
                    <Route
                        path="/admin/booking-management/:id"
                        element={<BookingDetailPage />}
                    />
                    <Route
                        path="/admin/jadwal-konsultasi"
                        element={<JadwalKonsultasiPage />}
                    />
                    <Route
                        path="/admin/jadwal-konsultasi/:id"
                        element={<JadwalDetailPage />}
                    />
                    <Route
                        path="/admin/verifikasi-konselor"
                        element={<VerifikasiKonselorPage />}
                    />
                    <Route
                        path="/admin/verifikasi-konselor/:id"
                        element={<VerifikasiDetailPage />}
                    />
                    <Route
                        path="/admin/verifikasi-customer"
                        element={<VerifikasiCustomerPage />}
                    />
                    <Route
                        path="/admin/verifikasi-customer/:id"
                        element={<VerifikasiCustomerDetailPage />}
                    />
                </Route>
            </Route>
            {/* === RUTE FALLBACK === */}
            {/* Arahkan / ke /login jika tidak ada rute lain yang cocok di awal */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
                path="*"
                element={
                    <div>
                        <h1>404 - Halaman Tidak Ditemukan</h1>
                    </div>
                }
            />
        </Routes>
    );
};

export default AppRouter;
