import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    // Style untuk menghilangkan scrollbar
    const noScrollbarStyle = {
        "::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
    };

    return (
        // Wadah Luar: Memberi background abu-abu dan menengahkan "ponsel" di desktop.
        <div className="min-h-screen bg-white md:bg-slate-100 md:flex md:justify-center">
            {/* "Ponsel": Area konten putih di tengah. */}
            <div
                className="w-full min-h-screen bg-white 
                   md:max-w-md md:h-screen md:shadow-2xl 
                   flex flex-col"
            >
                {/* Konten halaman (LoginPage, RegisterPage) yang bisa di-scroll */}
                <div className="overflow-y-auto" style={noScrollbarStyle}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
