import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layout
import MobileLayout from "../layouts/MobileLayout";

// Import semua halaman dari folder auth
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import OnboardingPage from "../pages/auth/Onboarding";
import AddressPage from "../pages/auth/AddressPage";
import CreatePasswordPage from "../pages/auth/CreatePasswordPage";
import VerifyCodePage from "../pages/auth/VerifyCode";

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
            {/* == RUTE PUBLIK & AUTH DIBUNGKUS DALAM MOBILE LAYOUT == */}
            <Route element={<MobileLayout />}>
                <Route path="/" element={<OnboardingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-code" element={<VerifyCodePage />} />
                <Route
                    path="/create-password"
                    element={<CreatePasswordPage />}
                />
                {/* Rute di bawah ini mungkin seharusnya diproteksi, tapi untuk sekarang kita letakkan di sini */}
                <Route path="/address" element={<AddressPage />} />
            </Route>

            {/* == RUTE YANG DIPROTEKSI (MUNGKIN AKAN PAKAI LAYOUT BERBEDA) == */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Rute default, arahkan ke halaman utama */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
