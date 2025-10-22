import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// Path import disesuaikan dengan struktur folder Anda
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
import OnboardingPage from "../pages/auth/OnboardingPage";
import AddressPage from "../pages/auth/AddressPage"; // Pastikan import AddressPage
import BerandaPage from "../pages/customer/BerandaPage";
import KonselingPage from "../pages/customer/KonselingPage";
import RiwayatPage from "../pages/customer/RiwayatPage";
import NotifikasiPage from "../pages/customer/NotifikasiPage";
import GantiJadwalPage from "../pages/customer/GantiJadwalPage";
import DetailRiwayatPage from "../pages/customer/DetailRiwayatPage";
import CancellationPage from "../pages/customer/CancellationPage";
import PsikologPage from "../pages/customer/PsikologPage";
import ProfilePage from "../pages/customer/profile/ProfilePage";
import EditProfilePage from "../pages/customer/profile/EditProfilePage";

import TatapMukaPage from "../pages/customer/TatapMukaPage"; // <-- Import TatapMukaPage
import DetailPembatalanPage from "../pages/customer/DetailPembatalanPage"; // Import DetailPembatalanPage
import RatingPage from "../pages/customer/RatingPage"; // Import RatingPage
import ChatPage from "../pages/customer/ChatPage"; // Import ChatPage

// --- Halaman Admin & Super Admin (Website) ---
// Hati-hati, pastikan path ini benar sesuai struktur folder Anda
// import AdminDashboardPage from "../pages/admin/DashboardPage"; // Sesuaikan path jika perlu
const AdminDashboardPage = () => <div>Admin Dashboard Placeholder</div>; // Placeholder sementara
import JenisKonselingPage from "../pages/super-admin/konseling/jenis/Index.jsx";
import DurasiKonselingPage from "../pages/super-admin/konseling/durasi/Index.jsx";
import TempatKonselingPage from "../pages/super-admin/konseling/tempat/Index.jsx";
import AdminManagementPage from "../pages/super-admin/admin/Index.jsx";
import AdminDetailPage from "../pages/super-admin/admin/Show.jsx";
import KonselorManagementPage from "../pages/super-admin/konselor/Index.jsx";
import KonselorDetailPage from "../pages/super-admin/konselor/Show.jsx";
import CustomerManagementPage from "../pages/super-admin/customer/Index.jsx";
import CustomerDetailPage from "../pages/super-admin/customer/Show.jsx";
import BookingManagementPage from "../pages/super-admin/pesanan/Index.jsx"; // Import BookingManagementPage
import BookingDetailPage from "../pages/super-admin/pesanan/Show.jsx"; // Import BookingDetailPage
import JadwalKonsultasiPage from "../pages/admin/jadwal-konsultasi/Index.jsx"; // Import JadwalKonsultasiPage
import JadwalDetailPage from "../pages/admin/jadwal-konsultasi/Show.jsx"; // Import JadwalDetailPage

// ==================================================================
// --- PENJAGA ZONA ---
// ==================================================================

const GuestGuard = () => {
    const { user } = useAuth();
    if (user) {
        return user.role?.includes("admin") ||
            user.role?.includes("super-admin") ? (
            <Navigate to="/admin/dashboard" replace />
        ) : (
            <Navigate to="/beranda" replace />
        );
    }
    return <Outlet />;
};

const ProtectedGuard = () => {
    const { user } = useAuth();
    if (
        !user ||
        user.role?.includes("admin") ||
        user.role?.includes("super-admin")
    ) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

const AdminGuestGuard = () => {
    const { user } = useAuth();
    return user &&
        (user.role?.includes("admin") || user.role?.includes("super-admin")) ? (
        <Navigate to="/admin/dashboard" replace />
    ) : (
        <Outlet />
    );
};

const AdminProtectedGuard = () => {
    const { user } = useAuth();
    return user &&
        (user.role?.includes("admin") || user.role?.includes("super-admin")) ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" replace />
    );
};

// --- PETA APLIKASI UTAMA ---
const AppRouter = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        // AuthProvider sebaiknya membungkus <BrowserRouter> di file index.jsx/main.jsx Anda
        // <AuthProvider>
        <Routes>
            {/* === ZONA TAMU (MOBILE) === */}
            <Route element={<GuestGuard />}>
                <Route element={<AuthLayout />}>
                    {/* Arahkan root ke login jika tidak login */}
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* <Route path="/onboarding" element={<OnboardingPage />} /> */}{" "}
                    {/* Jika ada onboarding */}
                </Route>
            </Route>

            {/* === ZONA CUSTOMER (LOGIN) === */}
            <Route element={<ProtectedGuard />}>
                {/* 1. Rute yang PAKAI Navigasi Bawah (MobileLayout) */}
                <Route element={<MobileLayout />}>
                    {/* Arahkan root customer ke beranda */}
                    <Route index element={<Navigate to="/beranda" replace />} />
                    <Route path="/beranda" element={<BerandaPage />} />
                    <Route path="/konseling" element={<KonselingPage />} />
                    <Route path="/riwayat" element={<RiwayatPage />} />
                    <Route path="/notifikasi" element={<NotifikasiPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* 2. Rute Full-Screen (Tanpa Navigasi Bawah - PageLayout) */}
                <Route element={<PageLayout />}>
                    <Route path="/profile/edit" element={<EditProfilePage />} />
                    <Route
                        path="/pilih-psikolog"
                        element={<PsikologPage />}
                    />{" "}
                    <Route path="/tatap-muka" element={<TatapMukaPage />} />{" "}
                    {/* <-- Rute baru ditambahkan */}
                    <Route path="/address" element={<AddressPage />} />
                    <Route path="/ganti-jadwal" element={<GantiJadwalPage />} />
                    <Route
                        path="/riwayat/:id"
                        element={<DetailRiwayatPage />}
                    />
                    <Route
                        path="/batalkan/:id" // Aksi pembatalan
                        element={<CancellationPage />}
                    />
                    <Route
                        path="/detail-pembatalan/:id" // Melihat detail pembatalan
                        element={<DetailPembatalanPage />}
                    />
                    <Route path="/beri-nilai/:id" element={<RatingPage />} />
                    <Route path="/chat/:id" element={<ChatPage />} />
                </Route>
            </Route>

            {/* === ZONA ADMIN (WEBSITE) === */}
            <Route element={<AdminGuestGuard />}>
                <Route element={<AuthAdminLayout />}>
                    <Route path="/admin/login" element={<LoginPage />} />{" "}
                    {/* Path login admin */}
                </Route>
            </Route>
            <Route element={<AdminProtectedGuard />}>
                <Route path="/admin" element={<AdminLayout />}>
                    {" "}
                    {/* Prefix /admin */}
                    <Route
                        index
                        element={<Navigate to="/admin/dashboard" replace />}
                    />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route
                        path="jenis-konseling"
                        element={<JenisKonselingPage />}
                    />
                    <Route
                        path="durasi-konseling"
                        element={<DurasiKonselingPage />}
                    />
                    <Route
                        path="tempat-konseling"
                        element={<TempatKonselingPage />}
                    />
                    <Route
                        path="admin-management"
                        element={<AdminManagementPage />}
                    />
                    <Route
                        path="admin-management/:id"
                        element={<AdminDetailPage />}
                    />
                    <Route
                        path="konselor-management"
                        element={<KonselorManagementPage />}
                    />
                    <Route
                        path="konselor-management/:id"
                        element={<KonselorDetailPage />}
                    />
                    <Route
                        path="customer-management"
                        element={<CustomerManagementPage />}
                    />
                    <Route
                        path="customer-management/:id"
                        element={<CustomerDetailPage />}
                    />
                    <Route
                        path="booking-management"
                        element={<BookingManagementPage />}
                    />
                    <Route
                        path="booking-management/:id"
                        element={<BookingDetailPage />}
                    />
                    <Route
                        path="jadwal-konsultasi"
                        element={<JadwalKonsultasiPage />}
                    />
                    <Route
                        path="jadwal-konsultasi/:id"
                        element={<JadwalDetailPage />}
                    />
                </Route>
            </Route>

            {/* === RUTE FALLBACK === */}
            {/* Arahkan path tidak dikenal ke login jika belum login, atau beranda jika sudah */}
            <Route
                path="*"
                element={
                    <Navigate
                        to={useAuth()?.user ? "/beranda" : "/login"}
                        replace
                    />
                }
            />
        </Routes>
        // </AuthProvider>
    );
};

export default AppRouter;
