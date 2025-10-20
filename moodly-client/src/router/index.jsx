import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../layouts/MobileLayout";

// --- Import Halaman Auth ---
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import CreatePasswordPage from "../pages/auth/CreatePasswordPage";
import AddressPage from "../pages/auth/AddressPage";
import OnboardingPage from "../pages/auth/Onboarding";

// --- Import Halaman Customer (dari temanmu) ---
import KonselingPage from "../pages/customer/konseling";
import RiwayatPage from "../pages/customer/riwayat";
import NotifikasiPage from "../pages/customer/notifikasi";
// PERBAIKAN: Perbaiki typo 'GantiJwalPage' menjadi 'GantiJadwalPage'
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

// PENJAGA 1: Melindungi halaman private
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>; // Tampilkan loading
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

// PENJAGA 2: Melindungi halaman login/register dari user yang sudah login
const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>; // Tampilkan loading
    if (user) {
        return <Navigate to="/dashboard" />; // Arahkan ke dashboard jika sudah login
    }
    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* == RUTE UNTUK TAMU (Guest) == */}
            <Route element={<MobileLayout />}>
                <Route path="/" element={<OnboardingPage />} />
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <LoginPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <RegisterPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/address"
                    element={
                        <GuestRoute>
                            <AddressPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/create-password"
                    element={
                        <GuestRoute>
                            <CreatePasswordPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <GuestRoute>
                            <ForgotPasswordPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <GuestRoute>
                            <ResetPasswordPage />
                        </GuestRoute>
                    }
                />
            </Route>

            {/* == RUTE UNTUK PENGGUNA TERAUTENTIKASI == */}
            <Route element={<MobileLayout />}>
                <Route
                    path="/konseling"
                    element={
                        <ProtectedRoute>
                            <KonselingPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/riwayat"
                    element={
                        <ProtectedRoute>
                            <RiwayatPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifikasi"
                    element={
                        <ProtectedRoute>
                            <NotifikasiPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ganti-jadwal"
                    element={
                        <ProtectedRoute>
                            <GantiJadwalPage />
                        </ProtectedRoute>
                    }
                />
            </Route>

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
