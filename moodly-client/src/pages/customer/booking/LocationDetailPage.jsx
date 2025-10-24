import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link dan useNavigate

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
        className="text-gray-700 group-hover:text-gray-900"
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

// --- Komponen Kartu Psikolog (Mirip PilihPsikologPage) ---
const PsikologCard = ({ image, name, university, tags, onClick }) => (
    <div
        onClick={onClick} // Tambahkan onClick
        className="bg-white p-3 rounded-2xl border-2 border-gray-100 shadow-sm flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-md"
    >
        <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-lg object-cover" // Ukuran disesuaikan
        />
        <div className="flex-grow">
            <h3 className="font-bold text-gray-800 text-sm leading-tight">
                {name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
                <UniversityIcon />
                <p className="text-xs text-gray-500">{university}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                {" "}
                {/* Wrap tags */}
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            index === tags.length - 1
                                ? "bg-cyan-100 text-cyan-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default function LocationDetailPage() {
    const navigate = useNavigate();

    // Dummy data tempat
    const locationData = {
        name: "Rumah Moodly",
        address: "Jl. Magelang Km 4.5 No. 18, Mlati, Sleman, Yogyakarta 55284",
        rating: 5.0,
        reviews: "198+ Reviews",
        image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600", // Ganti dengan gambar yang sesuai
    };

    // Dummy data psikolog
    const psikologList = [
        {
            id: 1, // Tambahkan ID unik
            name: "Raka Santoso, M.Psi., Psikolog",
            university: "Universitas Gadjah Mada",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 2,
            name: "Vina Amalia, M.Psi., Psikolog",
            university: "Universitas Padjadjaran",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 3,
            name: "Dimas Nugroho, M.Psi., Psikolog",
            university: "Universitas Gadjah Mada",
            tags: ["Stress", "Keluarga", "8+ lainnya"],
            image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
    ];

    // Fungsi untuk navigasi ke detail psikolog
    const handlePsychologistClick = (psychologistId) => {
        // Arahkan ke halaman detail psikolog dengan ID
        // Ganti '/detail-psikolog/' dengan path yang benar di router Anda
        navigate(`/detail-psikolog/${psychologistId}`);
        console.log("Navigasi ke detail psikolog ID:", psychologistId);
    };

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    return (
        <div className="bg-gray-50 min-h-full font-sans">
            {/* Header Gambar */}
            <div className="relative h-48">
                <img
                    src={locationData.image}
                    alt={locationData.name}
                    className="w-full h-full object-cover"
                />
                {/* Tombol Kembali di atas gambar */}
                <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 p-2 bg-white/70 rounded-full group transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="Kembali"
                >
                    <BackArrowIcon />
                </button>
            </div>

            {/* Konten Detail */}
            <main className="p-4 space-y-4 -mt-8 relative z-10">
                {" "}
                {/* Tarik sedikit ke atas */}
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <h1 className="font-bold text-lg text-gray-800">
                        {locationData.name}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        {locationData.address}
                    </p>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} />
                        ))}
                        <span className="text-xs font-semibold text-yellow-500 ml-1">
                            {locationData.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                            {locationData.reviews}
                        </span>
                    </div>
                </div>
                {/* Daftar Psikolog */}
                <div className="bg-white p-4 rounded-xl shadow-lg space-y-3">
                    <h2 className="font-bold text-gray-700 text-base">
                        Daftar Psikolog yang tersedia
                    </h2>
                    {psikologList.map((psikolog) => (
                        <PsikologCard
                            key={psikolog.id}
                            image={psikolog.image}
                            name={psikolog.name}
                            university={psikolog.university}
                            tags={psikolog.tags}
                            onClick={() => handlePsychologistClick(psikolog.id)} // Tambahkan aksi klik
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
