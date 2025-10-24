import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import Link
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Komponen Ikon ---
function ArrowLeftIcon(props) {
    // Header Back Arrow
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            // Ganti warna stroke menjadi putih untuk header biru
            stroke="currentColor" // Disesuaikan di className
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
}

function StarIcon(props) {
    // Rating Star
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.83 4.401 4.753.39c.83.069 1.171 1.028.536 1.601l-3.435 3.016 1.03 4.634c.176.79-.71 1.4-1.442.993L10 15.176l-4.276 2.748c-.732.407-1.618-.203-1.442-.993l1.03-4.634L1.737 9.276c-.635-.573-.294-1.532.536-1.601l4.753-.39 1.83-4.401Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

// Ikon Baru untuk Fitur
const LeafIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        />
        {/* Menggunakan path daun yang lebih sederhana */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 0 1 5.656 0M9 10h.01M15 10h.01M4.71 5.71a9.96 9.96 0 0 1 14.58 0"
        />{" "}
        {/* Garis lengkung bawah */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a6 6 0 0 0-6-6h12a6 6 0 0 0-6 6Z"
        />{" "}
        {/* Bentuk daun */}
    </svg>
);
const ClockIconFeatures = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
    </svg>
);
const LockIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
    </svg>
);

// --- Komponen Kartu Tempat (Tetap Sama, mungkin styling disesuaikan sedikit) ---
const TempatCard = ({ tempat }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(`/booking/tempat/${tempat.id}`, {
            state: location.state,
        });
    };

    return (
        <button
            onClick={handleClick}
            // Ubah shadow dan border agar lebih halus
            className="w-full text-left bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.03] active:scale-95 border border-gray-100"
        >
            <img
                src={
                    tempat.image ||
                    "https://placehold.co/400x200/EBF4FF/BFDBFE?text=Tempat"
                } // Ubah warna placeholder
                alt={tempat.nama_tempat}
                className="w-full h-32 object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                        "https://placehold.co/400x200/EBF4FF/BFDBFE?text=Tempat";
                }}
            />
            <div className="p-3">
                <h3 className="font-bold text-gray-800 text-base">
                    {tempat.nama_tempat}
                </h3>
                {/* Modifikasi alamat agar lebih singkat jika perlu */}
                <p className="text-xs text-gray-500 mt-1 truncate">
                    {tempat.alamat}
                </p>
                <div className="flex items-center mt-2">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-700 ml-1">
                        {tempat.rating?.toFixed(1) || "N/A"}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                        ({tempat.review_count || 0}+ Reviews)
                    </span>
                </div>
            </div>
        </button>
    );
};

export default function InPersonPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [tempatList, setTempatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTempatKonseling = async () => {
            // ... (logika fetch data tetap sama) ...
            try {
                setLoading(true);
                const response = await apiClient.get(
                    "/api/booking/tempat-konseling"
                );
                setTempatList(response.data);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data tempat:", err);
                setError("Gagal memuat daftar tempat.");
            } finally {
                setLoading(false);
            }
        };
        fetchTempatKonseling();
    }, []);

    return (
        // Ubah bg-sky-50 menjadi lebih terang atau sesuai desain
        <div className="bg-pink-50 min-h-screen">
            {/* Header Baru */}
            <header className="bg-cyan-500 p-4 pt-6 flex items-center sticky top-0 z-10 text-white rounded-b-2xl shadow-md">
                <button
                    // Arahkan kembali ke /booking
                    onClick={() =>
                        navigate("/booking", { state: location.state })
                    }
                    className="p-2 -ml-2 rounded-full hover:bg-cyan-600 transition-colors"
                >
                    {/* Ganti warna ikon menjadi putih */}
                    <ArrowLeftIcon className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-lg font-bold text-center flex-grow -ml-2">
                    {" "}
                    {/* Sesuaikan margin jika perlu */}
                    Tatap Muka
                </h1>
                {/* Spacer jika perlu agar judul benar-benar di tengah */}
                <div className="w-10"></div>
            </header>

            {/* Bagian Fitur Ikon Baru */}
            <section className="px-4 py-3 flex justify-around items-center bg-white shadow-sm rounded-lg mx-4 -mt-4 relative z-0">
                <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                        <LeafIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                        Nyaman
                    </span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                        <ClockIconFeatures className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                        Tanpa Antri
                    </span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                        <LockIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                        Aman
                    </span>
                </div>
            </section>

            {/* Teks Deskriptif Baru */}
            <section className="px-4 pt-5 pb-2">
                <h2 className="text-base font-bold text-gray-800">
                    Rumah Moodly
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    Tempat aman untuk mengenal dan menyembuhkan diri.
                </p>
            </section>

            {/* Konten Utama (Daftar Tempat) */}
            {/* Hapus bg-sky-50 dari main, sudah ada di div terluar */}
            <main className="p-4 pt-0">
                {loading && (
                    <div className="text-center py-10">Memuat tempat...</div>
                )}
                {error && (
                    <div className="text-center py-10 text-red-500">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-4">
                        {" "}
                        {/* Hanya 1 kolom sesuai desain */}
                        {tempatList.length > 0 ? (
                            tempatList.map((tempat) => (
                                <TempatCard key={tempat.id} tempat={tempat} />
                            ))
                        ) : (
                            <p className="col-span-1 text-center text-gray-500 py-10">
                                Tidak ada tempat konseling yang tersedia saat
                                ini.
                            </p>
                        )}
                    </div>
                )}
            </main>
        </div> // Tutup div terluar
    );
}
