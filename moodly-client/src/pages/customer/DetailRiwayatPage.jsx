import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// --- Komponen Ikon (Dibutuhkan oleh halaman ini) ---

// Ikon "Salin" (Copy)
function ClipboardIcon(props) {
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
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9A2.25 2.25 0 0 1 6.75 5.25v0B2.25 2.25 0 0 0 6.75 3H9m6.666 0h3c1.03 0 1.9.693 2.166 1.638m-7.332 0L10.5 5.25A2.25 2.25 0 0 0 8.25 3h-3v3.75a2.25 2.25 0 0 1-2.25 2.25H3v9A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V10.5h-3.75a2.25 2.25 0 0 1-2.25-2.25V3.888Z"
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

// --- Komponen Halaman Detail Riwayat ---
export default function DetailRiwayatPage() {
  const { id } = useParams(); // Untuk mengambil ID dari URL, misal: /riwayat/5
  const navigate = useNavigate();

  // Data dummy (menggunakan versi yang lebih kecil)
  const dummyData = {
    id: id,
    name: "Vina Amalia, M.Psi., Psikolog",
    specialization: "Keluarga, Stress, Pasangan +5 Lainnya",
    date: "Kam, 12 September 2025",
    time: "15.00 - 16.00",
    type: "Vidio Call",
    status: "Menunggu Pembayaran",
    statusColor: "bg-yellow-100 text-yellow-700",
    sessionInfo: "Individu | 2 Jam Sesi",
    bookingId: "gg44gs7-33yeijduus-8832j-ey7e7w",
    payment: {
      method: "Virtual Account BCA",
      logo: "/images/bca-logo.png",
      vaNumber: "7684567465748394754654",
      total: "Rp 230.000",
    },
    countdown: {
      hours: "01",
      minutes: "39",
      seconds: "04",
    },
    avatar: "https://i.pravatar.cc/100?img=1",
  };

  return (
    // DIUBAH: Padding bawah (pb-20) dihapus dari div utama
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header Halaman (versi kecil) */}
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
        <h1 className="text-lg font-bold text-center text-gray-800 flex-grow">
          Detail Riwayat
        </h1>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      {/* --- Konten Sesuai Desain (versi kecil) --- */}

      {/* 1. Timer Pembayaran */}
      <div className="flex flex-col items-center mb-3">
        <p className="text-xs text-gray-700 mb-1">Sisa Waktu Pembayaran</p>
        <div className="flex items-center space-x-1.5">
          <span className="bg-blue-600 text-white font-bold text-base p-1.5 rounded-md w-10 text-center">
            {dummyData.countdown.hours}
          </span>
          <span className="text-blue-600 font-bold text-base">:</span>
          <span className="bg-blue-600 text-white font-bold text-base p-1.5 rounded-md w-10 text-center">
            {dummyData.countdown.minutes}
          </span>
          <span className="text-blue-600 font-bold text-base">:</span>
          <span className="bg-blue-600 text-white font-bold text-base p-1.5 rounded-md w-10 text-center">
            {dummyData.countdown.seconds}
          </span>
        </div>
      </div>

      {/* 2. Kartu Virtual Account */}
      <div className="bg-white p-3 rounded-xl shadow-lg mb-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-900">
            {dummyData.payment.method}
          </h2>
          <span className="font-bold text-blue-700 text-base">BCA</span>
        </div>
        <div className="mb-2">
          <label className="text-xs text-gray-500 block mb-0.5">
            Nomer Virtual Account
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">
              {dummyData.payment.vaNumber}
            </span>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-0.5">
            Total Pembayaran
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-blue-600">
              {dummyData.payment.total}
            </span>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Kartu Detail Sesi Konseling */}
      {/* DIUBAH: mb-3 dihapus dari kartu ini */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-900">
              Vidio Call Konseling
            </h2>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${dummyData.statusColor}`}
            >
              {dummyData.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{dummyData.sessionInfo}</p>
        </div>
        <div className="flex items-center space-x-3 px-3 pb-3">
          <img
            src={dummyData.avatar}
            alt={dummyData.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-xs">
              {dummyData.name}
            </h3>
            <p className="text-xs text-gray-500">{dummyData.specialization}</p>
          </div>
        </div>
        <hr className="mx-3" />
        <div className="p-3 space-y-2">
          <p className="text-xs font-medium text-gray-800">
            {dummyData.date}
          </p>
          <div className="flex items-center space-x-2">
            <VideoCameraIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-700">{dummyData.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-700">{dummyData.time}</span>
          </div>
        </div>
        <hr className="mx-3" />
        <div className="p-3">
          <label className="text-xs text-gray-500 block mb-1">
            Konseling Booking ID
          </label>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-800 break-all">
              {dummyData.bookingId}
            </span>
            <button className="text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0">
              <ClipboardIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* == PERBAIKAN DI SINI == */}
      {/* ============================================== */}
      
      {/* 4. Tombol Aksi (Dipindahkan ke sini, tidak lagi sticky) */}
      {/* Diberi margin atas 'mt-4' */}
      <div className="mt-4">
        <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm">
          Lihat Invoice Pembayaran
        </button>
      </div>
      
      {/* ============================================== */}
      {/* == AKHIR PERBAIKAN == */}
      {/* ============================================== */}
      
      {/* Tombol sticky yang lama DIHAPUS */}
      
    </div>
  );
}