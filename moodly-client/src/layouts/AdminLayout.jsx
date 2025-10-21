import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar"; // <-- Impor Sidebar
import { useAuth } from "../context/AuthContext";

// --- Komponen Header (tetap di sini karena bagian dari layout utama) ---
const Header = () => {
    // Anda bisa menambahkan logic untuk search di sini nanti
    return (
        <header className="flex justify-end items-center p-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari disini"
                    className="bg-gray-200 rounded-full py-2 px-6 focus:outline-none"
                />
            </div>
        </header>
    );
};

// --- Komponen Layout Utama ---
export default function AdminLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Atau tampilkan spinner
    }

    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <Sidebar /> {/* <-- Panggil komponen Sidebar di sini */}
            <div className="flex-1 ml-64">
                {" "}
                {/* Beri margin kiri seukuran sidebar */}
                <Header />
                <main className="p-6">
                    <Outlet /> {/* <-- Halaman akan dirender di sini */}
                </main>
            </div>
        </div>
    );
}
