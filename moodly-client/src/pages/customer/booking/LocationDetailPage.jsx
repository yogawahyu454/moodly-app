import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Komponen Ikon ---
function ArrowLeftIcon(props) {
    /* ... (ikon BackArrow) ... */
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
}
function StarIcon(props) {
    /* ... (ikon Star) ... */
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
const UniversityIcon = () => (
    /* ... (ikon University) ... */
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);
// --- Komponen Kartu Psikolog (Sama seperti di FindCounselorPage) ---
const PsikologCard = ({ counselor, onClick }) => {
    const specializationTags = counselor.spesialisasi?.slice(0, 2) || [
        "Spesialisasi",
    ];
    if (counselor.spesialisasi?.length > 2) {
        specializationTags.push(
            `${counselor.spesialisasi.length - 2}+ lainnya`
        );
    }

    return (
        <div
            onClick={onClick}
            className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer" // Border lebih halus
        >
            <img
                src={counselor.avatar}
                alt={counselor.name}
                className="w-16 h-16 rounded-lg object-cover" // Ukuran disesuaikan
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        counselor.name
                    )}&background=EBF4FF&color=3B82F6&bold=true`;
                }}
            />
            <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-sm">
                    {counselor.name}
                </h3>{" "}
                {/* Ukuran font disesuaikan */}
                <div className="flex items-center gap-1.5 mt-0.5">
                    {" "}
                    {/* Margin top dikurangi */}
                    <UniversityIcon />
                    <p className="text-xs text-gray-500">
                        {counselor.universitas || "Universitas"}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    {" "}
                    {/* Margin top dan gap disesuaikan */}
                    {specializationTags.map((tag, index) => (
                        <span
                            key={index}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                // Ukuran font dan padding
                                index === specializationTags.length - 1 &&
                                tag.includes("+")
                                    ? "bg-cyan-100 text-cyan-700" // Warna disesuaikan
                                    : "bg-blue-100 text-blue-700" // Warna disesuaikan
                            }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function TempatDetailPage() {
    const { tempatId } = useParams(); // Ambil ID tempat dari URL
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId, serviceName } = location.state || {}; // Ambil data service

    const [tempatDetail, setTempatDetail] = useState(null);
    const [counselors, setCounselors] = useState([]);
    const [loadingTempat, setLoadingTempat] = useState(true);
    const [loadingCounselors, setLoadingCounselors] = useState(true);
    const [error, setError] = useState(null);

    // Fetch detail tempat
    useEffect(() => {
        const fetchTempatDetail = async () => {
            try {
                setLoadingTempat(true);
                const response = await apiClient.get(
                    `/api/booking/tempat-konseling/${tempatId}`
                );
                setTempatDetail(response.data);
                setError(null); // Reset error jika fetch tempat berhasil
            } catch (err) {
                console.error("Gagal mengambil detail tempat:", err);
                setError("Gagal memuat detail tempat.");
            } finally {
                setLoadingTempat(false);
            }
        };
        fetchTempatDetail();
    }, [tempatId]);

    // Fetch daftar konselor (setelah detail tempat berhasil dimuat)
    useEffect(() => {
        if (!tempatDetail) return; // Jangan fetch jika detail tempat belum ada

        const fetchCounselors = async () => {
            try {
                setLoadingCounselors(true);
                // Endpoint sama seperti FindCounselorPage
                const response = await apiClient.get(
                    `/api/booking/counselors`,
                    {
                        // params: { serviceId } // Filter jika backend mendukung
                    }
                );
                setCounselors(response.data);
                // Jangan reset error di sini, biarkan error dari fetchTempatDetail
            } catch (err) {
                console.error("Gagal mengambil data konselor:", err);
                // Prioritaskan error dari fetchTempatDetail jika ada
                if (!error) {
                    setError("Gagal memuat daftar konselor.");
                }
            } finally {
                setLoadingCounselors(false);
            }
        };
        fetchCounselors();
    }, [tempatDetail, serviceId, error]); // Tambahkan error sebagai dependency

    // Handle saat kartu psikolog diklik
    const handleSelectCounselor = (counselorId, counselorName) => {
        // Arahkan ke halaman berikutnya (pilih jadwal), bawa semua data
        console.log("Navigasi ke pilih jadwal dari detail tempat:", {
            serviceId,
            serviceName,
            tempatId: parseInt(tempatId), // Pastikan integer
            method: "Offline", // Ini pasti Offline
            counselorId,
            counselorName,
        });
        navigate("/booking/select-schedule", {
            // Ganti path jika perlu
            state: {
                serviceId,
                serviceName,
                tempatId: parseInt(tempatId),
                method: "Offline",
                counselorId,
                counselorName,
            },
        });
    };

    // Tampilkan loading jika salah satu data masih loading
    const isLoading = loadingTempat || loadingCounselors;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
                <button
                    onClick={() =>
                        navigate("/booking/in-person", {
                            state: location.state,
                        })
                    } // Kembali ke daftar tempat
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-800 mx-auto pr-8">
                    {loadingTempat
                        ? "Memuat..."
                        : tempatDetail?.nama_tempat || "Detail Tempat"}
                </h1>
                {/* <div className="w-6"></div> Spacer */}
            </header>

            {/* Konten */}
            <main className="pb-4">
                {error && (
                    <div className="p-4 text-center text-red-500">{error}</div>
                )}

                {/* Bagian Detail Tempat */}
                {!loadingTempat && tempatDetail && (
                    <div className="bg-white shadow-md">
                        <img
                            src={
                                tempatDetail.image ||
                                "https://placehold.co/600x300/E0F2FE/0EA5E9?text=Tempat"
                            }
                            alt={tempatDetail.nama_tempat}
                            className="w-full h-48 object-cover" // Tinggi gambar disesuaikan
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://placehold.co/600x300/E0F2FE/0EA5E9?text=Tempat";
                            }}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                {tempatDetail.nama_tempat}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {tempatDetail.alamat}
                            </p>
                            <div className="flex items-center mt-2">
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                                <span className="text-sm font-semibold text-gray-800 ml-1">
                                    {tempatDetail.rating?.toFixed(1) || "N/A"}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                    ({tempatDetail.review_count || 0}+ Reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bagian Daftar Psikolog */}
                <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">
                        Daftar Psikolog yang tersedia
                    </h3>

                    {isLoading && (
                        <div className="text-center text-gray-500 py-5">
                            Memuat konselor...
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="space-y-3">
                            {counselors.length > 0 ? (
                                counselors.map((counselor) => (
                                    <PsikologCard
                                        key={counselor.id}
                                        counselor={counselor}
                                        onClick={() =>
                                            handleSelectCounselor(
                                                counselor.id,
                                                counselor.name
                                            )
                                        }
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-5">
                                    Tidak ada konselor yang tersedia di lokasi
                                    ini saat ini.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
