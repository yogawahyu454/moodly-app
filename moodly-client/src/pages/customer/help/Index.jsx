import React from "react";

const MobileLayout = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col border-x">
        {children}
      </div>
    </div>
  );
};

export default function HelpCenterPage({ onSelectFAQ, onContactNow }) {
  const faqs = [
    "Apa yang harus dilakukan jika lupa kata sandi?",
    "Bagaimana cara memulai sesi curhat?",
    "Bagaimana cara berlangganan pro?",
    "Berapa lama durasi sesi curhat?",
    "Apa yang terjadi jika saya terlambat?",
  ];

  return (
    <MobileLayout>
      {/* Area biru dan ilustrasi */}
      <div className="relative w-full">
        {/* Latar belakang biru */}
        <div className="bg-sky-400 w-full h-60 rounded-b-[50%]" />

        {/* Gambar ilustrasi */}
        <img
          src="images/3.png"
          alt="Help Illustration"
          className="absolute left-1/2 -translate-x-1/2 top-7 w-48 h-auto drop-shadow-lg"
        />
      </div>

      {/* Konten */}
      <div className="flex flex-col items-center text-center px-6 mt-44 flex-grow">
        {/* Judul */}
        <h1 className="text-2xl font-extrabold text-gray-900">Pusat Bantuan</h1>
        <p className="text-sm text-gray-500 mt-2">Bagaimana Kami Dapat Membantu Anda?</p>

        {/* FAQ */}
        <div className="mt-7 w-full">
          <div className="border border-gray-300 rounded-lg divide-y divide-gray-300 bg-white text-left shadow-sm">
            <div className="flex items-center px-4 py-3 gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-400">
                <span className="text-xs font-semibold text-gray-600">?</span>
              </div>
              <span className="font-semibold text-gray-700 text-sm">FAQ</span>
            </div>
            {faqs.map((item, i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => onSelectFAQ(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Tombol Hubungi Sekarang */}
        <button
  onClick={onContactNow}
  className="w-full mt-8 mb-8 bg-sky-500 text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-sky-600 transition-all shadow-md"
>
  Hubungi Sekarang
</button>

      </div>
    </MobileLayout>
  );
}
