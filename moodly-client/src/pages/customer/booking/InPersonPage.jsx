import React from "react";

import { Link, useNavigate } from "react-router-dom"; // useNavigate untuk tombol back

// --- Komponen Ikon ---

const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" // --- PERBAIKAN 1: Hapus comment (//) di sini ---
        strokeWidth="2.5" // Sedikit lebih tebal
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white group-hover:text-gray-100" // Warna ikon putih
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>

        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const LeafIcon = () => (
    /* Ganti dengan ikon daun yang sesuai */

    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-cyan-600"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a1 1 0 011-1h1a1 1 0 011 1v.586l4.707 4.707a1 1 0 001.414 0L15 4.586V4a1 1 0 011-1h1a1 1 0 011 1v5.293zM5 5h3v3L5 5zm9 0h3v3l-3-3z"
            clipRule="evenodd"
        />
    </svg>
);

const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-cyan-600"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
            clipRule="evenodd"
        />
    </svg>
);

const ShieldIcon = () => (
    /* Ganti dengan ikon shield/aman yang sesuai */

    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-cyan-600"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10 12l-5-3 5-9 5 9-5 3z" /> {/* Bagian atas perisai */}
        <path
            fillRule="evenodd"
            d="M3.261 6.818A8.96 8.96 0 002 12c0 4.168 2.943 7.643 6.8 8.756a1 1 0 00.4.001C13.057 19.643 16 16.168 16 12a8.96 8.96 0 00-1.261-5.182A8.995 8.995 0 0010 2.04a8.995 8.995 0 00-6.739 4.778zM10 16a4 4 0 100-8 4 4 0 000 8z"
            clipRule="evenodd"
        />{" "}
        {/* Bagian bawah & centang */}
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

// --- Komponen Filter Item ---

const FilterItem = ({ icon, label }) => (
    <div className="flex items-center gap-1.5 bg-blue-100 rounded-full px-3 py-1.5">
        {icon}

        <span className="text-xs font-semibold text-blue-600">{label}</span>
    </div>
);

// --- Komponen Card Tempat ---

const PlaceCard = ({ image, name, location, rating, reviews }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <img src={image} alt={name} className="w-full h-32 object-cover" />

        <div className="p-3">
            <h3 className="font-bold text-gray-800 text-sm">{name}</h3>

            <p className="text-xs text-gray-500 mt-0.5">{location}</p>

            <div className="flex items-center mt-1.5">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                ))}
                <span className="text-xs font-semibold text-gray-600 ml-1">
                    {rating.toFixed(1)}
                </span>{" "}
                {/* Warna rating disesuaikan */}
            </div>

            <p className="text-xs text-gray-400 mt-0.5">{reviews}+ Reviews</p>
        </div>
    </div>
);

// --- Komponen Halaman Tatap Muka ---

export default function TatapMukaPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    // Dummy data tempat

    const places = [
        {
            name: "Rumah Moodly",

            location: "Sleman, Yogyakarta",

            rating: 5.0,

            reviews: 198,

            image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600",
        },

        {
            name: "Rumah Moodly",

            location: "Bantul, Yogyakarta",

            rating: 5.0,

            reviews: 170,

            image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600",
        },

        {
            name: "Rumah Moodly",

            location: "Kraton, Yogyakarta",

            rating: 5.0,

            reviews: 188,

            image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
    ];

    return (
        <div className="bg-blue-50 min-h-full font-sans">
            {/* Header Halaman */}

            <header className="bg-cyan-400 p-4 pt-6 flex items-center sticky top-0 z-20 text-white rounded-b-3xl shadow-lg">
                <button
                    onClick={handleBack}
                    // --- PERBAIKAN 2: Tambah bg-black/10 biar area tombol lebih jelas ---

                    className="p-3 mr-2 rounded-full bg-black/10 hover:bg-cyan-500/50 active:bg-cyan-600/50 group transition-colors"
                    aria-label="Kembali"
                >
                    <BackArrowIcon />
                </button>
                <h1 className="text-lg font-bold text-center flex-grow -translate-x-4">
                    Tatap Muka
                </h1>
                <div className="w-8"></div> {/* Spacer */}
            </header>

            {/* Konten Utama */}

            <main className="relative px-4 pt-4 pb-20">
                {/* Filter Pills Container */}

                <div className="flex justify-around items-center gap-2 mx-auto max-w-sm mb-6 pt-2">
                    <FilterItem icon={<LeafIcon />} label="Nyaman" />

                    <FilterItem icon={<ClockIcon />} label="Tanpa Antri" />

                    <FilterItem icon={<ShieldIcon />} label="Aman" />
                </div>

                {/* Judul Section */}

                <div className="mb-4 px-1">
                    <h2 className="font-bold text-gray-800 text-base">
                        Rumah Moodly
                    </h2>

                    <p className="text-xs text-gray-600 mt-1">
                        Tempat aman untuk mengenal dan menyembuhkan diri.
                    </p>
                </div>

                {/* Daftar Tempat */}

                <div className="grid grid-cols-1 gap-4">
                    _{" "}
                    {places.map((place, index) => (
                        <PlaceCard
                            key={index}
                            image={place.image}
                            name={place.name}
                            location={place.location}
                            rating={place.rating}
                            reviews={place.reviews}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
