import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    // Style untuk menghilangkan scrollbar, bisa digunakan jika perlu
    const noScrollbarStyle = {
        "::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
    };

    return (
        // Wadah Luar: Background abu-abu muda di desktop, putih di mobile
        <div className="min-h-screen bg-white md:bg-slate-100 md:flex md:items-center md:justify-center md:p-4">
            {/* "Ponsel": Area konten putih di tengah */}
            <div className="w-full bg-white md:max-w-md md:h-screen md:rounded-2xl md:shadow-2xl flex flex-col overflow-hidden">
                {/* Di sinilah konten halaman (LoginPage, RegisterPage) akan ditampilkan */}
                <div className="overflow-y-auto" style={noScrollbarStyle}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
