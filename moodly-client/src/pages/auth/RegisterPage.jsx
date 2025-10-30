import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- Komponen Ikon ---
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
// --- Akhir Komponen Ikon ---

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState(""); // Alamat singkat
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !email || !address || !gender) {
            setError("Harap isi semua kolom.");
            return;
        }

        setError("");

        navigate("/address", {
            state: { name, phone, email, address, gender },
        });
    };

    return (
        <>
            <header className="relative h-64 flex-shrink-0">
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
                            fill="#00A9E0"
                        />
                    </svg>
                </div>
                <div className="relative z-10 flex justify-center items-start h-full pt-6">
                    <img
                        src="/images/3.png" // Pastikan path gambar ini benar
                        alt="Ilustrasi"
                        className="w-32 h-auto object-contain"
                    />
                </div>
            </header>
            <main className="flex-grow flex flex-col justify-center p-8">
                <div className="w-full">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        Daftar
                    </h1>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit}
                        noValidate
                    >
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
                                {/* ================== */}
                                {/* --- INI YANG DIUBAH --- */}
                                <option value="" disabled>
                                    Jenis Kelamin
                                </option>
                                {/* ================== */}
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
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

                    {/* Link ke Login */}
                    <div className="text-center text-sm text-gray-600 mt-4">
                        Sudah punya akun?{" "}
                        <Link
                            to="/login"
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
