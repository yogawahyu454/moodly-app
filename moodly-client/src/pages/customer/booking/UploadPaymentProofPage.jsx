import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MobileLayout = ({ children }) => (
  <div className="flex justify-center min-h-screen bg-[#FFF9F8]">
    <div className="w-full max-w-md min-h-screen bg-[#FFF9F8] flex flex-col">
      {children}
    </div>
  </div>
);

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

export default function UploadBuktiPembayaranPage() {
  const navigate = useNavigate();
  const [kodePembayaran, setKodePembayaran] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    const kode = "PAY-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setKodePembayaran(kode);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gambar) {
      alert("Silakan upload bukti pembayaran terlebih dahulu!");
      return;
    }
    alert(`Bukti pembayaran dengan kode ${kodePembayaran} berhasil dikirim!`);
    setGambar(null);
    setPreview(null);
    setKeterangan("");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full w-full bg-[#00D1FF] relative">
        {/* Header */}
        <header className="w-full p-4 pt-8 sticky top-0 z-20 bg-[#00D1FF]">
          <div className="flex items-center gap-4">
            <button
              className="text-white"
              onClick={() => navigate(-1)}
              aria-label="Kembali"
            >
              <BackArrowIcon />
            </button>
            <h1 className="text-white font-semibold text-lg">
              Upload Bukti Pembayaran
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white rounded-t-[2.5rem] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between flex-1 p-6 mt-8 space-y-7"
          >
            <div className="space-y-7">
              {/* Kode Pembayaran */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kode Pembayaran
                </label>
                <input
                  type="text"
                  value={kodePembayaran}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-gray-100 font-semibold"
                />
              </div>

              {/* Upload Gambar */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Bukti Pembayaran
                </label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl py-7 bg-gray-50">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-xl border border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm">Belum ada gambar</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-3 text-sm"
                  />
                </div>
              </div>

              {/* Keterangan */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Keterangan
                </label>
                <textarea
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Tulis keterangan tambahan (opsional)"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Tombol Kirim */}
            <div className="pt-8 pb-6">
              <button
                type="submit"
                className="w-full bg-[#00D1FF] text-white font-semibold py-3 rounded-xl border-2 border-black hover:bg-[#00bde6] transition"
              >
                Kirim Bukti Pembayaran
              </button>
            </div>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
}
