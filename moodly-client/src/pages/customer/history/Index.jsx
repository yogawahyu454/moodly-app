import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios"; // Sesuaikan path jika perlu

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

// Ikon Kalender
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

// Ikon Jam
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

// Tombol Tab (Segmen Tab)
const TabButton = ({
    title,
    isActive,
    onClick,
    isFirst = false,
    isLast = false,
}) => (
    <button
        onClick={onClick}
        className={`flex-1 py-1.5 px-2 text-xs font-semibold text-center transition-colors duration-200 focus:outline-none whitespace-nowrap
      ${
          isActive
              ? "bg-sky-500 text-white"
              : "bg-white text-gray-700 hover:bg-sky-50"
      }
      ${!isLast ? "border-r border-sky-200" : ""}
      ${isFirst ? "rounded-l-lg" : ""}
      ${isLast ? "rounded-r-lg" : ""}
    `}
    >
        {title}
    </button>
);

// --- HAPUS mockData ---

// Kartu Appointment (Diperbarui untuk data API)
const AppointmentCard = ({ item, status }) => {
    // Ambil data konselor dari relasi
    const konselor = item.konselor || {};
    const specialization = konselor.spesialisasi
        ? konselor.spesialisasi[0]
        : "Spesialisasi";

    return (
        <div className="bg-white p-3 rounded-xl shadow-lg mb-4">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                        Spesialisasi: {specialization}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-xs">
                        {konselor.name || "Konselor"}
                    </h3>
                </div>
                <img
                    src={konselor.avatar} // Accessor akan menangani ini
                    alt={konselor.name}
                    className="w-10 h-10 rounded-full object-cover ml-2"
                />
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1.5">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                        {formatDate(item.tanggal_konsultasi)}
                    </span>
                </div>
                <div className="flex items-center space-x-1.5">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                        {item.jam_konsultasi}
                    </span>
                </div>
                <span className="text-xs font-semibold text-sky-500">
                    {item.metode_konsultasi}
                </span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-end items-center space-x-2">
                {status === "upcoming" && (
                    <>
                        {/* Mengarah ke halaman untuk MELAKUKAN pembatalan */}
                        <Link
                            to={`/history/cancel/${item.id}`} // Path diperbarui
                            className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 text-center"
                        >
                            Batalkan
                        </Link>
                        <button className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
                            Mulai
                        </button>
                    </>
                )}

                {status === "canceled" && (
                    <>
                        <span className="text-xs font-semibold text-red-500 mr-auto">
                            Telah Dibatalkan
                        </span>
                        {/* Mengarah ke halaman DETAIL pembatalan */}
                        <Link
                            to={`/history/cancel-detail/${item.id}`} // Path diperbarui
                            className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
                        >
                            Detail
                        </Link>
                    </>
                )}

                {status === "unpaid" && (
                    <>
                        <span className="text-xs font-semibold text-orange-500 mr-auto">
                            Menunggu Pembayaran
                        </span>
                        <Link
                            to={`/history/${item.id}`} // Path diperbarui
                            className="px-3 py-1.5 rounded-md border border-blue-600 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 text-center"
                        >
                            Lihat Detail
                        </Link>
                        <Link
                            to={`/history/${item.id}`} // Path diperbarui
                            className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
                        >
                            Bayar Sekarang
                        </Link>
                    </>
                )}

                {status === "completed" && (
                    <>
                        <Link
                            to={`/history/rate/${item.id}`} // Path diperbarui
                            className="px-3 py-1.5 rounded-md border border-blue-600 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                        >
                            Beri Nilai
                        </Link>
                        <Link
                            to={`/session/chat/${item.id}`} // Path diperbarui
                            className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
                        >
                            Riwayat Chat
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

// Ganti nama komponen menjadi HistoryPage
export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const navigate = useNavigate();

    // State baru untuk data dinamis
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [upcomingData, setUpcomingData] = useState([]);
    const [canceledData, setCanceledData] = useState([]);
    const [unpaidData, setUnpaidData] = useState([]);
    const [completedData, setCompletedData] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get("/api/history");
                const allBookings = response.data;

                // Filter data berdasarkan status_pesanan
                setUpcomingData(
                    allBookings.filter(
                        (b) =>
                            b.status_pesanan === "Dijadwalkan" ||
                            b.status_pesanan === "Proses"
                    )
                );
                setCanceledData(
                    allBookings.filter((b) => b.status_pesanan === "Batal")
                );
                setUnpaidData(
                    allBookings.filter(
                        (b) => b.status_pesanan === "Menunggu Konfirmasi"
                    )
                );
                setCompletedData(
                    allBookings.filter((b) => b.status_pesanan === "Selesai")
                );

                setError(null);
            } catch (err) {
                console.error("Gagal mengambil riwayat:", err);
                setError("Gagal memuat data riwayat.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []); // Hanya dijalankan sekali saat komponen dimuat

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-10 text-gray-500">
                    Memuat data...
                </div>
            );
        }
        if (error) {
            return (
                <div className="text-center py-10 text-red-500">{error}</div>
            );
        }

        let data;
        switch (activeTab) {
            case "upcoming":
                data = upcomingData;
                break;
            case "canceled":
                data = canceledData;
                break;
            case "unpaid":
                data = unpaidData;
                break;
            case "completed":
                data = completedData;
                break;
            default:
                data = [];
        }

        if (data.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        Tidak ada riwayat untuk ditampilkan.
                    </p>
                </div>
            );
        }

        return data.map((item) => (
            <AppointmentCard key={item.id} item={item} status={activeTab} />
        ));
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
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
                    Riwayat
                </h1>
                <div className="w-6"></div>
            </div>

            <div className="flex w-full mb-4 rounded-lg border border-sky-300 overflow-hidden shadow-sm">
                <TabButton
                    title="Akan Datang"
                    isActive={activeTab === "upcoming"}
                    onClick={() => setActiveTab("upcoming")}
                    isFirst={true}
                />
                <TabButton
                    title="Dibatalkan"
                    isActive={activeTab === "canceled"}
                    onClick={() => setActiveTab("canceled")}
                />
                <TabButton
                    title="Belum Dibayar"
                    isActive={activeTab === "unpaid"}
                    onClick={() => setActiveTab("unpaid")}
                />
                <TabButton
                    title="Selesai"
                    isActive={activeTab === "completed"}
                    onClick={() => setActiveTab("completed")}
                    isLast={true}
                />
            </div>

            <div>{renderContent()}</div>
        </div>
    );
}
