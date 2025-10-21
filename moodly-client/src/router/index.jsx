import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Layouts ---
import MobileLayout from "../layouts/MobileLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthAdminLayout from "../layouts/AuthAdminLayout";

// --- Halaman Customer & Auth (Mobile) ---
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BerandaPage from "../pages/customer/BerandaPage";
// ...impor halaman customer dan auth lainnya jika ada

// --- Halaman Admin & Super Admin (Website) ---
// import AdminDashboardPage from "../pages/admin/AdminDashboardPage"; // Anda bisa buat file ini nanti
import JenisKonselingPage from "../pages/super-admin/JenisKonselingPage";

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
                    {/* ...tambahkan rute auth mobile lainnya di sini */}
                </Route>
            </Route>
            <Route element={<ProtectedGuard />}>
                <Route element={<MobileLayout />}>
                    <Route path="/beranda" element={<BerandaPage />} />
                    {/* ...tambahkan rute customer/konselor lainnya di sini */}
                </Route>
            </Route>

            {/* === ZONA ADMIN (WEBSITE) === */}
            <Route element={<AdminGuestGuard />}>
                <Route element={<AuthAdminLayout />}>
                    {/* Rute login khusus untuk admin */}
                    <Route path="/admin/login" element={<LoginPage />} />
                </Route>
            </Route>
            <Route element={<AdminProtectedGuard />}>
                <Route element={<AdminLayout />}>
                    {/* Redirect dari /admin ke /admin/dashboard */}
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

                    {/* Rute untuk Super Admin */}
                    <Route
                        path="/admin/jenis-konseling"
                        element={<JenisKonselingPage />}
                    />

                    {/* ...tambahkan rute admin/super-admin lainnya di sini */}
                </Route>
            </Route>

            {/* === RUTE FALLBACK === */}
            {/* Rute default, akan diarahkan oleh GuestGuard */}
            <Route path="/" element={<Navigate to="/login" />} />
            {/* Rute jika halaman tidak ditemukan */}
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
