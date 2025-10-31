import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// --- Komponen Ikon (dari kode Anda) ---
function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
}
function AddressIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}
function GenderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

// --- Ikon Baru untuk Konselor ---
function FileTextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a.7.7 0 0 0-1 0L9.1 5.1a.7.7 0 0 1-.5.2.7.7 0 0 0 0 1L10.8 8a.7.7 0 0 1 0 1L8.6 11.1a.7.7 0 0 0 0 1 .7.7 0 0 1 .2.5L7 14.9a.7.7 0 0 0 1 1L10.2 14a.7.7 0 0 1 .5.2.7.7 0 0 0 1 0 .7.7 0 0 1 .5-.2L14.9 16a.7.7 0 0 0 1-1L13.8 13a.7.7 0 0 1 .2-.5.7.7 0 0 0 0-1L11.8 9.8a.7.7 0 0 1 0-1L14.1 7a.7.7 0 0 0 0-1 .7.7 0 0 1-.2-.5L13 3.1a.7.7 0 0 0-1 0z" />
      <path d="M5 3a.7.7 0 0 0-1 0L2.1 5.1a.7.7 0 0 1-.5.2.7.7 0 0 0 0 1L3.8 8a.7.7 0 0 1 0 1L1.6 11.1a.7.7 0 0 0 0 1 .7.7 0 0 1 .2.5L1 14.9a.7.7 0 0 0 1 1L4.2 14a.7.7 0 0 1 .5.2.7.7 0 0 0 1 0 .7.7 0 0 1 .5-.2L8.9 16a.7.7 0 0 0 1-1L7.8 13a.7.7 0 0 1 .2-.5.7.7 0 0 0 0-1L5.8 9.8a.7.7 0 0 1 0-1L8.1 7a.7.7 0 0 0 0-1 .7.7 0 0 1-.2-.5L7 3.1a.7.7 0 0 0-1 0z" />
      <path d="M19 3a.7.7 0 0 0-1 0L16.1 5.1a.7.7 0 0 1-.5.2.7.7 0 0 0 0 1L17.8 8a.7.7 0 0 1 0 1L15.6 11.1a.7.7 0 0 0 0 1 .7.7 0 0 1 .2.5L15 14.9a.7.7 0 0 0 1 1L18.2 14a.7.7 0 0 1 .5.2.7.7 0 0 0 1 0 .7.7 0 0 1 .5-.2L22.9 16a.7.7 0 0 0 1-1L21.8 13a.7.7 0 0 1 .2-.5.7.7 0 0 0 0-1L19.8 9.8a.7.7 0 0 1 0-1L22.1 7a.7.7 0 0 0 0-1 .7.7 0 0 1-.2-.5L21 3.1a.7.7 0 0 0-1 0z" />
    </svg>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCounselor, setIsCounselor] = useState(false);

  // State untuk semua role
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // State khusus Customer
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  // State khusus Konselor
  const [izinPraktik, setIzinPraktik] = useState("");
  const [spesialis, setSpesialis] = useState({
    keluarga: false,
    pasangan: false,
    pernikahan: false,
    stress: false,
    remaja: false,
    kecemasan: false,
  });

  // Cek URL saat komponen dimuat
  useEffect(() => {
    // Logika ini akan memeriksa URL.
    // Jika URL adalah /konselor/register, 'isCounselor' akan menjadi true
    if (location.pathname.includes("/konselor")) {
      setIsCounselor(true);
    } else {
      setIsCounselor(false);
    }
  }, [location]); // Bergantung pada 'location'

  // Handler untuk checkbox spesialis
  const handleSpesialisChange = (e) => {
    const { name, checked } = e.target;
    setSpesialis((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isCounselor) {
      // Validasi untuk Konselor
      const oneSpesialisSelected = Object.values(spesialis).some(
        (v) => v === true
      );
      if (!name || !phone || !email || !izinPraktik || !oneSpesialisSelected) {
        setError("Harap isi semua kolom untuk konselor.");
        return;
      }
      
      // Logika submit untuk konselor (contoh: navigasi)
      console.log("Data Konselor:", { name, phone, email, izinPraktik, spesialis });
      // Ganti "/konselor/next-page" dengan tujuan Anda
      navigate("/konselor/next-page", {
        state: { name, phone, email, izinPraktik, spesialis },
      });

    } else {
      // Validasi untuk Customer (dari kode Anda)
      if (!name || !phone || !email || !address || !gender) {
        setError("Harap isi semua kolom.");
        return;
      }

      // Logika submit untuk customer (dari kode Anda)
      console.log("Data Customer:", { name, phone, email, address, gender });
      navigate("/address", {
        state: { name, phone, email, address, gender },
      });
    }
  };

  // Ini adalah warna biru untuk gelombang SVG
  const headerWaveColor = "#00A9E0"; 

  return (
    <>
      {/* ================================================================
        INI ADALAH PERBAIKANNYA (KEMBALI KE KODE ASLI ANDA)
        
        1. <header> TIDAK punya background-color (bg-).
        2. <svg> di dalamnya memiliki fill="#00A9E0" (Biru).
        
        Ini akan menciptakan LENGKUNGAN BIRU di atas, dan sisa
        halaman akan berwarna putih (default dari <main>).
        ================================================================
      */}
      <header className={`relative h-64 flex-shrink-0`}>
        {/* Latar belakang gelombang SVG */}
        <div className="absolute inset-x-0 top-0 w-full h-full">
          <svg
            viewBox="0 0 375 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0H375V150C375 150 281.25 240 187.5 240C93.75 240 0 150 0 150V0Z"
              fill={headerWaveColor} // <--- KUNCI-nya di sini: '#00A9E0'
            />
          </svg>
        </div>
         {/* Gambar Ilustrasi */}
         <div className="relative z-10 flex justify-center items-start h-full pt-6">
           <img
             // Gambar disamakan dengan customer (sesuai permintaan Anda)
             src={"/images/3.png"} 
             alt="Ilustrasi"
             className="w-32 h-auto object-contain"
             // Tambahkan fallback placeholder jika gambar tidak ada
             onError={(e) => {
                e.currentTarget.src = "https://placehold.co/128x128/FFFFFF/00A9E0?text=Gambar";
                e.currentTarget.onerror = null; 
             }}
           />
         </div>
      </header>

      {/* MAIN CONTENT (FORM) */}
      <main className="flex-grow flex flex-col justify-center p-8">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Daftar
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {/* Kolom yang selalu ada */}
            {/* Nama */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <UserIcon />
              </span>
              <input
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Telepon */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <PhoneIcon />
              </span>
              <input
                type="tel"
                placeholder="No. Telepon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MailIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* ======================================= */}
            {/* --- INI LOGIKA IF/ELSE (KONDISIONAL) --- */}
            {/* ======================================= */}

            {isCounselor ? (
              // --- FORM UNTUK KONSELOR ---
              <>
                {/* Nomor Surat Izin Praktik */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FileTextIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Nomor Surat Izin Praktik"
                    value={izinPraktik}
                    onChange={(e) => setIzinPraktik(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                {/* Spesialis */}
                <div className="relative border border-gray-300 rounded-md p-4">
                  <div className="flex items-center mb-3">
                      <span className="text-gray-400 mr-3">
                        <SparklesIcon />
                      </span>
                      <label className="text-gray-700 font-medium">Spesialis</label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(spesialis).map((key) => (
                      <label key={key} className="flex items-center space-x-2 text-sm text-gray-600 capitalize">
                        <input
                          type="checkbox"
                          name={key}
                          checked={spesialis[key]}
                          onChange={handleSpesialisChange}
                          className="rounded text-sky-500 focus:ring-sky-500"
                        />
                        <span>{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // --- FORM UNTUK CUSTOMER (dari kode Anda) ---
              <>
                {/* Input Jenis Kelamin (Dropdown) */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <GenderIcon />
                  </span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none appearance-none bg-white ${
                      gender ? "text-gray-800" : "text-gray-400"
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.75rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.25em 1.25em",
                    }}
                  >
                    <option value="" disabled>
                      Jenis Kelamin
                    </option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                {/* Alamat */}
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <AddressIcon />
                  </span>
                  <textarea
                    rows="3"
                    placeholder="Alamat (Contoh: Jl. Mataram, Suryatmajan)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                  />
                </div>
              </>
            )}

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full py-3 !mt-6 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Daftar
            </button>
          </form>

          {/* Pesan Error */}
          {error && (
            <div className="text-red-600 text-xs mt-2 text-center">
              {error}
            </div>
          )}

          {/* Link ke Login (juga kondisional) */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun?{" "}
            <Link
              to={isCounselor ? "/konselor/login" : "/login"}
              className="text-sky-500 font-semibold hover:underline"
            >
              Masuk
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

