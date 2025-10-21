import React from "react";
import { Link } from "react-router-dom"; // Diperlukan untuk tombol kembali

// --- Komponen Ikon ---
const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700"
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const UniversityIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);
// --- Akhir Komponen Ikon ---

// --- Komponen Kartu Psikolog ---
const PsikologCard = ({ image, name, university, tags }) => (
    <div className="bg-white p-3 rounded-2xl border-2 border-cyan-100 shadow-sm flex items-center gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
        <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-grow">
            <h3 className="font-bold text-gray-800 text-base">{name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
                <UniversityIcon />
                <p className="text-sm text-gray-500">{university}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            index === tags.length - 1
                                ? "bg-cyan-100 text-cyan-600"
                                : "bg-blue-100 text-blue-600"
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default function PilihPsikologPage() {
    const psikologList = [
        {
            name: "Raka Santoso, M.Psi., Psikolog",
            university: "Universitas Gadjah Mada",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            name: "Vina Amalia, M.Psi., Psikolog",
            university: "Universitas Padjadjaran",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            name: "Dimas Nugroho, M.Psi., Psikolog",
            university: "Universitas Gadjah Mada",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            name: "Intan Maharani, M.Psi., Psikolog",
            university: "Universitas Indonesia",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            name: "Meutia Rahayu, M.Psi., Psikolog",
            university: "Universitas Diponegoro",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
    ];

    return (
        <div className="bg-cyan-50 min-h-full">
            {/* Header Halaman */}
            <header className="bg-cyan-400 p-4 flex items-center sticky top-0 z-10 text-white rounded-b-2xl shadow-lg">
                <Link to="/konseling" className="p-2 -ml-2">
                    <BackArrowIcon />
                </Link>
                <h1 className="text-lg font-bold text-center flex-grow -ml-4">
                    Pilih Psikolog Baru
                </h1>
            </header>

            {/* Konten Utama */}
            <main className="p-4 space-y-4">
                {psikologList.map((psikolog, index) => (
                    <PsikologCard
                        key={index}
                        image={psikolog.image}
                        name={psikolog.name}
                        university={psikolog.university}
                        tags={psikolog.tags}
                    />
                ))}
            </main>
        </div>
    );
}
