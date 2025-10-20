import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import { useAuth } from "../context/AuthContext";

// Komponen untuk Halaman Dashboard (Placeholder)
const DashboardPage = () => {
    const { user, logout } = useAuth();
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                Selamat Datang, {user?.name}!
            </h1>
            <p>Email: {user?.email}</p>
            <button
                onClick={logout}
                className="mt-4 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
};

// Komponen untuk melindungi rute
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    return user ? children : <Navigate to="/login" replace />;
};

// Komponen Router utama yang menggunakan <Routes>
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<div>Halaman Beranda (Public)</div>} />
        </Routes>
    );
};

export default AppRouter;
