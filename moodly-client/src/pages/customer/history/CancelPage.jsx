import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import Link
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Helper Format Tanggal ---
function formatDate(dateString) {
    try {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString)
            .toLocaleDateString("id-ID", options)
            .replace(/\//g, " - ");
    } catch (e) {
        return dateString; // fallback
    }
}

// Komponen untuk memilih alasan pembatalan
const CancellationPage = () => {
    const { id } = useParams(); // ID dari sesi yang dibatalkan
    const navigate = useNavigate();

    const [sessionData, setSessionData] = useState(null); // Untuk data sesi
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedReason, setSelectedReason] = useState(""); // Untuk alasan pembatalan
    const [note, setNote] = useState(""); // Catatan pembatalan
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Daftar alasan pembatalan
    const reasons = [
        "Ingin menjadwalkan ulang sesi",
        "Psikolog tidak responsif",
        "Saya tidak membutuhkan sesi ini lagi",
        "Jadwal saya bentrok",
        "Lainnya",
    ];

    // Fetch data sesi saat komponen dimuat
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/history/${id}`);
                setSessionData(response.data);
            } catch (err) {
                console.error("Gagal mengambil data sesi:", err);
                setError("Gagal memuat data sesi.");
            } finally {
                setLoading(false);
            }
        };
        fetchSessionData();
    }, [id]);

    // Fungsi untuk menangani pembatalan
    const handleCancel = async () => {
        if (!selectedReason) {
            alert("Silakan pilih alasan pembatalan."); // Ganti dengan modal custom jika ada
            return;
        }
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            // Kirim data pembatalan ke API
            await apiClient.patch(`/api/history/${id}/cancel`, {
                alasan: selectedReason,
                catatan: note,
            });

            // Arahkan kembali ke riwayat setelah berhasil
            navigate("/history");
        } catch (err) {
            console.error("Gagal membatalkan sesi:", err);
            setError("Gagal membatalkan sesi. Coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Tampilkan loading atau error
    if (loading) {
        return <div className="p-4 text-center">Memuat data sesi...</div>;
    }
    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }
    if (!sessionData) {
        return <div className="p-4 text-center">Sesi tidak ditemukan.</div>;
    }

    // Ambil data konselor
    const konselor = sessionData.konselor || {};
    const specialization = konselor.spesialisasi
        ? konselor.spesialisasi[0]
        : "Spesialisasi";

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center mb-4">
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
                <h1 className="text-xl font-bold text-center text-gray-800 flex-grow">
                    Pembatalan
                </h1>
                <div className="w-6"></div> {/* Spacer */}
            </div>

            {/* Informasi Sesi (Dinamis) */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={konselor.avatar} // Dinamis
                        alt={konselor.name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="font-bold text-gray-900">
                            {konselor.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {specialization}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mt-2">
                            <span>
                                {formatDate(sessionData.tanggal_konsultasi)}
                            </span>
                            <span>{sessionData.jam_konsultasi}</span>
                        </div>
                        <span className="text-xs text-blue-600 font-semibold">
                            {sessionData.metode_konsultasi}
                        </span>
                    </div>
                </div>
            </div>

            {/* Pilih Alasan Pembatalan */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Pilih Alasan Pembatalan
                </label>
                <select
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    disabled={isSubmitting}
                >
                    <option value="" disabled>
                        Pilih alasan...
                    </option>
                    {reasons.map((reason, index) => (
                        <option key={index} value={reason}>
                            {reason}
                        </option>
                    ))}
                </select>
            </div>

            {/* Catatan Pembatalan */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Catatan
                </label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    rows={4}
                    placeholder="Masukkan catatan Anda (opsional)..."
                    disabled={isSubmitting}
                />
            </div>

            {/* Tombol Batalkan */}
            <div className="text-center">
                <button
                    onClick={handleCancel}
                    disabled={isSubmitting || !selectedReason}
                    className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                    {isSubmitting ? "Memproses..." : "Batalkan Sesi"}
                </button>
            </div>
        </div>
    );
};

export default CancellationPage;
