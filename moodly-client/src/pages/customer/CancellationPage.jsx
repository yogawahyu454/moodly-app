import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Komponen untuk memilih alasan pembatalan
const CancellationPage = () => {
  const { id } = useParams(); // ID dari sesi yang dibatalkan
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] = useState(""); // Untuk alasan pembatalan
  const [note, setNote] = useState(""); // Catatan pembatalan

  // Daftar alasan pembatalan
  const reasons = [
    "Ingin menjadwalkan ulang sesi",
    "Psikolog tidak responsif",
    "Saya tidak membutuhkan sesi ini lagi",
    "Jadwal saya bentrok",
    "Lainnya"
  ];

  // Data sesi pembatalan (dummy data)
  const sessionData = {
    name: "Vina Amalia, M.Psi., Psikolog",
    specialization: "Konseling anak",
    date: "12 - 09 - 2025",
    time: "16.00 - 17.00",
    type: "Vidio Call",
    avatar: "https://i.pravatar.cc/100?img=1" // Ganti dengan avatar yang sesuai
  };

  // Fungsi untuk menangani pembatalan
  const handleCancel = () => {
    // Kirim data pembatalan atau lakukan aksi pembatalan
    console.log("Sesi dibatalkan dengan alasan:", selectedReason, "dan catatan:", note);
    // Arahkan kembali setelah pembatalan
    navigate("/riwayat");
  };

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

      {/* Informasi Sesi */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={sessionData.avatar}
            alt={sessionData.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-gray-900">{sessionData.name}</h2>
            <p className="text-sm text-gray-500">{sessionData.specialization}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-600 mt-2">
              <span>{sessionData.date}</span>
              <span>{sessionData.time}</span>
            </div>
            <span className="text-xs text-blue-600 font-semibold">{sessionData.type}</span>
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
        >
          <option value="" disabled>Pilih alasan...</option>
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
          placeholder="Masukkan catatan Anda..."
        />
      </div>

      {/* Tombol Batalkan */}
      <div className="text-center">
        <button
          onClick={handleCancel}
          className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Batalkan
        </button>
      </div>
    </div>
  );
};

export default CancellationPage;
