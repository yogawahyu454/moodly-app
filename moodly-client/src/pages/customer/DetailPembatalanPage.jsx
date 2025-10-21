import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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

// --- Komponen Halaman Detail Pembatalan ---
export default function DetailPembatalanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy berdasarkan desain Anda
  const dummyData = {
    id: id,
    name: "Vina Amalia, M.Psi., Psikolog",
    specialization: "Konseling anak",
    avatar: "https://i.pravatar.cc/100?img=1", // Ganti dengan path avatar
    date: "12 - 09 - 2025",
    time: "16.00 - 17.00",
    type: "Vidio Call",
    status: "Telah Dibatalkan",
    statusColor: "text-red-500", // Warna teks merah
    reason: "Dibatalkan oleh customer",
    cancelledAt: "09-09-2025",
    note: "Saya mohon maaf karena harus membatalkan sesi ini. Tiba-tiba ada urusan keluarga yang tidak bisa ditinggalkan.",
  };

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
              src={dummyData.avatar}
              alt={dummyData.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-gray-900 text-base">
                {dummyData.name}
              </h2>
              <p className="text-xs text-gray-500">
                {dummyData.specialization}
              </p>
            </div>
          </div>

          {/* Bagian tengah: Detail Sesi (ikon-ikon) */}
          <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
            <div className="flex items-center space-x-1.5">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span>{dummyData.date}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>{dummyData.time}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <VideoCameraIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sky-500 font-semibold">
                {dummyData.type}
              </span>
            </div>
          </div>

          {/* Bagian bawah: Status */}
          <div className="text-center">
            <span className={`font-semibold ${dummyData.statusColor}`}>
              {dummyData.status}
            </span>
          </div>
        </div>

        {/* 2. Kartu Alasan Pembatalan */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Pembatalan
          </h3>
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <p className="text-sm text-gray-700">{dummyData.reason}</p>
            <div className="flex items-center space-x-1.5 text-red-500 mt-2">
              <ClockIcon className="w-4 h-4" />
              <span className="text-xs font-semibold">
                Dibatalkan pada tanggal {dummyData.cancelledAt}
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
            <p className="text-sm text-gray-700">{dummyData.note}</p>
          </div>
        </div>

        {/* 4. Tombol Aksi (NON-STICKY) */}
        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm">
            Jadwalkan Ulang
          </button>
        </div>
      </div>
    </div>
  );
}