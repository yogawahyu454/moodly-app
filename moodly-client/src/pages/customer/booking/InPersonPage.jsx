import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Tambahkan Link
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Komponen Ikon ---

// Icon Panah Kiri (di header)
function ArrowLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2} // Dibuat lebih tebal sedikit
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
}

// Icon Daun (Nyaman)
function LeafIcon(props) {
    return (
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
        </svg>
    );
}

// Icon Jam (Tanpa Antri)
function ClockIconSolid(props) {
    // Versi solid fill
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

// Icon Gembok (Aman)
function LockIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-3.75 5.25v3a.75.75 0 0 0 1.5 0v-3a3.75 3.75 0 1 1 7.5 0v3a.75.75 0 0 0 1.5 0v-3a5.25 5.25 0 0 0-10.5 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

// Icon Bintang (Rating)
function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.597 2.622c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
            />
        </svg>
    );
}

// --- Komponen Halaman ---
export default function InPersonPage() {
    const navigate = useNavigate();
    const location = useLocation();
    // Ambil data serviceId dan serviceName dari state navigasi
    const { serviceId, serviceName } = location.state || {};

    const [tempatList, setTempatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data tempat konseling saat komponen mount
    useEffect(() => {
        const fetchTempatKonseling = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(
                    "/api/booking/tempat-konseling"
                );
                setTempatList(response.data || []); // Pastikan array
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data tempat:", err);
                setError("Gagal memuat daftar tempat.");
                setTempatList([]); // Kosongkan jika error
            } finally {
                setLoading(false);
            }
        };
        fetchTempatKonseling();
    }, []);

    // Handle klik pada kartu tempat
    const handleTempatClick = (tempatId) => {
        // --- TAMBAHKAN LOG DI SINI ---
        console.log(
            "Navigating to detail page for tempatId:",
            tempatId,
            "Type:",
            typeof tempatId
        );
        // -----------------------------

        // Navigasi ke halaman detail tempat
        navigate(`/booking/tempat/${tempatId}`, {
            state: { serviceId, serviceName }, // Kirim juga info service
        });
    };

    return (
        <div className="bg-pink-50 min-h-screen">
            {" "}
            {/* Latar belakang pink lembut */}
            {/* Header Biru */}
            <header className="bg-sky-500 p-4 flex items-center sticky top-0 z-10 text-white rounded-b-2xl shadow-lg">
                <button
                    onClick={() => navigate(-1)} // Tombol kembali
                    className="p-2 -ml-2 text-white" // Warna putih
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-center flex-grow -ml-4">
                    Tatap Muka
                </h1>
                {/* Spacer agar judul tetap di tengah */}
                <div className="w-6"></div>
            </header>
            {/* Ikon Fitur */}
            <div className="px-4 py-3 flex justify-around items-center bg-white rounded-lg mx-4 -mt-5 relative z-20 shadow">
                <div className="flex flex-col items-center gap-1">
                    <div className="bg-sky-100 p-2 rounded-full">
                        <LeafIcon className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                        Nyaman
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="bg-sky-100 p-2 rounded-full">
                        <ClockIconSolid className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                        Tanpa Antri
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="bg-sky-100 p-2 rounded-full">
                        <LockIcon className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                        Aman
                    </span>
                </div>
            </div>
            {/* Konten Utama */}
            <main className="p-4 pt-6">
                {" "}
                {/* Beri padding atas */}
                <h2 className="text-lg font-bold text-gray-800 mb-1">
                    Rumah Moodly
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    Tempat aman untuk mengenal dan menyembuhkan diri.
                </p>
                {/* Loading & Error State */}
                {loading && (
                    <div className="text-center py-10 text-gray-500">
                        Memuat tempat...
                    </div>
                )}
                {error && (
                    <div className="text-center py-10 text-red-500">
                        {error}
                    </div>
                )}
                {/* Daftar Tempat */}
                {!loading && !error && (
                    <div className="space-y-4">
                        {tempatList.length > 0 ? (
                            tempatList.map((tempat) => (
                                <button
                                    key={tempat.id}
                                    onClick={() => handleTempatClick(tempat.id)} // Periksa ID di sini
                                    className="w-full bg-white p-3 rounded-2xl shadow-md flex items-start gap-4 transition-transform duration-200 hover:scale-[1.02]"
                                >
                                    <img
                                        src={
                                            tempat.image ||
                                            "https://placehold.co/120x90/E0F2FE/0EA5E9?text=Tempat"
                                        } // Gunakan URL dari API atau placeholder
                                        alt={tempat.nama_tempat}
                                        className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                                        onError={(e) => {
                                            // Fallback jika gambar gagal load
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/120x90/E0F2FE/0EA5E9?text=Tempat";
                                        }}
                                    />
                                    <div className="text-left">
                                        <h3 className="font-bold text-base text-gray-800">
                                            {tempat.nama_tempat}
                                        </h3>
                                        {/* Tampilkan kota saja dari alamat */}
                                        <p className="text-sm text-gray-500 mt-1">
                                            {tempat.alamat
                                                ?.split(",")[1]
                                                ?.trim() || tempat.alamat}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i <
                                                        Math.round(
                                                            tempat.rating || 0
                                                        )
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                            <span className="text-sm font-bold text-gray-700 ml-1">
                                                {/* Tampilkan rating dengan 1 desimal */}
                                                {/* Gunakan Number() untuk memastikan tipe data */}
                                                {tempat.rating
                                                    ? Number(
                                                          tempat.rating
                                                      ).toFixed(1)
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {tempat.review_count || 0}+ Reviews
                                        </p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-10">
                                Tidak ada tempat konseling yang tersedia saat
                                ini.
                            </p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
