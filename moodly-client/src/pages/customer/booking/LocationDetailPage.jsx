import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Komponen Ikon (Tetap sama) ---
// ... (Kode ikon tidak perlu ditampilkan ulang)
// Icon Panah Kiri (di header)
function ArrowLeftIcon(props) {
    // ... (kode ikon)
}
// Icon Bintang (Rating)
function StarIcon(props) {
    // ... (kode ikon)
}
// Icon Universitas
function UniversityIcon(props) {
    // ... (kode ikon)
}

// Format Tanggal (Helper)
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch (e) {
        return dateString; // Fallback ke string asli jika format salah
    }
};

// Komponen Kartu Psikolog (Sama seperti di FindCounselorPage)
const PsikologCard = ({ counselor, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-white p-3 rounded-2xl border-2 border-cyan-100 shadow-sm flex items-center gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer text-left"
    >
        <img
            src={counselor.avatar} // Sudah ada accessor di backend
            alt={counselor.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            onError={(e) => {
                // Fallback jika avatar gagal load
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    counselor.name
                )}&background=EBF4FF&color=3B82F6&bold=true`;
            }}
        />
        <div className="flex-grow">
            <h3 className="font-bold text-gray-800 text-base">
                {counselor.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
                <UniversityIcon />
                <p className="text-sm text-gray-500">
                    {counselor.universitas || "Universitas tidak diketahui"}
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Tampilkan spesialisasi (asumsi array) */}
                {Array.isArray(counselor.spesialisasi) &&
                    counselor.spesialisasi.slice(0, 2).map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600"
                        >
                            {tag}
                        </span>
                    ))}
                {Array.isArray(counselor.spesialisasi) &&
                    counselor.spesialisasi.length > 2 && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-100 text-cyan-600">
                            {counselor.spesialisasi.length - 2}+ lainnya
                        </span>
                    )}
            </div>
        </div>
    </button>
);

// --- Komponen Halaman ---
export default function LocationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId, serviceName } = location.state || {};

    const [tempatDetail, setTempatDetail] = useState(null);
    const [counselors, setCounselors] = useState([]);
    const [loadingTempat, setLoadingTempat] = useState(true);
    const [loadingCounselor, setLoadingCounselor] = useState(true);
    const [error, setError] = useState(null);

    // --- TAMBAHKAN LOG DI SINI ---
    console.log(
        "LocationDetailPage rendered. ID from useParams:",
        id,
        "Type:",
        typeof id
    );
    // -----------------------------

    // Fetch data detail tempat
    useEffect(() => {
        const fetchTempatDetail = async () => {
            // --- TAMBAHKAN LOG DI SINI ---
            console.log(
                "useEffect running. ID before fetch:",
                id,
                "Type:",
                typeof id
            );
            // -----------------------------

            // Tambahkan pengecekan ID sebelum fetch
            if (!id || id === "undefined") {
                console.error("ID tempat tidak valid:", id);
                setError("Gagal memuat detail tempat: ID tidak valid.");
                setLoadingTempat(false);
                return; // Hentikan fetch jika ID tidak valid
            }

            try {
                setLoadingTempat(true);
                const response = await apiClient.get(
                    `/api/booking/tempat-konseling/${id}` // Gunakan id dari useParams
                );
                setTempatDetail(response.data);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil detail tempat:", err);
                setError("Gagal memuat detail tempat.");
                // Jangan setTempatDetail(null) di sini agar error tampil
            } finally {
                setLoadingTempat(false);
            }
        };

        fetchTempatDetail();

        // Pastikan dependensi hanya 'id'. Jika id berubah, fetch ulang.
    }, [id]);

    // Fetch data konselor (setelah detail tempat didapat, atau bisa paralel)
    useEffect(() => {
        const fetchCounselors = async () => {
            // Tidak perlu dependensi pada tempatId di sini, ambil semua konselor aktif
            try {
                setLoadingCounselor(true);
                const response = await apiClient.get("/api/booking/counselors");
                // TODO: Nanti kita bisa filter berdasarkan tempat jika ada relasi di backend
                setCounselors(response.data || []);
            } catch (err) {
                console.error("Gagal mengambil data konselor:", err);
                // Mungkin tidak perlu setError di sini jika daftar konselor kosong bukan error fatal
                setCounselors([]);
            } finally {
                setLoadingCounselor(false);
            }
        };
        fetchCounselors();
        // Jalankan sekali saat komponen mount
    }, []);

    // Handle klik pada kartu konselor
    const handleCounselorClick = (counselorId) => {
        // Navigasi ke halaman berikutnya (misal: pilih jadwal), kirim semua data
        navigate(`/booking/schedule`, {
            // Ganti '/schedule' dengan path halaman jadwal Anda
            state: {
                serviceId: serviceId,
                serviceName: serviceName,
                tempatId: id, // ID tempat dari useParams
                tempatName: tempatDetail?.nama_tempat,
                counselorId: counselorId,
                method: "Offline",
            },
        });
        console.log("Navigating to schedule with state:", {
            serviceId,
            serviceName,
            tempatId: id,
            counselorId,
        });
    };

    // Tampilkan loading jika salah satu masih loading
    if (loadingTempat) {
        return <div className="p-4 text-center">Memuat detail tempat...</div>;
    }

    // Tampilkan error jika fetch tempat gagal
    if (error) {
        return (
            <div className="bg-pink-50 min-h-screen p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-800 mb-4"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    // Tampilkan jika tempatDetail null setelah loading selesai (kasus aneh)
    if (!tempatDetail) {
        return (
            <div className="bg-pink-50 min-h-screen p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-800 mb-4"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="text-center text-gray-500">
                    Data tempat tidak ditemukan.
                </div>
            </div>
        );
    }

    // Format rating setelah memastikan tempatDetail ada dan rating adalah angka
    const ratingValue = tempatDetail.rating
        ? Number(tempatDetail.rating)
        : null;
    const ratingDisplay = ratingValue !== null ? ratingValue.toFixed(1) : "N/A";

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Gambar Header */}
            <div className="relative">
                <button
                    onClick={() => navigate(-1)} // Tombol kembali absolut
                    className="absolute top-4 left-4 z-10 p-2 bg-white bg-opacity-70 rounded-full text-gray-800"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <img
                    src={
                        tempatDetail.image ||
                        "https://placehold.co/400x200/E0F2FE/0EA5E9?text=Tempat"
                    }
                    alt={tempatDetail.nama_tempat}
                    className="w-full h-48 object-cover rounded-b-2xl"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/400x200/E0F2FE/0EA5E9?text=Tempat";
                    }}
                />
            </div>

            {/* Konten Detail */}
            <main className="p-4 -mt-8 relative z-20">
                {" "}
                {/* Tarik ke atas sedikit */}
                {/* Kartu Info Tempat */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
                    <h1 className="text-xl font-bold text-gray-800">
                        {tempatDetail.nama_tempat}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {tempatDetail.alamat}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`w-5 h-5 ${
                                    ratingValue !== null &&
                                    i < Math.round(ratingValue)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                        <span className="font-bold text-gray-800 ml-1">
                            {ratingDisplay}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                            ({tempatDetail.review_count || 0}+ Reviews)
                        </span>
                    </div>
                </div>
                {/* Daftar Psikolog */}
                <h2 className="text-lg font-bold text-gray-800 mb-3">
                    Daftar Psikolog yang tersedia
                </h2>
                {loadingCounselor && (
                    <div className="text-center text-gray-500">
                        Memuat konselor...
                    </div>
                )}
                {!loadingCounselor && (
                    <div className="space-y-3">
                        {counselors.length > 0 ? (
                            counselors.map((counselor) => (
                                <PsikologCard
                                    key={counselor.id}
                                    counselor={counselor}
                                    onClick={() =>
                                        handleCounselorClick(counselor.id)
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-5">
                                Tidak ada konselor yang tersedia di lokasi ini
                                saat ini.
                            </p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
