import React, { useState, useEffect } from "react";
// Link sudah di-import, ini penting
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// --- Komponen Ikon ---
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

// --- Komponen-komponen Kecil ---

// Tombol Tab (Sudah sesuai)
const TabButton = ({ title, isActive, onClick, isLast = false }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 px-2 text-xs font-medium text-center transition-colors duration-200
      ${
        isActive
          ? "bg-sky-500 text-white" // Active state
          : "bg-white text-gray-800 hover:bg-gray-50" // Inactive state
      }
      ${
        !isLast ? "border-r border-sky-300" : "" // Border pemisah
      }
    `}
  >
    {title}
  </button>
);

// --- DATA CONTOH (Sama seperti sebelumnya) ---
const mockUpcoming = [
  {
    id: 1,
    name: "Vina Amalia, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=1",
    specialization: "Konseling anak",
    date: "12 - 09 - 2025",
    time: "16.00 - 17.00",
    type: "Vidio Call",
  },
  {
    id: 2,
    name: "Raka Ridjo, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=2",
    specialization: "Stres kerja dan burnout",
    date: "12 - 09 - 2025",
    time: "16.00 - 17.00",
    type: "Chat",
  },
];
const mockCanceled = [
  {
    id: 3,
    name: "Dimas Arifin, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=3",
    specialization: "Konseling kecemasan",
    date: "11 - 09 - 2025",
    time: "15.00 - 16.00",
    type: "Vidio Call",
  },
];
const mockUnpaid = [
  {
    id: 4,
    name: "Vina Amalia, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=1",
    specialization: "Konseling anak",
    date: "10 - 09 - 2025",
    time: "15.00 - 16.00",
    type: "Chat",
  },
];
const mockCompleted = [
  {
    id: 5,
    name: "Raka Ridjo, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=2",
    specialization: "Stres kerja dan burnout",
    date: "09 - 09 - 2025",
    time: "10.00 - 11.00",
    type: "Chat",
  },
];
// --- END OF DATA CONTOH ---

// Kartu Appointment
const AppointmentCard = ({ item, status }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
      {/* Bagian Atas: Spesialisasi, Nama, Avatar */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">
            Spesialisasi: {item.specialization}
          </p>
          <h3 className="font-semibold text-gray-900 text-sm">
            {item.name}
          </h3>
        </div>
        <img
          src={item.avatar}
          alt={item.name}
          className="w-12 h-12 rounded-full object-cover ml-3"
        />
      </div>

      {/* Bagian Tengah: Tanggal, Waktu, Tipe (Sudah Sesuai) */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-1.5">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-600">{item.date}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ClockIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-600">{item.time}</span>
        </div>
        <Link
          to="#"
          className="text-xs font-semibold text-sky-500 hover:underline"
        >
          {item.type}
        </Link>
      </div>

      {/* Garis Pemisah */}
      <hr className="my-4" />

      {/* ========================================================== */}
      {/* == PERBAIKAN DI SINI: Tombol diubah menjadi <Link> == */}
      {/* ========================================================== */}
      <div className="flex justify-end items-center space-x-2">
        {status === "upcoming" && (
          <>
            <button className="px-4 py-2 rounded-md border border-gray-300 bg-white text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
              Batalkan
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
              Mulai
            </button>
          </>
        )}
        {status === "canceled" && (
          <>
            <span className="text-xs font-semibold text-red-500 mr-auto">
              Telah Dibatalkan
            </span>
            {/* DIUBAH DARI <button> KE <Link> */}
            <Link
              to={`/riwayat/${item.id}`}
              className="px-4 py-2 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
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
            {/* DIUBAH DARI <button> KE <Link> */}
            <Link
              to={`/riwayat/${item.id}`}
              className="px-4 py-2 rounded-md border border-blue-600 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 text-center"
            >
              Lihat Detail
            </Link>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
              Bayar Sekarang
            </button>
          </>
        )}
        {status === "completed" && (
          <>
            <button className="px-4 py-2 rounded-md border border-blue-600 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50">
              Beri Nilai
            </button>
            {/* DIUBAH DARI <button> KE <Link> */}
            <Link
              to={`/riwayat/${item.id}`}
              className="px-4 py-2 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
            >
              Riwayat Chat
            </Link>
          </>
        )}
      </div>
      {/* ========================================================== */}
      {/* == AKHIR PERBAIKAN == */}
      {/* =A======================================================== */}
    </div>
  );
};


// --- Komponen Halaman Utama ---
export default function RiwayatPage() {
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming', 'canceled', 'unpaid', 'completed'

  // State untuk menyimpan data
  const [upcomingData, setUpcomingData] = useState([]);
  const [canceledData, setCanceledData] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  // Mengisi data dengan data contoh saat komponen dimuat
  useEffect(() => {
    // TODO: Ganti ini dengan fetch API Anda
    setUpcomingData(mockUpcoming);
    setCanceledData(mockCanceled);
    setUnpaidData(mockUnpaid);
    setCompletedData(mockCompleted);
  }, []);

  const renderContent = () => {
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
          <p className="text-gray-500">Tidak ada riwayat untuk ditampilkan.</p>
        </div>
      );
    }

    return data.map((item) => (
      <AppointmentCard key={item.id} item={item} status={activeTab} />
    ));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header (sesuai desain, Anda mungkin punya ini di layout) */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => window.history.back()}
          className="text-gray-800"
        >
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
        <div className="w-6"></div> {/* Spacer agar judul tetap di tengah */}
      </div>

      {/* Container Tab */}
      <div className="flex w-full mb-4 rounded-lg border border-sky-300 overflow-hidden">
        <TabButton
          title="Akan Datang"
          isActive={activeTab === "upcoming"}
          onClick={() => setActiveTab("upcoming")}
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

      {/* Konten Tab */}
      <div>{renderContent()}</div>
    </div>
  );
}