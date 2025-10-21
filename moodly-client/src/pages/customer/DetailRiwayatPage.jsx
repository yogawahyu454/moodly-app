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

  // TODO: Nanti, Anda akan menggunakan 'id' di atas untuk fetch data
  // dari API. Untuk saat ini, kita gunakan data dummy.
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
      logo: "/images/bca-logo.png", // <-- Ganti dengan path logo BCA Anda
      vaNumber: "7684567465748394754654",
      total: "Rp 230.000",
    },
    countdown: {
      hours: "01",
      minutes: "39",
      seconds: "04",
    },
    avatar: "https://i.pravatar.cc/100?img=1", // Ganti dengan path avatar
  };

  return (
    // Diberi padding bawah (pb-24) agar tombol sticky tidak menutupi konten
    <div className="p-4 bg-gray-50 min-h-screen pb-24">
      {/* Header Halaman */}
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
          Detail Riwayat
        </h1>
        <div className="w-6"></div> {/* Spacer agar judul tetap di tengah */}
      </div>

      {/* --- Konten Sesuai Desain --- */}

      {/* 1. Timer Pembayaran */}
      <div className="flex flex-col items-center mb-4">
        <p className="text-sm text-gray-700 mb-2">Sisa Waktu Pembayaran</p>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white font-bold text-lg p-2 rounded-md w-12 text-center">
            {dummyData.countdown.hours}
          </span>
          <span className="text-blue-600 font-bold text-lg">:</span>
          <span className="bg-blue-600 text-white font-bold text-lg p-2 rounded-md w-12 text-center">
            {dummyData.countdown.minutes}
          </span>
          <span className="text-blue-600 font-bold text-lg">:</span>
          <span className="bg-blue-600 text-white font-bold text-lg p-2 rounded-md w-12 text-center">
            {dummyData.countdown.seconds}
          </span>
        </div>
      </div>

      {/* 2. Kartu Virtual Account */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            {dummyData.payment.method}
          </h2>
          {/* Ganti dengan <img> jika path logo sudah benar */}
          <span className="font-bold text-blue-700 text-lg">BCA</span>
          {/* <img src={dummyData.payment.logo} alt="BCA" className="h-4" /> */}
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-500 block mb-1">
            Nomer Virtual Account
          </label>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-800">
              {dummyData.payment.vaNumber}
            </span>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Total Pembayaran
          </label>
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-blue-600">
              {dummyData.payment.total}
            </span>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Kartu Detail Sesi Konseling */}
      <div className="bg-white rounded-xl shadow-lg mb-4">
        <div className="px-4 pt-4 pb-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-900">
              Vidio Call Konseling
            </h2>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${dummyData.statusColor}`}
            >
              {dummyData.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">{dummyData.sessionInfo}</p>
        </div>

        <div className="flex items-center space-x-3 px-4 pb-4">
          <img
            src={dummyData.avatar}
            alt={dummyData.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {dummyData.name}
            </h3>
            <p className="text-xs text-gray-500">{dummyData.specialization}</p>
          </div>
        </div>

        <hr className="mx-4" />

        <div className="p-4 space-y-3">
          <p className="text-sm font-medium text-gray-800">
            {dummyData.date}
          </p>
          <div className="flex items-center space-x-2">
            <VideoCameraIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">{dummyData.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">{dummyData.time}</span>
          </div>
        </div>

        <hr className="mx-4" />

        <div className="p-4">
          <label className="text-xs text-gray-500 block mb-1">
            Konseling Booking ID
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800 break-all">
              {dummyData.bookingId}
            </span>
            <button className="text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0">
              <ClipboardIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* == PERBAIKAN DI SINI == */}
      {/* ============================================== */}
      
      {/* 4. Tombol Aksi di Bawah (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        {/* Wrapper tambahan untuk membatasi lebar dan menengahkan tombol */}
        <div className="max-w-md mx-auto">
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
            Lihat Invoice Pembayaran
          </button>
        </div>
      </div>
      
      {/* ============================================== */}
      {/* == AKHIR PERBAIKAN == */}
      {/* ============================================== */}
    </div>
  );
}