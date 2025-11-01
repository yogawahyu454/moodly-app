import React, { useState } from "react";

// --- Komponen Layout Utama (Pola yang Lebih Baik) ---
// Didefinisikan sekali dan digunakan untuk semua halaman.
// Garis pinggir (border-x) sekarang dihapus.
const MobileLayout = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-white font-['Poppins']">
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col">
        {children}
      </div>
    </div>
  );
};

// Ikon panah kembali yang bisa digunakan ulang
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

// Komponen halaman ganti email (Tata letak diperbaiki)
function ChangeEmailPage({ onNext }) {
  const [email, setEmail] = useState("indirarahma@gmail.com");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Link verifikasi akan dikirim ke email: ${email}`);
    onNext();
  };

  return (
    <>
      <header className="relative z-10 flex items-center px-4 pt-6 pb-4">
        <button
          onClick={() => alert("Fungsi kembali tidak dapat digunakan dalam pratinjau ini.")}
          aria-label="Kembali"
        >
          <BackArrowIcon />
        </button>
      </header>
      {/* Form sekarang mengontrol tata letak, mendorong tombol ke bawah */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Masukan email baru
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Ubah email akun Anda. Pastikan email baru aktif dan bisa menerima verifikasi.
          </p>
          <div className="mt-8">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="mail@contoh.com"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full text-base font-semibold active:scale-95 transition-transform"
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </>
  );
}

// Komponen Halaman Verifikasi OTP (Tata letak diperbaiki)
function OtpVerificationPage({ backToEmail }) {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Kode OTP ${otp} berhasil diverifikasi!`);
  };

  return (
    <>
      <header className="relative z-10 flex items-center px-4 pt-6 pb-4">
        <button onClick={backToEmail} aria-label="Kembali">
          <BackArrowIcon />
        </button>
      </header>
      {/* Menerapkan perbaikan tata letak yang sama di sini */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Masukan kode verifikasi anda
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Masukan kode OTP untuk verifikasi akun Anda
          </p>
          <div className="mt-8">
            <input
              type="text"
              inputMode="numeric"
              name="otp"
              value={otp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Masukan kode OTP"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full text-base font-semibold active:scale-95 transition-transform"
          >
            Kirim
          </button>
        </div>
      </form>
    </>
  );
}

// Komponen App utama yang sekarang menggunakan MobileLayout
export default function App() {
  const [page, setPage] = useState("email"); // 'email' atau 'otp'

  const showOtpPage = () => setPage("otp");
  const showEmailPage = () => setPage("email");

  return (
    <div className="App">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>
      <MobileLayout>
        {page === "email" && <ChangeEmailPage onNext={showOtpPage} />}
        {page === "otp" && <OtpVerificationPage backToEmail={showEmailPage} />}
      </MobileLayout>
    </div>
  );
}

