import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Helper Format Tanggal ---
function formatDate(dateString) {
    try {
        // Format tanggal konsultasi (YYYY-MM-DD)
        const datePart = dateString.split("T")[0];
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(datePart)
            .toLocaleDateString("id-ID", options)
            .replace(/\//g, " - ");
    } catch (e) {
        return dateString; // fallback
    }
}

// --- Komponen Ikon (Dibutuhkan oleh halaman ini) ---

// Ikon "Kalender"
function CalendarIcon(props) {
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
        </svg>
    );
}

// Ikon "Video"
function VideoCameraIcon(props) {
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
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z"
            />
        </svg>
    );
}

// Ikon "Jam"
function ClockIcon(props) {
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
}

// Ikon "Chat"
function ChatBubbleLeftIcon(props) {
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
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-2.138a.562.562 0 0 1 .865-.501l3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
        </svg>
    );
}

// Ikon "Telepon" (Voice Call)
function PhoneIcon(props) {
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
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
            />
        </svg>
    );
}

// Helper Komponen Ikon Metode
const MethodIcon = ({ method, className }) => {
    switch (method) {
        case "Video Call":
            return <VideoCameraIcon className={className} />;
        case "Voice Call":
            return <PhoneIcon className={className} />;
        case "Chat":
            return <ChatBubbleLeftIcon className={className} />;
        default:
            return null;
    }
};

// --- Komponen Halaman Detail Pembatalan ---
export default function CancelDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data sesi saat komponen dimuat
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/history/${id}`);
                setBookingData(response.data);
            } catch (err) {
                console.error("Gagal mengambil data booking:", err);
                setError("Gagal memuat data.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookingData();
    }, [id]);

    if (loading) {
        return <div className="p-4 text-center">Memuat data...</div>;
    }
    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }
    if (!bookingData) {
        return (
            <div className="p-4 text-center">Data booking tidak ditemukan.</div>
        );
    }

    // Ekstrak data konselor dengan aman
    const konselor = bookingData.konselor || {};
    const specialization = konselor.spesialisasi
        ? konselor.spesialisasi[0]
        : "Spesialisasi";
    const statusColor =
        bookingData.status_pesanan === "Batal"
            ? "text-red-500"
            : "text-gray-500";
    // Tanggal pembatalan adalah 'updated_at'
    const cancelledAt = formatDate(bookingData.updated_at);

    return (
        // Background abu-abu
        <div className="bg-gray-50 min-h-screen">
            {/* Header Halaman */}
            <div className="p-4 flex items-center">
                <button onClick={() => navigate(-1)} className="text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <h1 className="text-lg font-bold text-center text-gray-800 flex-grow">
                    Detail Pembatalan
                </h1>
                <div className="w-6"></div> {/* Spacer */}
            </div>

            {/* Konten Halaman */}
            <div className="px-4 pb-4">
                {/* 1. Kartu Info Psikolog */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                    {/* Bagian atas: Avatar + Info */}
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src={konselor.avatar} // Dinamis
                            alt={konselor.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {konselor.name || "Nama Konselor"}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {specialization}
                            </p>
                        </div>
                    </div>

                    {/* Bagian tengah: Detail Sesi (ikon-ikon) */}
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                        <div className="flex items-center space-x-1.5">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span>
                                {formatDate(bookingData.tanggal_konsultasi)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            <span>{bookingData.jam_konsultasi}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <MethodIcon
                                method={bookingData.metode_konsultasi}
                                className="w-4 h-4 text-gray-400"
                            />
                            <span className="text-sky-500 font-semibold">
                                {bookingData.metode_konsultasi}
                            </span>
                        </div>
                    </div>

                    {/* Bagian bawah: Status */}
                    <div className="text-center">
                        <span className={`font-semibold ${statusColor}`}>
                            {bookingData.status_pesanan}
                        </span>
                    </div>
                </div>

                {/* 2. Kartu Alasan Pembatalan */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        Pembatalan
                    </h3>
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                        <p className="text-sm text-gray-700">
                            {bookingData.alasan_pembatalan ||
                                "Tidak ada alasan."}
                        </p>
                        <div className="flex items-center space-x-1.5 text-red-500 mt-2">
                            <ClockIcon className="w-4 h-4" />
                            <span className="text-xs font-semibold">
                                Dibatalkan pada tanggal {cancelledAt}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Kartu Catatan */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        Catatan
                    </h3>
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                        <p className="text-sm text-gray-700">
                            {bookingData.catatan_pembatalan ||
                                "Tidak ada catatan."}
                        </p>
                    </div>
                </div>

                {/* 4. Tombol Aksi (NON-STICKY) */}
                <div className="mt-4">
                    <Link
                        to="/history/reschedule" // Arahkan ke halaman reschedule
                        className="w-full block text-center bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        Jadwalkan Ulang
                    </Link>
                </div>
            </div>
        </div>
    );
}
