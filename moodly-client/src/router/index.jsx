import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import semua halaman dari folder auth
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import OnboardingPage from "../pages/auth/Onboarding"; // <-- 1. TAMBAHKAN IMPORT INI

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
            {/* == RUTE PUBLIK UNTUK AUTENTIKASI == */}
            <Route path="/" element={<OnboardingPage />} />{" "}
            {/* <-- 2. TAMBAHKAN RUTE INI */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/* Tambahkan rute lain dari folder auth di sini jika perlu */}
            {/* == RUTE YANG DIPROTEKSI == */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            {/* Rute default, arahkan ke halaman utama (onboarding) jika URL tidak ditemukan */}
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* <-- 3. UBAH RUTE INI */}
        </Routes>
    );
};

export default AppRouter;
