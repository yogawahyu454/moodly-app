import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Tambahkan useLocation, useNavigate
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Komponen Ikon ---
const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        // stroke="currentColor" // Warna stroke diambil dari className
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        // className="text-gray-700" // Warna diatur di parent
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

// --- Komponen Kartu Psikolog (Diperbarui untuk handle klik) ---
const PsikologCard = ({ counselor, onClick }) => {
    // Ambil 2 spesialisasi pertama, atau default jika tidak ada
    const specializationTags = counselor.spesialisasi?.slice(0, 2) || [
        "Spesialisasi",
    ];
    // Tambahkan tag 'lainnya' jika > 2
    if (counselor.spesialisasi?.length > 2) {
        specializationTags.push(
            `${counselor.spesialisasi.length - 2}+ lainnya`
        );
    }

    return (
        <div
            onClick={onClick} // Tambahkan onClick handler
            className="bg-white p-3 rounded-2xl border-2 border-cyan-100 shadow-sm flex items-center gap-4 transition-transform duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer" // Sedikit perbesar hover
        >
            <img
                src={counselor.avatar} // Dinamis dari accessor
                alt={counselor.name}
                className="w-20 h-20 rounded-lg object-cover"
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
                        {counselor.universitas || "Universitas"}
                    </p>{" "}
                    {/* Default jika null */}
                </div>
                {/* Tampilkan spesialisasi sebagai tags */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    {specializationTags.map((tag, index) => (
                        <span
                            key={index}
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                // Tag terakhir ('X+ lainnya') dibuat beda warna
                                index === specializationTags.length - 1 &&
                                tag.includes("+")
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
};

export default function FindCounselorPage() {
    // Rename komponen
    const location = useLocation();
    const navigate = useNavigate();
    const { serviceId, serviceName, tempatId, method } = location.state || {}; // Ambil data dari state navigasi

    const [counselors, setCounselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch daftar konselor
    useEffect(() => {
        const fetchCounselors = async () => {
            try {
                setLoading(true);
                // Tambahkan query parameter serviceId jika ada (untuk filter di masa depan)
                const response = await apiClient.get(
                    `/api/booking/counselors`,
                    {
                        // params: { serviceId } // Uncomment jika backend sudah bisa filter
                    }
                );
                setCounselors(response.data);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data konselor:", err);
                setError("Gagal memuat daftar konselor.");
            } finally {
                setLoading(false);
            }
        };
        // Pastikan serviceId ada sebelum fetch
        // if (serviceId) {
        fetchCounselors();
        // } else {
        //     setError("Jenis layanan tidak valid.");
        //     setLoading(false);
        // }
    }, [serviceId]); // Re-fetch jika serviceId berubah (meskipun seharusnya tidak)

    // Handle saat kartu psikolog diklik
    const handleSelectCounselor = (counselorId, counselorName) => {
        // Arahkan ke halaman berikutnya (misal: pilih jadwal), bawa semua data
        console.log("Navigasi ke pilih jadwal dengan data:", {
            serviceId,
            serviceName,
            tempatId, // Akan null jika online
            method, // 'Online' atau 'Offline'
            counselorId,
            counselorName,
        });
        // Ganti '/booking/select-schedule' dengan path halaman berikutnya
        navigate("/booking/select-schedule", {
            // Ganti path jika perlu
            state: {
                serviceId,
                serviceName,
                tempatId,
                method,
                counselorId,
                counselorName,
            },
        });
    };

    // Tentukan URL kembali berdasarkan method
    const backUrl = method === "Offline" ? "/booking/in-person" : "/booking";

    return (
        // Gunakan bg-sky-50 (lebih terang dari cyan-50)
        <div className="bg-sky-50 min-h-screen">
            {" "}
            {/* min-h-screen */}
            {/* Header Halaman */}
            <header className="bg-cyan-400 p-4 flex items-center sticky top-0 z-10 text-white rounded-b-2xl shadow-lg">
                <Link
                    to={backUrl}
                    state={location.state}
                    className="p-2 -ml-2 text-white"
                >
                    {" "}
                    {/* Warna ikon putih */}
                    <BackArrowIcon stroke="currentColor" />{" "}
                    {/* Pakai stroke="currentColor" */}
                </Link>
                <h1 className="text-lg font-bold text-center flex-grow -ml-4">
                    Pilih Psikolog {serviceName ? `(${serviceName})` : ""}{" "}
                    {/* Tampilkan nama layanan */}
                </h1>
                <div className="w-6"></div> {/* Spacer */}
            </header>
            {/* Konten Utama */}
            <main className="p-4 space-y-3">
                {" "}
                {/* Kurangi space y */}
                {loading && (
                    <div className="text-center text-gray-500 py-10">
                        Memuat konselor...
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 py-10">
                        {error}
                    </div>
                )}
                {!loading &&
                    !error &&
                    (counselors.length > 0 ? (
                        counselors.map((counselor) => (
                            <PsikologCard
                                key={counselor.id}
                                counselor={counselor}
                                onClick={() =>
                                    handleSelectCounselor(
                                        counselor.id,
                                        counselor.name
                                    )
                                } // Tambahkan onClick
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">
                            Tidak ada konselor yang tersedia saat ini.
                        </p>
                    ))}
            </main>
        </div>
    );
}
