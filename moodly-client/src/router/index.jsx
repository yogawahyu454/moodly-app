import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../layouts/MobileLayout";

// --- Import Halaman Auth ---
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
// PERBAIKAN: Sesuaikan nama file import
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import CreatePasswordPage from "../pages/auth/CreatePasswordPage";
import AddressPage from "../pages/auth/AddressPage";
import OnboardingPage from "../pages/auth/Onboarding";

// --- Import Halaman Customer (dari temanmu) ---
import KonselingPage from "../pages/customer/konseling";
import RiwayatPage from "../pages/customer/riwayat";
import NotifikasiPage from "../pages/customer/notifikasi";
import GantiJadwalPage from "../pages/customer/GantiJadwal";

// Placeholder for Dashboard
const Dashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="p-8">
            <h1 className="text-2xl">Selamat Datang, {user?.name}!</h1>
            <p>Email: {user?.email}</p>
            <button
                onClick={logout}
                className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
};

// Component for protected routes
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* == RUTE PUBLIK & AUTH DENGAN LAYOUT MOBILE == */}
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
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Rute Customer yang baru ditambahkan */}
                <Route path="/konseling" element={<KonselingPage />} />
                <Route path="/riwayat" element={<RiwayatPage />} />
                <Route path="/notifikasi" element={<NotifikasiPage />} />
                <Route path="/ganti-jadwal" element={<GantiJadwalPage />} />
            </Route>

            {/* == RUTE YANG DIPROTEKSI (NANTI BISA PAKAI LAYOUT BERBEDA) == */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
