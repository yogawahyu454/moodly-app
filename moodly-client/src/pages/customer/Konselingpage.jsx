import React, { useState } from "react";

// --- Komponen Ikon ---
const SearchIcon = () => (
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
        className="text-gray-400"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const ArrowRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);
// --- Akhir Komponen Ikon ---

export default function KonselingPage() {
    const [activeTab, setActiveTab] = useState("Online");
    const counselingTypes = [
        {
            name: "Konseling Pernikahan",
            icon: "https://placehold.co/80x80/E0F2FE/0EA5E9?text=💑",
        },
        {
            name: "Konseling Individu",
            icon: "https://placehold.co/80x80/E0F2FE/0EA5E9?text=👤",
        },
        {
            name: "Konseling Keluarga",
            icon: "https://placehold.co/80x80/E0F2FE/0EA5E9?text=👨‍👩‍👧‍👦",
        },
        {
            name: "Konseling Karir",
            icon: "https://placehold.co/80x80/E0F2FE/0EA5E9?text=💼",
        },
        {
            name: "Konseling Depresi",
            icon: "https://placehold.co/80x80/E0F2FE/0EA5E9?text=😔",
        },
        {
            name: "Konseling Anak",
            icon: "https://placehold.co/80x80/E0F2FE/0EA5E9?text=👧",
        },
    ];

    return (
        <>
            <header className="p-4 sticky top-0 z-10 bg-white">
                <h1 className="text-xl font-bold text-gray-800 text-center">
                    Jenis Konseling
                </h1>
                <div className="mt-4 flex justify-around border-b">
                    <button
                        onClick={() => setActiveTab("Online")}
                        className={`w-full py-3 text-sm font-semibold ${
                            activeTab === "Online"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Online
                    </button>
                    <button
                        onClick={() => setActiveTab("Tatap Muka")}
                        className={`w-full py-3 text-sm font-semibold ${
                            activeTab === "Tatap Muka"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Tatap Muka
                    </button>
                </div>
            </header>
            <main className="p-4">
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Pilih jenis konseling yang kamu butuhkan."
                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <SearchIcon />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {counselingTypes.map((type, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                        >
                            <img
                                src={type.icon}
                                alt={type.name}
                                className="w-20 h-20"
                            />
                            <p className="font-semibold text-gray-700 mt-3 text-sm">
                                {type.name}
                            </p>
                            <button className="mt-4 flex items-center gap-1 text-sm font-bold text-gray-500 bg-gray-100 px-4 py-1 rounded-lg">
                                <span>Book</span>
                                <ArrowRightIcon />
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
