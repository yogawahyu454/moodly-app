import React from "react";
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

export default function DetailPsikologPage() {
  const navigate = useNavigate();

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
            <h1 className="font-semibold text-white text-base">
              Indira Rahmania
            </h1>
          </div>
        </header>

        {/* Konten */}
        <div className="flex-1 flex flex-col bg-white pt-8 z-10 rounded-t-[2.5rem] items-center">
          <main className="flex flex-col items-center justify-start p-6 w-full max-w-sm flex-grow">
            {/* Card info */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 w-full text-center">
  <img
    src="/images/user_chat.png"
    alt="Indira Rahmania"
    className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
  />
  <h2 className="font-semibold text-base text-gray-800 mb-6">
    Indira Rahmania
  </h2>

  {/* Info Jadwal */}
  <div className="mx-auto text-sm text-gray-700 w-[85%] space-y-2 text-left">
    {/* Baris 1 */}
    <div className="flex items-center">
      <span className="w-[70px] font-semibold">Jadwal</span>
      <span className="w-[10px] text-center">:</span>
      <span className="flex-1">5 April 2025</span>
    </div>

    {/* Baris 2 */}
    <div className="flex items-center">
      <span className="w-[70px] font-semibold">Jam</span>
      <span className="w-[10px] text-center">:</span>
      <span className="flex-1">16:00 - 17:00</span>
    </div>

    {/* Baris 3 */}
    <div className="flex items-center">
      <span className="w-[70px] font-semibold">Metode</span>
      <span className="w-[10px] text-center">:</span>
      <span className="flex-1">Chat</span>
    </div>
  </div>
</div>






            {/* Tombol */}
           <button
  className="mt-8 bg-[#00D1FF] text-white font-semibold py-3 px-20 rounded-full shadow hover:opacity-90 transition"
  onClick={() => alert('Menghubungi Indira Rahmania...')}
>
  Hubungi
</button>
          </main>
        </div>
      </div>
    </MobileLayout>
  );
}
