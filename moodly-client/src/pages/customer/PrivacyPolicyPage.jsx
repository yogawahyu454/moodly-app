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

export default function AturanKebijakanPage() {
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
            <div>
              <h1 className="font-semibold text-white text-base">
                Aturan & Kebijakan
              </h1>
              <p className="text-xs text-white/90">Aplikasi Moodly</p>
            </div>
          </div>
        </header>

        {/* Konten */}
        <div className="flex-1 flex flex-col bg-white pt-8 z-10 rounded-t-[2.5rem] overflow-y-auto">
          <main className="flex-1 p-6 space-y-6 text-gray-800 text-sm leading-relaxed">
            <section>
              <h2 className="font-semibold text-lg mb-2">1. Tujuan Aplikasi</h2>
              <p>
                Moodly adalah platform konseling psikolog online yang
                dirancang untuk membantu pengguna memahami, mengekspresikan, dan
                mengelola emosi mereka dengan bantuan psikolog profesional.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">2. Kebijakan Privasi</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Data pribadi pengguna disimpan dengan aman dan tidak akan
                  dibagikan tanpa izin pengguna.
                </li>
                <li>
                  Moodly menggunakan enkripsi untuk melindungi percakapan antara
                  pengguna dan psikolog.
                </li>
                <li>
                  Pengguna dapat meminta penghapusan data pribadi kapan saja.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">3. Aturan Penggunaan</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Pengguna wajib memberikan informasi yang benar dan akurat saat
                  mendaftar.
                </li>
                <li>
                  Dilarang menggunakan Moodly untuk menyebarkan ujaran kebencian,
                  kekerasan, atau konten yang tidak pantas.
                </li>
                <li>
                  Pelanggaran terhadap aturan ini dapat mengakibatkan
                  penangguhan akun.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">4. Layanan Konseling</h2>
              <p>
                Layanan konseling di Moodly disediakan oleh psikolog profesional.
                Namun, layanan ini tidak dimaksudkan untuk menggantikan bantuan
                medis darurat atau psikiatrik. Jika kamu merasa dalam bahaya,
                segera hubungi layanan darurat setempat.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">5. Tanggung Jawab Pengguna</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Menjaga kerahasiaan akun dan kata sandi secara pribadi.
                </li>
                <li>
                  Menggunakan aplikasi sesuai dengan ketentuan layanan yang
                  berlaku.
                </li>
                <li>
                  Tidak mengganggu atau menyalahgunakan fitur layanan Moodly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">6. Perubahan Aturan</h2>
              <p>
                Moodly berhak memperbarui atau mengubah aturan dan kebijakan ini
                kapan saja. Perubahan akan diberitahukan melalui aplikasi atau
                email terdaftar pengguna.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">7. Kontak Kami</h2>
              <p>
                Jika kamu memiliki pertanyaan atau keluhan terkait kebijakan ini,
                silakan hubungi kami melalui menu <strong>“Bantuan”</strong> di
                aplikasi Moodly.
              </p>
            </section>

            <p className="text-xs text-gray-500 mt-6 text-center">
              © 2025 Moodly. Semua hak dilindungi.
            </p>
          </main>
        </div>
      </div>
    </MobileLayout>
  );
}
