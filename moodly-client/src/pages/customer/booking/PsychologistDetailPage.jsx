import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // useParams untuk ID

// --- Komponen Ikon ---
const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" // Warna diatur dari parent
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white group-hover:text-gray-100"
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);
const StarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);
const EducationIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-cyan-600"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.998.998 0 011.07 0l3.078 1.539a1 1 0 00.99-.001l3.078-1.538a1 1 0 011.07 0L19 6.92a1 1 0 000-1.84l-7-3zM3 9.38l-.62-.31a1 1 0 000 1.84l7 3.5a1 1 0 00.99 0l7-3.5a1 1 0 000-1.84L17 9.38v3.13a1 1 0 00.52.87l1.17.59a1 1 0 010 1.74l-8 4a1 1 0 01-.98 0l-8-4a1 1 0 010-1.74l1.17-.59A1 1 0 003 12.51V9.38z" />
    </svg>
);
const LicenseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-cyan-600"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
        />
    </svg>
);
// --- Akhir Komponen Ikon ---

export default function PsychologistDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil ID dari URL
    const [activeTab, setActiveTab] = useState("Profile Psikolog");

    // Dummy data psikolog (Idealnya fetch data berdasarkan ID)
    const psychologistData = {
        id: 2, // Cocokkan dengan ID dari daftar sebelumnya
        name: "Vina Amalia, M.Psi., Psikolog",
        rating: 4.9,
        reviews: "(200+ ulasan)",
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
        specialties: [
            "Stress",
            "Keluarga",
            "Pasangan",
            "Kecemasan",
            "Remaja",
            "Kecanduan",
            "Pernikahan",
        ],
        education: [
            "S2 Magister Psikologi Profesi Universitas Panjajaran",
            "S1 Sarjana Psikologi Universitas Padjajaran",
        ],
        license: "SIPP: 09187-03/3104-22-2-1",
        servesVia: ["Chat", "Video Call", "Tatap Muka"], // Contoh
    };

    // Filter data psikolog berdasarkan ID jika diperlukan (jika data tidak di-fetch)
    // const psychologist = psychologistData; // Asumsikan data sudah benar

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    return (
        <div className="bg-gradient-to-b from-cyan-100 to-gray-50 min-h-full font-sans">
            {/* Header dengan tombol back */}
            <header className="bg-cyan-400 p-4 pt-6 flex items-center sticky top-0 z-20 text-white shadow-md">
                <button
                    onClick={handleBack}
                    className="p-2 -ml-2 mr-2 rounded-full hover:bg-cyan-500 group transition-colors"
                    aria-label="Kembali"
                >
                    <BackArrowIcon />
                </button>
                <h1 className="text-lg font-bold text-center flex-grow -translate-x-4">
                    Psikolog {psychologistData.name.split(",")[0]}{" "}
                    {/* Ambil nama depan saja */}
                </h1>
                <div className="w-8"></div> {/* Spacer */}
            </header>

            {/* Konten Utama */}
            <main className="relative p-4 pb-20">
                {" "}
                {/* Padding bottom for button */}
                {/* Profile Card */}
                <div className="relative bg-white p-4 rounded-xl shadow-lg flex flex-col items-center text-center -mt-12 z-10 mb-6">
                    {" "}
                    {/* Tarik ke atas */}
                    <img
                        src={psychologistData.image}
                        alt={psychologistData.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md -mt-12 mb-2" // Tarik avatar ke atas
                    />
                    <h2 className="font-bold text-lg text-gray-800">
                        {psychologistData.name}
                    </h2>
                    <div className="flex items-center mt-1">
                        <StarIcon />
                        <span className="text-sm font-semibold text-yellow-500 ml-1">
                            {psychologistData.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-400 ml-1.5">
                            {psychologistData.reviews}
                        </span>
                    </div>
                </div>
                {/* Tabs */}
                <div className="flex justify-around bg-gray-100 rounded-lg p-1 mb-5">
                    <button
                        onClick={() => setActiveTab("Profile Psikolog")}
                        className={`w-full py-2 px-3 text-sm font-semibold rounded-md transition-colors ${
                            activeTab === "Profile Psikolog"
                                ? "bg-white text-cyan-600 shadow"
                                : "text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        Profile Psikolog
                    </button>
                    <button
                        onClick={() => setActiveTab("Jadwal")}
                        className={`w-full py-2 px-3 text-sm font-semibold rounded-md transition-colors ${
                            activeTab === "Jadwal"
                                ? "bg-white text-cyan-600 shadow"
                                : "text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        Jadwal
                    </button>
                </div>
                {/* Konten Tab */}
                {activeTab === "Profile Psikolog" && (
                    <div className="space-y-5">
                        {/* Keahlian */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="font-bold text-gray-700 text-base mb-2">
                                Keahlian
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {psychologistData.specialties.map(
                                    (tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-100 text-cyan-700"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Tentang Psikolog */}
                        <div className="bg-white p-4 rounded-xl shadow space-y-3">
                            <h3 className="font-bold text-gray-700 text-base">
                                Tentang {psychologistData.name.split(",")[0]}
                            </h3>
                            <div>
                                <h4 className="flex items-center gap-1.5 font-semibold text-sm text-gray-600 mb-1">
                                    <EducationIcon /> Pendidikan
                                </h4>
                                <ul className="list-disc list-inside pl-1 space-y-0.5">
                                    {psychologistData.education.map(
                                        (edu, index) => (
                                            <li
                                                key={index}
                                                className="text-xs text-gray-500"
                                            >
                                                {edu}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-1.5 font-semibold text-sm text-gray-600 mb-1">
                                    <LicenseIcon /> Nomor Izin Praktek
                                </h4>
                                <p className="text-xs text-gray-500 pl-1">
                                    {psychologistData.license}
                                </p>
                            </div>
                        </div>

                        {/* Melayani Via */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="font-bold text-gray-700 text-base mb-2">
                                Melayani via:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {psychologistData.servesVia.map(
                                    (method, index) => (
                                        <span
                                            key={index}
                                            className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                                        >
                                            {method}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "Jadwal" && (
                    <div className="bg-white p-4 rounded-xl shadow text-center text-gray-500">
                        {/* Konten Jadwal akan ditampilkan di sini */}
                        Jadwal belum tersedia.
                    </div>
                )}
            </main>

            {/* Tombol Mulai Konseling (Fixed Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-20">
                <button className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-cyan-600 transition-colors active:scale-95">
                    Mulai konseling dengan {psychologistData.name.split(",")[0]}
                </button>
            </div>
        </div>
    );
}
