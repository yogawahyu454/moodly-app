import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar"; // Pastikan path ini benar

// --- Komponen Header ---
const Header = () => {
    // TODO: Tambahkan logika pencarian jika diperlukan
    return (
        <header className="bg-white shadow-sm p-4 flex justify-end items-center">
            <div className="relative w-64">
                <input
                    type="text"
                    placeholder="Cari disini"
                    className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </header>
    );
};

// --- Komponen Layout Utama ---
export default function AdminLayout() {
    return (
        // 1. Pembungkus utama sekarang menggunakan flex
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar akan mengambil lebar sesuai definisinya (w-64) */}
            <Sidebar />

            {/* 2. Kontainer konten utama akan mengisi sisa ruang */}
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-grow">
                    {/* Halaman (seperti JenisKonselingPage) akan dirender di sini */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
