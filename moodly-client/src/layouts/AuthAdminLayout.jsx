import React from "react";
import { Outlet } from "react-router-dom";

// Layout ini sangat sederhana, tujuannya hanya untuk menengahkan
// form login di layar penuh (tampilan website).
export default function AuthAdminLayout() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-md">
                {/* Di sini halaman login admin akan dirender */}
                <Outlet />
            </div>
        </div>
    );
}
