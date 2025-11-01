import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Layout mengikuti program referensi
const MobileLayout = ({ children }) => (
  <div className="flex justify-center min-h-screen bg-white">
    <div className="w-full max-w-md min-h-screen bg-white flex flex-col">
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

export default function EndPage() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex flex-col h-full w-full bg-[#00B2FF] relative">
        {/* Header */}
        <header className="w-full p-4 pt-8 sticky top-0 z-20 bg-[#00B2FF]">
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

        {/* Lengkungan bawah header */}
        <div className="absolute bottom-[80%] left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[60px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,60 350,0 500,40 L500,00 L0,0 Z"
              fill="#00B2FF"
            ></path>
          </svg>
        </div>

        {/* Konten Putih */}
        <div className="flex-1 flex flex-col bg-white pt-10 z-10 rounded-t-[2rem] items-center">
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

              {/* Info Detail */}
              <div className="mx-auto text-sm text-gray-700 w-[90%] space-y-3 text-left">
                <div className="flex items-center">
                  <span className="w-[90px] font-semibold">Jadwal</span>
                  <span className="w-[10px] text-center">:</span>
                  <span className="flex-1">5 April 2025</span>
                </div>

                <div className="flex items-center">
                  <span className="w-[90px] font-semibold">Jam</span>
                  <span className="w-[10px] text-center">:</span>
                  <span className="flex-1">16:00 - 17:00</span>
                </div>

                <div className="flex items-center">
                  <span className="w-[90px] font-semibold">Metode</span>
                  <span className="w-[10px] text-center">:</span>
                  <span className="flex-1">Telepon</span>
                </div>

                <div className="flex items-center">
                  <span className="w-[90px] font-semibold">No. Telepon</span>
                  <span className="w-[10px] text-center">:</span>
                  <span className="flex-1">087636627726</span>
                </div>

                <div className="flex items-center">
                  <span className="w-[90px] font-semibold">Status</span>
                  <span className="w-[10px] text-center">:</span>
                  <span className="flex-1 text-[#00B2FF] font-medium">
                    Selesai
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MobileLayout>
  );
}
