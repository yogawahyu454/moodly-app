import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../layouts/MobileLayout";

// --- Import semua halaman dengan penamaan yang SUDAH STANDAR (PascalCasePage.jsx) ---
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import CreatePasswordPage from "../pages/auth/CreatePasswordPage";
import AddressPage from "../pages/auth/AddressPage";
import OnboardingPage from "../pages/auth/OnboardingPage";
import VerifyCodePage from "../pages/auth/VerifyCodePage";

import BerandaPage from "../pages/customer/BerandaPage";
import KonselingPage from "../pages/customer/KonselingPage";
import RiwayatPage from "../pages/customer/RiwayatPage";
import NotifikasiPage from "../pages/customer/NotifikasiPage";
import GantiJadwalPage from "../pages/customer/GantiJadwalPage";

// --- PENJAGA (Guard) ---
const GuestGuard = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/beranda" /> : <Outlet />;
};

const ProtectedGuard = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/login" />;
};

// --- PETA APLIKASI ---
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
        <Routes>
            {/* WILAYAH TAMU */}
            <Route element={<GuestGuard />}>
                <Route element={<MobileLayout />}>
                    <Route path="/" element={<OnboardingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/address" element={<AddressPage />} />
                    <Route
                        path="/create-password"
                        element={<CreatePasswordPage />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />
                    <Route
                        path="/reset-password"
                        element={<ResetPasswordPage />}
                    />
                    <Route path="/verify-code" element={<VerifyCodePage />} />
                </Route>
            </Route>

            {/* WILAYAH PENGGUNA */}
            <Route element={<ProtectedGuard />}>
                <Route element={<MobileLayout />}>
                    <Route path="/beranda" element={<BerandaPage />} />
                    <Route path="/konseling" element={<KonselingPage />} />
                    <Route path="/riwayat" element={<RiwayatPage />} />
                    <Route path="/notifikasi" element={<NotifikasiPage />} />
                    <Route path="/ganti-jadwal" element={<GantiJadwalPage />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
