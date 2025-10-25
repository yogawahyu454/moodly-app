import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import apiClient from "../../../api/axios";

// --- Komponen Ikon ---
const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
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
        className="h-5 w-5 text-cyan-600 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.998.998 0 011.07 0l3.078 1.539a1 1 0 00.99-.001l3.078-1.538a1 1 0 011.07 0L19 6.92a1 1 0 000-1.84l-7-3zM3 9.38l-.62-.31a1 1 0 000 1.84l7 3.5a1 1 0 00.99 0l7-3.5a1 1 0 000-1.84L17 9.38v3.13a1 1 0 00.52.87l1.17.59a1 1 0 010 1.74l-8 4a1 1 0 01-.98 0l-8-4a1 1 0 010-1.74l1.17-.59A1 1 0 003 12.51V9.38z" />
    </svg>
);
const LicenseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-cyan-600 flex-shrink-0"
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
const VoiceCallIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1.5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);
const ChatIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1.5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
        />
    </svg>
);
const VideoCallIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1.5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A.5.5 0 0014 7.5v5a.5.5 0 00.553.494l2-1A.5.5 0 0017 11.5v-3a.5.5 0 00-.447-.494l-2-1z" />
    </svg>
);
// --- Akhir Komponen Ikon ---

export default function PsychologistDetailPage() {
    const navigate = useNavigate();
    const { id: counselorId } = useParams();
    const location = useLocation();
    const { serviceId, serviceName, tempatId, tempatName, method } =
        location.state || {};

    const [activeTab, setActiveTab] = useState("Profile Psikolog");
    const [psychologistData, setPsychologistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPsychologistDetail = async () => {
            // ... (logika fetch data tetap sama)
            if (!counselorId) {
                setError("ID Konselor tidak valid.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await apiClient.get(
                    `/api/booking/counselors/${counselorId}`
                );
                setPsychologistData(response.data);
                setError(null);
            } catch (err) {
                setError("Gagal memuat detail psikolog.");
                console.error("Fetch detail error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPsychologistDetail();
    }, [counselorId]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleStartCounseling = () => {
        // ... (logika navigasi ke jadwal tetap sama)
        navigate(`/booking/schedule`, {
            // Asumsi halaman jadwal adalah /booking/schedule
            state: {
                serviceId,
                serviceName,
                tempatId,
                tempatName,
                counselorId,
                counselorName: psychologistData?.name,
                method: activeTab === "Jadwal" ? method : null, // Kirim method jika di tab Jadwal
            },
        });
    };

    if (loading)
        return <div className="p-4 text-center">Memuat detail psikolog...</div>;
    if (error)
        return <div className="p-4 text-center text-red-500">{error}</div>;
    if (!psychologistData)
        return (
            <div className="p-4 text-center">
                Data psikolog tidak ditemukan.
            </div>
        );

    const ratingValue = psychologistData.rating
        ? Number(psychologistData.rating)
        : null;
    const ratingDisplay = ratingValue !== null ? ratingValue.toFixed(1) : "N/A";
    const firstName = psychologistData.name?.split(",")[0]; // Ambil nama depan

    // Ambil maks 4 spesialisasi pertama
    const specializationTags = Array.isArray(psychologistData.spesialisasi)
        ? psychologistData.spesialisasi.slice(0, 4)
        : [];
    // Tambah tag '+ lainnya' jika > 4
    if (
        Array.isArray(psychologistData.spesialisasi) &&
        psychologistData.spesialisasi.length > 4
    ) {
        specializationTags[3] = `${
            psychologistData.spesialisasi.length - 3
        }+ lainnya`; // Ganti item ke-4
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* --- Header Dinamis --- */}
            {activeTab === "Profile Psikolog" ? (
                // --- Layout Header untuk Tab Profile ---
                <div className="relative pb-16">
                    {" "}
                    {/* Beri ruang di bawah untuk avatar */}
                    {/* Background Biru */}
                    <div className="bg-gradient-to-b from-cyan-400 to-cyan-200 h-36 rounded-b-3xl absolute top-0 left-0 right-0 z-0">
                        {/* Tombol Back di dalam area biru */}
                        <button
                            onClick={handleBack}
                            className="absolute top-6 left-4 p-2 rounded-full text-white hover:bg-cyan-500/50 group transition-colors z-10"
                            aria-label="Kembali"
                        >
                            <BackArrowIcon />
                        </button>
                        <h1 className="absolute top-6 left-1/2 -translate-x-1/2 text-lg font-bold text-white z-10">
                            Psikolog {firstName}
                        </h1>
                    </div>
                    {/* Avatar di tengah, overlay */}
                    <div className="relative flex justify-center pt-20 z-10">
                        <img
                            src={
                                psychologistData.avatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    psychologistData.name || "P"
                                )}&background=EBF4FF&color=3B82F6&bold=true&size=128`
                            }
                            alt={psychologistData.name}
                            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    psychologistData.name || "P"
                                )}&background=EBF4FF&color=3B82F6&bold=true&size=128`;
                            }}
                        />
                    </div>
                    {/* Nama dan Rating di bawah Avatar */}
                    <div className="text-center mt-2 px-4">
                        <h2 className="font-bold text-lg text-gray-800">
                            {psychologistData.name}
                        </h2>
                        <div className="flex items-center justify-center mt-1">
                            <StarIcon />
                            <span className="text-sm font-semibold text-yellow-500 ml-1">
                                {ratingDisplay}
                            </span>
                            <span className="text-xs text-gray-400 ml-1.5">
                                {psychologistData.reviews || "(0 ulasan)"}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                // --- Layout Header untuk Tab Jadwal ---
                <header className="bg-gradient-to-b from-cyan-400 to-cyan-200 p-4 pt-6 flex items-start sticky top-0 z-20 text-white rounded-b-3xl shadow-lg">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 mr-2 rounded-full hover:bg-cyan-500/50 group transition-colors flex-shrink-0"
                        aria-label="Kembali"
                    >
                        <BackArrowIcon />
                    </button>
                    {/* Avatar Kecil di Kiri */}
                    <img
                        src={
                            psychologistData.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                psychologistData.name || "P"
                            )}&background=EBF4FF&color=3B82F6&bold=true&size=64`
                        }
                        alt={psychologistData.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mr-3 flex-shrink-0"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                psychologistData.name || "P"
                            )}&background=EBF4FF&color=3B82F6&bold=true&size=64`;
                        }}
                    />
                    {/* Nama dan Keahlian di Kanan */}
                    <div className="flex-grow pt-1">
                        <h1 className="text-base font-bold leading-tight">
                            {psychologistData.name}
                        </h1>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {specializationTags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                                        tag.includes("+")
                                            ? "bg-white/30 text-white border border-white/50" // Warna beda untuk 'lainnya'
                                            : "bg-white text-cyan-600" // Warna tag biasa
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </header>
            )}
            {/* --- Akhir Header Dinamis --- */}

            {/* Konten Utama (Tabs dan Isi Tab) */}
            <main className="relative p-4 pb-24">
                {" "}
                {/* Tambah padding bottom lebih banyak */}
                {/* Pindahkan Tabs ke sini */}
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
                    // Konten Profile (tetap sama)
                    <div className="space-y-5">
                        {/* Keahlian */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="font-bold text-gray-700 text-base mb-2">
                                Keahlian
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(psychologistData.spesialisasi) &&
                                psychologistData.spesialisasi.length > 0 ? (
                                    psychologistData.spesialisasi.map(
                                        (tag, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-100 text-cyan-700"
                                            >
                                                {tag}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        Belum ada data keahlian.
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Tentang Psikolog */}
                        <div className="bg-white p-4 rounded-xl shadow space-y-3">
                            <h3 className="font-bold text-gray-700 text-base">
                                Tentang {firstName}
                            </h3>
                            {psychologistData.universitas && (
                                <div className="flex items-start gap-1.5">
                                    <EducationIcon />
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-600 mb-0.5">
                                            Pendidikan
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {psychologistData.universitas}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {psychologistData.surat_izin_praktik && (
                                <div className="flex items-start gap-1.5">
                                    <LicenseIcon />
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-600 mb-0.5">
                                            Nomor Izin Praktek
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {
                                                psychologistData.surat_izin_praktik
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}
                            {!psychologistData.universitas &&
                                !psychologistData.surat_izin_praktik && (
                                    <p className="text-xs text-gray-400">
                                        Informasi pendidikan dan lisensi belum
                                        tersedia.
                                    </p>
                                )}
                        </div>

                        {/* Melayani Via */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="font-bold text-gray-700 text-base mb-2">
                                Melayani via:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(psychologistData.servesVia) &&
                                psychologistData.servesVia.length > 0 ? (
                                    psychologistData.servesVia.map(
                                        (method, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                                            >
                                                {method === "Voice Call" && (
                                                    <VoiceCallIcon />
                                                )}
                                                {method === "Chat" && (
                                                    <ChatIcon />
                                                )}
                                                {(method === "Video Call" ||
                                                    method ===
                                                        "Vidio Call") && (
                                                    <VideoCallIcon />
                                                )}
                                                {method}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        Metode layanan belum ditentukan.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* Konten Tab Jadwal (Sementara) */}
                {activeTab === "Jadwal" && (
                    <div className="bg-white p-4 rounded-xl shadow text-center text-gray-500">
                        <p className="font-semibold mb-4">Fitur Jadwal</p>
                        <p>
                            Pilih Waktu, Durasi, Tanggal, Jam, dan Media
                            Konseling.
                        </p>
                        <p className="mt-4 text-sm">
                            (Komponen jadwal akan diimplementasikan di sini)
                        </p>
                    </div>
                )}
            </main>

            {/* Tombol Mulai Konseling (Fixed Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-20">
                <button
                    onClick={handleStartCounseling}
                    className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-cyan-600 transition-colors active:scale-95 disabled:bg-gray-400"
                >
                    Mulai konseling dengan {firstName}
                </button>
            </div>
        </div>
    );
}
