import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import Link
import apiClient from "../../../api/axios"; // Sesuaikan path

// --- Helper Format Tanggal ---
function formatDate(dateString) {
    try {
        const datePart = dateString.split("T")[0];
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(datePart)
            .toLocaleDateString("id-ID", options)
            .replace(/\//g, " - ");
    } catch (e) {
        return dateString; // fallback
    }
}

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

export default function ReschedulePage() {
    // Rename komponen
    const { id } = useParams(); // Ambil ID booking dari URL
    const navigate = useNavigate();

    // State untuk data booking
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk form
    const [alasan, setAlasan] = useState("");
    const [tanggalBaru, setTanggalBaru] = useState("");
    const [catatan, setCatatan] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Alasan reschedule
    const reasons = [
        "Ada acara keluarga",
        "Jadwal bentrok",
        "Sakit",
        "Lainnya",
    ];

    // Fetch data booking saat komponen dimuat
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/history/${id}`);
                setBookingData(response.data);
                // Set tanggal input minimal ke hari ini
                const today = new Date().toISOString().split("T")[0];
                setTanggalBaru(today);
            } catch (err) {
                console.error("Gagal mengambil data booking:", err);
                setError("Gagal memuat data booking.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookingData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!alasan || !tanggalBaru) {
            alert("Silakan pilih alasan dan tanggal baru."); // Ganti dengan modal
            return;
        }
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError(null); // Reset error

        try {
            // Logika untuk mengirim data ganti jadwal ke API
            const response = await apiClient.patch(
                `/api/history/${id}/reschedule`,
                {
                    alasan: alasan,
                    tanggalBaru: tanggalBaru,
                    catatan: catatan,
                }
            );

            alert(response.data.message || "Permintaan ganti jadwal terkirim!"); // Tampilkan pesan dari API
            navigate("/history"); // Kembali ke halaman riwayat
        } catch (err) {
            console.error("Gagal mengajukan ganti jadwal:", err);
            const apiError =
                err.response?.data?.message ||
                "Gagal mengirim permintaan. Coba lagi.";
            setError(apiError); // Tampilkan error API ke user
        } finally {
            setIsSubmitting(false);
        }
    };

    // Tampilkan loading atau error
    if (loading) {
        return <div className="p-4 text-center">Memuat data booking...</div>;
    }
    // Error spesifik jika booking tidak ditemukan (meskipun seharusnya tidak terjadi jika navigasi benar)
    if (!bookingData && !error) {
        return (
            <div className="p-4 text-center">Data booking tidak ditemukan.</div>
        );
    }
    // Jangan tampilkan form jika ada error fetch awal
    if (error && !isSubmitting) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    // Ekstrak data konselor setelah loading selesai
    const konselor = bookingData?.konselor || {};
    const specialization = konselor.spesialisasi
        ? konselor.spesialisasi[0]
        : "Spesialisasi";

    return (
        <>
            {/* Header Khusus */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-800 mx-auto pr-8">
                    Ganti Jadwal Konseling
                </h1>
            </header>

            {/* Konten Halaman */}
            <div className="flex-1 flex flex-col bg-sky-50">
                {/* Info Psikolog (Dinamis) */}
                <div className="p-4 m-4 bg-white rounded-lg shadow-md flex items-center space-x-3">
                    <img
                        src={konselor.avatar} // Dinamis
                        alt={konselor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-sky-500"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-800">
                            {konselor.name || "Nama Konselor"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Spesialis: {specialization}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {formatDate(bookingData.tanggal_konsultasi)} |{" "}
                            {bookingData.jam_konsultasi}
                        </p>
                    </div>
                </div>

                {/* Form Ganti Jadwal */}
                <form className="flex-1 p-4 pt-0" onSubmit={handleSubmit}>
                    {/* Tampilkan error submit jika ada */}
                    {error && isSubmitting && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Pilih Alasan Ganti Jadwal*
                            </label>
                            <select
                                value={alasan}
                                onChange={(e) => setAlasan(e.target.value)}
                                required // Wajib diisi
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                                disabled={isSubmitting}
                            >
                                <option value="" disabled>
                                    -- Pilih Alasan --
                                </option>
                                {reasons.map((reason, index) => (
                                    <option key={index} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Tanggal Baru*
                            </label>
                            <input
                                type="date"
                                value={tanggalBaru}
                                onChange={(e) => setTanggalBaru(e.target.value)}
                                required // Wajib diisi
                                min={new Date().toISOString().split("T")[0]} // Tanggal minimal hari ini
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Catatan (Opsional)
                            </label>
                            <textarea
                                rows="4"
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                                placeholder="Contoh: Saya mohon maaf..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white resize-none"
                                disabled={isSubmitting}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 pb-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors disabled:bg-gray-400"
                        >
                            {isSubmitting
                                ? "Mengirim..."
                                : "Ajukan Ganti Jadwal"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
