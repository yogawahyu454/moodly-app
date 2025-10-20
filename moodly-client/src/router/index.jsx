import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom"; // Tambahkan Outlet
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
import VerifyCodePage from "../pages/auth/VerifyCode"; // Sudah ada

// Import halaman customer
import Beranda from "../pages/customer/beranda";
import Konseling from "../pages/customer/konseling";
import Notifikasi from "../pages/customer/notifikasi";
import riwayat from "../pages/customer/riwayat"; // Sudah ada
import GantiJadwal from "../pages/customer/GantiJadwal"; // Sudah ada

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
        // Jika tidak ada user, arahkan ke login
        return <Navigate to="/login" replace />; // Gunakan replace agar tidak menambah history
    }
    // Jika ada user, tampilkan children (Outlet atau komponen halaman)
    return children ? children : <Outlet />; // Gunakan Outlet jika children tidak diberikan
};

// Wrapper Layout untuk Customer (Protected + MobileLayout)
const CustomerLayout = () => (
    <ProtectedRoute>
        <MobileLayout>
            <Outlet /> {/* Halaman customer akan dirender di sini */}
        </MobileLayout>
    </ProtectedRoute>
);

// Ini adalah router lengkap Anda yang sudah diperbaiki
const AppRouter = () => {
    return (
        <Routes>
            {/* == RUTE PUBLIK / AUTH (TANPA MobileLayout) == */}
            <Route path="/" element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/create-password" element={<CreatePasswordPage />} />
            <Route path="/address" element={<AddressPage />} />
            {/* HAPUS DUPLIKASI RUTE AUTH DARI SINI */}


            {/* == RUTE CUSTOMER (DIPROTEKSI & MENGGUNAKAN MobileLayout) == */}
            {/* Kita gunakan wrapper CustomerLayout */}
            <Route element={<CustomerLayout />}>
                <Route path="/beranda" element={<Beranda />} />
                <Route path="/notifikasi" element={<Notifikasi />} />
                <Route path="/konseling" element={<Konseling />} />
                <Route path="/ganti-jadwal" element={<Riwayat />} />
                <Route path="/ganti-jadwal" element={<GantiJadwal />} />
                {/* Tambahkan rute customer lain di sini */}
            </Route>

            {/* == RUTE YANG DIPROTEKSI (LAINNYA, contoh: Dashboard Admin) == */}
            {/* Jika Dashboard tidak perlu MobileLayout, buat seperti ini */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Rute default jika URL tidak ditemukan, arahkan ke onboarding */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;