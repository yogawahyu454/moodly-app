import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../../api/axios"; // Sesuaikan path

// Icon Panah Kiri (SVG)
function ArrowLeftIcon(props) {
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

// Icon Lokasi (SVG)
function MapPinIcon(props) {
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
        </svg>
    );
}

export default function InPersonPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId, serviceName } = location.state || {}; // Ambil data service dari state

    const [tempatList, setTempatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTempatId, setSelectedTempatId] = useState(null);

    // Fetch data tempat konseling
    useEffect(() => {
        const fetchTempatKonseling = async () => {
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

    // Handle pemilihan tempat
    const handleSelectTempat = (id) => {
        setSelectedTempatId(id);
    };

    // Handle klik tombol "Lanjut"
    const handleNext = () => {
        if (!selectedTempatId) {
            alert("Silakan pilih tempat konseling terlebih dahulu."); // Ganti dengan modal
            return;
        }
        // Arahkan ke halaman pilih psikolog, kirim data service DAN tempat ID
        navigate("/booking/find-counselor", {
            state: {
                serviceId: serviceId,
                serviceName: serviceName,
                tempatId: selectedTempatId, // Kirim ID tempat yang dipilih
                method: "Offline", // Tandai sebagai offline
            },
        });
    };

    return (
        <>
            {/* Header */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)} // Tombol kembali
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-800 mx-auto pr-8">
                    Pilih Tempat Konseling
                </h1>
            </header>

            {/* Konten */}
            <main className="p-4 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
                {" "}
                {/* Adjust min-height based on header */}
                {loading && (
                    <div className="text-center py-5">Memuat tempat...</div>
                )}
                {error && (
                    <div className="text-center py-5 text-red-500">{error}</div>
                )}
                {!loading && !error && (
                    <div className="space-y-3 flex-grow">
                        {tempatList.length > 0 ? (
                            tempatList.map((tempat) => (
                                <button
                                    key={tempat.id}
                                    onClick={() =>
                                        handleSelectTempat(tempat.id)
                                    }
                                    className={`w-full text-left p-4 bg-white rounded-lg border-2 transition-colors duration-200 flex items-start space-x-3
                                        ${
                                            selectedTempatId === tempat.id
                                                ? "border-sky-500 ring-2 ring-sky-200"
                                                : "border-gray-200 hover:border-sky-300"
                                        }
                                    `}
                                >
                                    <MapPinIcon className="w-6 h-6 text-sky-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {tempat.nama_tempat}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {tempat.alamat}
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
                {/* Tombol Lanjut (Sticky Bottom) */}
                {!loading && !error && tempatList.length > 0 && (
                    <div className="mt-6 sticky bottom-4">
                        <button
                            onClick={handleNext}
                            disabled={!selectedTempatId}
                            className="w-full py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors disabled:bg-gray-400"
                        >
                            Lanjut Pilih Psikolog
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}
