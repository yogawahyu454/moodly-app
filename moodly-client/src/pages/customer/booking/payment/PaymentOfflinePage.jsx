import React, { useState, useEffect } from "react"; // Tambah useEffect
import { Link, useNavigate, useLocation } from "react-router-dom";
// --- PERBAIKAN: Koreksi path relatif ---
import apiClient from "../../../../api/axios"; // Sesuaikan path jika perlu
// --- AKHIR PERBAIKAN ---

// --- Komponen Ikon ---
// ... (Ikon tetap sama)
const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" // Warna diatur dari parent
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white group-hover:text-gray-100"
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);
const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
            clipRule="evenodd"
        />
    </svg>
);
const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
        />
    </svg>
);
const LocationMarkerIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
        />
    </svg>
);
const InformationCircleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
        />
    </svg>
);
// --- Akhir Komponen Ikon ---

// --- PERBAIKAN: Ubah nama komponen jadi PaymentOfflinePage ---
export default function PaymentOfflinePage() {
    const navigate = useNavigate();
    const location = useLocation();
    // --- PERBAIKAN: Ambil bookingData dari state navigasi ---
    const { bookingData } = location.state || {};
    const displayData = bookingData?.displayData || {}; // Ambil displayData
    const apiPayload = bookingData?.apiPayload || {}; // Ambil apiPayload
    // --- AKHIR PERBAIKAN ---

    const [agreed, setAgreed] = useState(false); // State untuk checkbox persetujuan
    // --- PERBAIKAN: State untuk loading dan error ---
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // --- AKHIR PERBAIKAN ---

    // --- PERBAIKAN: Efek untuk mengambil detail tempat jika offline ---
    const [tempatDetail, setTempatDetail] = useState(null);
    useEffect(() => {
        const fetchTempatDetail = async () => {
            // Hanya fetch jika ini offline dan ada tempatId
            if (displayData.method === "Tatap Muka" && apiPayload.tempatId) {
                try {
                    const response = await apiClient.get(
                        `/api/booking/tempat-konseling/${apiPayload.tempatId}`
                    );
                    setTempatDetail(response.data); // Simpan detail tempat
                } catch (err) {
                    console.error("Gagal mengambil detail tempat:", err);
                    // Mungkin tampilkan error kecil di bagian alamat?
                }
            }
        };

        if (bookingData) {
            // Pastikan bookingData ada sebelum fetch
            fetchTempatDetail();
        }
    }, [bookingData, displayData.method, apiPayload.tempatId]); // Tambahkan dependensi
    // --- AKHIR PERBAIKAN ---

    // --- PERBAIKAN: Gunakan data dinamis dari displayData ---
    const bookingDetails = {
        bookingCode: "...", // Akan didapat setelah booking berhasil dibuat
        bookingDate: new Date()
            .toLocaleDateString("id-ID", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .split("/")
            .join(" - "), // Tanggal hari ini
        psychologistName: displayData.counselorName || "Nama Psikolog",
        psychologistImage:
            displayData.counselorImage ||
            "https://placehold.co/48x48/EBF8FF/7F9CF5?text=P",
        specialty: `Spesialisasi : ${displayData.counselorSpecialty || "-"}`,
        university: displayData.counselorUniversity || "-",
        scheduleType: displayData.method || "Metode",
        scheduleDate: displayData.scheduleDateDisplay || "Tanggal Jadwal",
        scheduleTime: displayData.scheduleTime
            ? `${displayData.scheduleTime} WIB`
            : "Jam Jadwal",
        locationName:
            displayData.tempatName ||
            (displayData.method !== "Tatap Muka"
                ? "Online"
                : "Memuat Lokasi..."),
        locationAddress:
            tempatDetail?.alamat ||
            (displayData.method !== "Tatap Muka" ? "-" : "Memuat Alamat..."), // Ambil dari tempatDetail
        consultationFee: displayData.consultationFee || 0,
        serviceFee: displayData.serviceFee || 0,
    };
    // --- AKHIR PERBAIKAN ---

    const totalPayment =
        bookingDetails.consultationFee + bookingDetails.serviceFee;

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    // --- PERBAIKAN: Fungsi untuk mengirim data booking ke API ---
    const handleContinue = async () => {
        if (!agreed) {
            setError("Anda harus menyetujui syarat dan ketentuan.");
            return;
        }
        if (!bookingData || !apiPayload) {
            setError("Data booking tidak lengkap, silakan kembali dan ulangi.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log("Mengirim data booking:", apiPayload);
            const response = await apiClient.post(
                "/api/booking/create",
                apiPayload
            );
            const createdBooking = response.data; // Data booking yang baru dibuat (termasuk ID)
            console.log("Booking berhasil dibuat:", createdBooking);

            // Navigasi ke halaman instruksi pembayaran offline atau halaman sukses
            // Kirim ID booking baru agar halaman selanjutnya tahu booking mana yang dimaksud
            navigate("/booking/payment-instructions-offline", {
                replace: true, // Ganti history agar tidak bisa kembali ke halaman ini
                state: {
                    bookingId: createdBooking.id,
                    totalPayment: totalPayment,
                }, // Kirim ID dan total
            });
        } catch (err) {
            console.error("Gagal membuat booking:", err);
            const errorMessage =
                err.response?.data?.message ||
                "Gagal membuat pesanan. Silakan coba lagi.";
            // Cek jika error validasi
            if (err.response?.status === 422 && err.response?.data?.errors) {
                // Bisa proses error validasi lebih detail jika perlu
                setError(
                    "Data yang dimasukkan tidak valid. Mohon periksa kembali."
                );
            } else {
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };
    // --- AKHIR PERBAIKAN ---

    // Format Rupiah
    const formatCurrency = (amount) => {
        if (typeof amount !== "number") return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // --- PERBAIKAN: Handle jika bookingData tidak ada ---
    if (!bookingData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <p className="text-red-500 mb-4">
                    Data booking tidak ditemukan.
                </p>
                <button
                    onClick={() => navigate("/booking")} // Arahkan kembali ke awal alur booking
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
                >
                    Kembali ke Pemilihan Layanan
                </button>
            </div>
        );
    }
    // --- AKHIR PERBAIKAN ---

    return (
        <div className="bg-gray-50 min-h-full font-sans">
            {/* Header Halaman */}
            <header className="bg-cyan-400 p-4 pt-6 flex items-center sticky top-0 z-20 text-white rounded-b-2xl shadow-lg">
                <button
                    onClick={handleBack}
                    className="p-2 -ml-2 mr-2 rounded-full hover:bg-cyan-500 group transition-colors"
                    aria-label="Kembali"
                >
                    <BackArrowIcon />
                </button>
                {/* --- PERBAIKAN: Judul dinamis --- */}
                <h1 className="text-lg font-bold text-center flex-grow -translate-x-4">
                    Konfirmasi Pesanan {/* Ganti judul */}
                </h1>
                {/* --- AKHIR PERBAIKAN --- */}
                <div className="w-8"></div> {/* Spacer */}
            </header>

            {/* Konten Utama */}
            <main className="relative p-4 pb-28">
                {/* Timer Pembayaran (Mungkin tidak relevan untuk offline?) */}
                {/* <div className="bg-white p-3 rounded-lg shadow mb-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                        Selesaikan Pembayaran dalam
                    </span>
                    <span className="text-sm font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded">
                        59 : 54
                    </span>
                </div> */}

                {/* --- PERBAIKAN: Tampilkan pesan error jika ada --- */}
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                        role="alert"
                    >
                        <strong className="font-bold">Oops!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                {/* --- AKHIR PERBAIKAN --- */}

                {/* Detail Booking */}
                <div className="bg-white p-4 rounded-lg shadow space-y-4">
                    {/* Info Kode Booking (Tampilkan setelah berhasil) */}
                    {/* <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span className="text-sm font-semibold text-gray-800">
                            {bookingDetails.bookingCode}
                        </span>
                        <span className="text-xs text-gray-400">
                            {bookingDetails.bookingDate}
                        </span>
                    </div> */}

                    {/* Info Psikolog */}
                    <div className="flex items-center gap-3">
                        <img
                            src={bookingDetails.psychologistImage}
                            alt={bookingDetails.psychologistName}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://placehold.co/48x48/EBF8FF/7F9CF5?text=P";
                            }}
                        />
                        <div>
                            <h3 className="font-semibold text-sm text-gray-800">
                                {bookingDetails.psychologistName}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {bookingDetails.university}
                            </p>
                            <p className="text-xs text-gray-500">
                                {bookingDetails.specialty}
                            </p>
                        </div>
                    </div>

                    {/* Info Jadwal */}
                    <div className="space-y-1 pt-3 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                            Jadwal Konsultasi
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">
                                {bookingDetails.scheduleType}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon />
                            <p className="text-sm text-gray-700">
                                {bookingDetails.scheduleDate}
                            </p>{" "}
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon />
                            <p className="text-sm text-gray-700">
                                {bookingDetails.scheduleTime}
                            </p>
                        </div>
                    </div>

                    {/* Info Lokasi (Hanya jika Tatap Muka) */}
                    {displayData.method === "Tatap Muka" && (
                        <div className="space-y-1 pt-3 border-t border-gray-100">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                                Lokasi
                            </h4>
                            <div className="flex items-start gap-2">
                                <LocationMarkerIcon className="mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        {bookingDetails.locationName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {bookingDetails.locationAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Rincian Biaya */}
                    <div className="space-y-1 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">
                                Biaya Konsultasi (
                                {displayData.durationText || ""}){" "}
                                {/* Tampilkan durasi */}
                            </p>
                            <p className="text-sm text-gray-700">
                                {formatCurrency(bookingDetails.consultationFee)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">
                                Biaya Layanan
                            </p>
                            <p className="text-sm text-gray-700">
                                {formatCurrency(bookingDetails.serviceFee)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                            <p className="text-sm font-bold text-gray-800">
                                Total Pembayaran
                            </p>
                            <p className="text-sm font-bold text-cyan-600">
                                {formatCurrency(totalPayment)}
                            </p>
                        </div>
                    </div>

                    {/* Persetujuan */}
                    <div className="flex items-start space-x-2 pt-4">
                        <input
                            type="checkbox"
                            id="agreement"
                            checked={agreed}
                            onChange={(e) => {
                                setAgreed(e.target.checked);
                                if (e.target.checked) setError(null); // Hapus error jika dicentang
                            }}
                            className="mt-1 h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <label
                            htmlFor="agreement"
                            className="text-xs text-gray-500"
                        >
                            Dengan ini kamu menyetujui syarat dan ketentuan{" "}
                            <Link
                                to="/peraturan-konseling" // Ganti ke path yang benar jika perlu
                                className="text-cyan-600 hover:underline font-medium"
                                target="_blank" // Buka di tab baru
                            >
                                Peraturan Konseling
                            </Link>
                        </label>
                    </div>

                    {/* Bantuan */}
                    <div className="flex justify-center pt-2">
                        <Link
                            to="/help" // Ganti ke path bantuan
                            className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
                        >
                            <InformationCircleIcon /> Butuh Bantuan ?
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer Total & Tombol Lanjutkan */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-20 flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-500">Total Pembayaran</p>
                    <p className="text-lg font-bold text-cyan-600">
                        {formatCurrency(totalPayment)}
                    </p>
                </div>
                <button
                    onClick={handleContinue}
                    disabled={!agreed || isLoading} // Nonaktifkan jika belum setuju atau sedang loading
                    className={`px-6 py-3 rounded-lg font-semibold text-white shadow transition-colors duration-200 flex items-center justify-center min-w-[120px] ${
                        // Tambah min-w
                        agreed && !isLoading
                            ? "bg-cyan-500 hover:bg-cyan-600 active:scale-95"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    {/* --- PERBAIKAN: Tampilkan Loading --- */}
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        "Lanjutkan"
                    )}
                    {/* --- AKHIR PERBAIKAN --- */}
                </button>
            </div>
        </div>
    );
}
