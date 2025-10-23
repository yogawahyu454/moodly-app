import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../api/axios"; // Sesuaikan path jika perlu
import { useAuth } from "../../context/AuthContext"; // Sesuaikan path jika perlu

// --- Fungsi Helper untuk Format Mata Uang ---
const formatRupiah = (number) => {
    if (typeof number !== "number") {
        number = 0;
    }
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

// --- Komponen Ikon (Tetap Sama) ---
const BalanceIcon = () => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        {/* ... (kode SVG ikon) ... */}
        <path
            d="M2 20V11C2 9.34315 3.34315 8 5 8H19C20.6569 8 22 9.34315 22 11V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 2C9.23858 2 7 4.23858 7 7V8H17V7C17 4.23858 14.7614 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const TransferIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        {/* ... (kode SVG ikon) ... */}
        <rect
            width="18"
            height="18"
            rx="2"
            transform="matrix(1 0 0 -1 3 21)"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M8 14L11 11L14 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 11V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 10L13 7L10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13 13V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const ArrowRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cyan-500"
    >
        {/* ... (kode SVG ikon) ... */}
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);
const BuildingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
    >
        {/* ... (kode SVG ikon) ... */}
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
);
const ThumbsUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
    >
        {/* ... (kode SVG ikon) ... */}
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
);

// --- Komponen Pembantu (Dibuat Dinamis) ---
const SectionHeader = ({ title, to = "#" }) => (
    <div className="flex justify-between items-center pt-6 px-4">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <Link to={to} className="text-sm font-semibold text-cyan-500">
            Lihat Semua
        </Link>
    </div>
);

const ServiceCard = ({ service, highlighted = false }) => {
    const navigate = useNavigate();

    const handleBook = () => {
        // Arahkan ke halaman booking, kirim state jenis layanan
        navigate("/booking", {
            state: {
                selectedService: service.id,
                serviceName: service.jenis_konseling, // <-- PERBAIKAN: dari 'nama'
            },
        });
    };

    return (
        <div
            className={`bg-white p-3 rounded-2xl border-2 ${
                highlighted ? "border-cyan-400" : "border-gray-200"
            } shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center`}
        >
            <div className="w-16 h-16 flex items-center justify-center">
                <img
                    src={
                        service.image_url ||
                        "https://placehold.co/64x64/EBF4FF/3B82F6?text=?"
                    }
                    alt={service.jenis_konseling} // <-- PERBAIKAN: dari 'nama'
                    className="w-16 h-16 object-contain" // Tambah object-contain
                />
            </div>
            <p className="font-semibold text-gray-700 mt-2 text-sm leading-tight">
                {service.jenis_konseling} {/* <-- PERBAIKAN: dari 'nama' */}
            </p>
            <button
                onClick={handleBook}
                className="mt-4 flex items-center gap-1.5 text-xs font-bold text-gray-800"
            >
                <span>Book</span> <ArrowRightIcon />
            </button>
        </div>
    );
};

const CounselorCard = ({ counselor }) => (
    <Link
        to={`/booking/find-counselor?counselor=${counselor.id}`}
        className="relative flex-shrink-0 w-[280px] md:w-full bg-white border-2 border-gray-200 rounded-2xl shadow-sm p-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
    >
        <div className="flex gap-4">
            <img
                src={
                    counselor.avatar ||
                    `https://ui-avatars.com/api/?name=${counselor.name}&background=EBF4FF&color=3B82F6&bold=true`
                }
                alt={counselor.name}
                className="w-24 h-32 rounded-xl object-cover"
            />
            <div className="space-y-1.5 flex flex-col">
                <h4 className="font-bold text-base text-gray-800 leading-tight">
                    {counselor.name}
                </h4>
                <div className="flex items-center gap-1.5">
                    <BuildingIcon />
                    <p className="text-xs text-gray-500">
                        {counselor.universitas || "Universitas"}
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <ThumbsUpIcon />
                    {/* <-- PERBAIKAN: Tampilkan rating desimal --> */}
                    <p className="text-xs text-gray-500">
                        {counselor.rating
                            ? `${counselor.rating} / 5.0`
                            : "Baru"}
                    </p>
                </div>
                <p className="text-xs text-gray-500 pt-1">
                    {/* <-- PERBAIKAN: Ambil spesialisasi pertama dari array --> */}
                    Spesialisasi: {counselor.spesialisasi?.[0] || "Umum"}
                </p>
            </div>
        </div>
    </Link>
);

// --- Komponen Halaman Beranda (Diganti menjadi HomePage) ---
export default function HomePage() {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [counselors, setCounselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // <-- PERBAIKAN: Panggil endpoint baru -->
                const response = await apiClient.get("/api/beranda-data");

                setServices(response.data.services);
                setCounselors(response.data.counselors);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data beranda:", err);
                setError("Gagal memuat data. Coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter layanan berdasarkan tipe
    // <-- PERBAIKAN: Ubah 'online' (lowercase) menjadi 'Online' (Capital) -->
    const onlineServices = services.filter((s) => s.tipe_layanan === "Online");
    const offlineServices = services.filter(
        (s) => s.tipe_layanan === "Offline"
    );

    if (loading) {
        return <div className="p-4 text-center">Loading data...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="space-y-4 bg-white pb-6">
            {/* Promo Banner */}
            <div className="px-4 mt-4">
                {/* ... (Banner statis tidak berubah) ... */}
                <div className="bg-cyan-400 rounded-2xl text-white relative overflow-hidden h-40">
                    <div className="absolute -left-4 -bottom-2 h-44 w-auto z-0">
                        <img
                            src="images/beranda/dokter1.png" // Gambar ini bisa tetap statis
                            alt="Dokter"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <div className="absolute left-[35%] top-1/2 -translate-y-1/2 w-3/5 z-10">
                        <h2 className="font-bold text-lg leading-tight">
                            Tumpahkan isi hatimu,{" "}
                            <span className="font-extrabold">MOODLY</span>
                            <br />
                            temukan solusi dari masalahmu.
                        </h2>
                        <Link
                            to="/booking"
                            className="mt-3 inline-block bg-white text-cyan-500 font-bold py-2 px-6 rounded-full text-sm shadow-md transform transition-transform duration-300 hover:scale-105 active:scale-95"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Balance Card (Dinamis) */}
            <div className="px-4">
                <div className="bg-cyan-500 rounded-2xl p-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <BalanceIcon />
                        <p className="text-2xl font-bold">
                            {formatRupiah(user?.balance)}{" "}
                            {/* <-- PERBAIKAN: Kolom 'balance' sudah ada --> */}
                        </p>
                    </div>
                    <TransferIcon />
                </div>
            </div>

            {/* Services Sections (Dinamis) */}
            <div>
                <SectionHeader title="Online" to="/booking?type=Online" />
                <div className="grid grid-cols-2 gap-4 mt-2 px-4">
                    {onlineServices.length > 0 ? (
                        onlineServices
                            .slice(0, 2) // Batasi hanya 2
                            .map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))
                    ) : (
                        <p className="text-gray-500 col-span-2 text-sm px-2">
                            Layanan online belum tersedia.
                        </p>
                    )}
                </div>
            </div>

            <div>
                <SectionHeader title="Tatap Muka" to="/booking?type=Offline" />
                <div className="grid grid-cols-2 gap-4 mt-2 px-4">
                    {offlineServices.length > 0 ? (
                        offlineServices
                            .slice(0, 2) // Batasi hanya 2
                            .map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))
                    ) : (
                        <p className="text-gray-500 col-span-2 text-sm px-2">
                            Layanan tatap muka belum tersedia.
                        </p>
                    )}
                </div>
            </div>

            {/* Counselor Section (Dinamis) */}
            <div>
                <SectionHeader title="Konselor" to="/booking/find-counselor" />
                <div className="flex space-x-4 overflow-x-auto mt-2 pb-4 scrollbar-hide px-4">
                    {counselors.length > 0 ? (
                        counselors
                            .slice(0, 3) // Batasi hanya 3 konselor
                            .map((counselor) => (
                                <CounselorCard
                                    key={counselor.id}
                                    counselor={counselor}
                                />
                            ))
                    ) : (
                        <p className="text-gray-500 text-sm px-2">
                            Konselor belum tersedia.
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
