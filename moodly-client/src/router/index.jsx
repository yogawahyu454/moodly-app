import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Sesuaikan path jika perlu
import Commet from "../components/Commet"; // Pastikan path ini benar

// --- Layouts ---
import MobileLayout from "../layouts/MobileLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthAdminLayout from "../layouts/AuthAdminLayout";
import PageLayout from "../layouts/PageLayout";

// --- Halaman Auth (Mobile) ---
import LoginPage from "../pages/auth/LoginPage";
import AddressPage from "../pages/auth/AddressPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OnboardingPage from "../pages/auth/OnboardingPage";

// --- Halaman Customer (Mobile) ---
import HomePage from "../pages/customer/HomePage";
import NotificationPage from "../pages/customer/NotificationPage";
import BookingPage from "../pages/customer/booking/Index";
import FindCounselorPage from "../pages/customer/booking/FindCounselorPage";
import InPersonPage from "../pages/customer/booking/InPersonPage";
import LocationDetailPage from "../pages/customer/booking/LocationDetailPage";
import PsychologistDetailPage from "../pages/customer/booking/PsychologistDetailPage";

// --- IMPORT UNTUK PAYMENT ---
import PaymentOnlinePage from "../pages/customer/booking/payment/PaymentOnlinePage";
import QrisPaymentPage from "../pages/customer/booking/payment/QrisPaymentPage";

// --- Halaman Customer (Lanjutan) ---
import HistoryPage from "../pages/customer/history/Index";
import HistoryDetailPage from "../pages/customer/history/DetailPage";
import RatingPage from "../pages/customer/history/RatingPage";
import CancelPage from "../pages/customer/history/CancelPage";
import CancelDetailPage from "../pages/customer/history/CancelDetailPage";
import ReschedulePage from "../pages/customer/history/ReschedulePage";

import ProfilePage from "../pages/customer/profile/Index";
import EditProfilePage from "../pages/customer/profile/EditPage";
import ChangePasswordPage from "../pages/customer/profile/ChangePasswordPage";
import ChangeEmailPage from "../pages/customer/profile/ChangeEmailPage";
import ChangePhoneNumberPage from "../pages/customer/profile/ChangePhoneNumberPage";

import HelpPage from "../pages/customer/help/Index";
import FaqPage from "../pages/customer/help/FaqPage";
import ChatAdminPage from "../pages/customer/help/ChatAdminPage";
import ChatPage from "../pages/customer/session/ChatPage";

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

// --- Path Konselor (Sesuai Struktur Folder) ---
import CounselorDashboard from "../pages/konselor/HomePage";
import CounselorSchedulePage from "../pages/konselor/jadwal";

// --- Guards ---
const GuestGuard = () => {
    const { user } = useAuth();
    if (user) {
        return user.role?.includes("admin") ||
            user.role?.includes("super-admin") ? (
            <Navigate to="/admin/dashboard" />
        ) : user.role?.includes("counselor") ? (
            <Navigate to="/counselor/home" />
        ) : (
            <Navigate to="/home" />
        );
    }
    return <Outlet />;
};

const ProtectedGuard = () => {
    const { user } = useAuth();
    if (
        !user ||
        user.role?.includes("admin") ||
        user.role?.includes("super-admin") ||
        user.role?.includes("counselor")
    ) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

const AdminGuestGuard = () => {
    const { user } = useAuth();
    return user &&
        (user.role?.includes("admin") || user.role?.includes("super-admin")) ? (
        <Navigate to="/admin/dashboard" />
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
        <Navigate to="/admin/login" />
    );
};

const CounselorProtectedGuard = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.role?.includes("counselor")) {
        if (
            user.role?.includes("admin") ||
            user.role?.includes("super-admin")
        ) {
            return <Navigate to="/admin/dashboard" />;
        }
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};

// --- PETA APLIKASI UTAMA ---
const AppRouter = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Commet
                    color="#3139cc"
                    size="medium"
                    text="loading"
                    textColor=""
                />
            </div>
        );
    }

    return (
        <Routes>
            {/* === ZONA AUTH CUSTOMER (MOBILE) === */}
            <Route element={<GuestGuard />}>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<OnboardingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>

            {/* === ZONA CUSTOMER TERPROTEKSI (MOBILE) === */}
            <Route element={<ProtectedGuard />}>
                {/* 1. Rute MobileLayout */}
                <Route element={<MobileLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route
                        path="/notifications"
                        element={<NotificationPage />}
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/beranda" element={<Navigate to="/home" />} />
                </Route>

                {/* 2. Rute PageLayout */}
                <Route element={<PageLayout />}>
                    <Route path="/address" element={<AddressPage />} />
                    <Route path="/profile/edit" element={<EditProfilePage />} />
                    <Route
                        path="/profile/change-password"
                        element={<ChangePasswordPage />}
                    />
                    <Route
                        path="/profile/change-email"
                        element={<ChangeEmailPage />}
                    />
                    <Route
                        path="/profile/change-phone"
                        element={<ChangePhoneNumberPage />}
                    />
                    <Route
                        path="/booking/find-counselor"
                        element={<FindCounselorPage />}
                    />
                    <Route
                        path="/booking/in-person"
                        element={<InPersonPage />}
                    />
                    <Route
                        path="/booking/tempat/:id"
                        element={<LocationDetailPage />}
                    />
                    <Route
                        path="/booking/counselor/:id"
                        element={<PsychologistDetailPage />}
                    />
                    <Route
                        path="/booking/payment/online/:id"
                        element={<PaymentOnlinePage />}
                    />
                    <Route
                        path="/booking/payment/qris/:id"
                        element={<QrisPaymentPage />}
                    />
                    <Route
                        path="/history/:id"
                        element={<HistoryDetailPage />}
                    />
                    <Route
                        path="/history/reschedule/:id"
                        element={<ReschedulePage />}
                    />
                    <Route
                        path="/history/cancel/:id"
                        element={<CancelPage />}
                    />
                    <Route
                        path="/history/cancel-detail/:id"
                        element={<CancelDetailPage />}
                    />
                    <Route path="/history/rate/:id" element={<RatingPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/help/faq" element={<FaqPage />} />
                    <Route
                        path="/help/chat-admin"
                        element={<ChatAdminPage />}
                    />
                    <Route path="/session/chat/:id" element={<ChatPage />} />
                </Route>
            </Route>

            {/* === ZONA KONSElor TERPROTEKSI (MOBILE) === */}
            <Route element={<CounselorProtectedGuard />}>
                <Route element={<MobileLayout />}>
                    <Route
                        path="/counselor/home"
                        element={<CounselorDashboard />}
                    />
                    <Route
                        path="/counselor/schedule"
                        element={<CounselorSchedulePage />}
                    />
                    <Route
                        path="/counselor"
                        element={<Navigate to="/counselor/home" />}
                    />
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
                    {/* ^ BARIS V; YANG BIKIN ERROR SUDAH DIHAPUS DARI SINI */}
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
