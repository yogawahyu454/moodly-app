import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// PERUBAHAN DI SINI: Gunakan kurung kurawal untuk import
import { useAuth } from "../../context/AuthContext";

// --- Komponen Ikon (diambil dari file sebelumnya) ---
function ArrowLeftIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {" "}
            <line x1="19" y1="12" x2="5" y2="12"></line>{" "}
            <polyline points="12 19 5 12 12 5"></polyline>{" "}
        </svg>
    );
}
function EyeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {" "}
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />{" "}
            <circle cx="12" cy="12" r="3" />{" "}
        </svg>
    );
}
function EyeOffIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {" "}
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>{" "}
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 7 11 7a13.16 13.16 0 0 1-1.67 2.68"></path>{" "}
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 11 7a9.74 9.74 0 0 0 5.39-1.61"></path>{" "}
            <line x1="2" y1="22" x2="22" y2="2"></line>{" "}
        </svg>
    );
}

export default function CreatePasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, errors: backendErrors } = useAuth();

    // Menerima semua data dari halaman alamat
    const registrationData = location.state;

    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Jika tidak ada data, kembalikan ke awal alur
        if (!registrationData) {
            navigate("/register");
        }
    }, [registrationData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("Password minimal 8 karakter.");
            return;
        }
        if (password !== password_confirmation) {
            setError("Konfirmasi kata sandi tidak cocok.");
            return;
        }

        // Gabungkan data dari state dengan password, lalu kirim ke backend
        const finalData = {
            ...registrationData,
            password,
            password_confirmation,
        };

        try {
            await register(finalData);
            // Navigasi ke dashboard akan diurus oleh AuthContext jika berhasil
        } catch (err) {
            setError(
                "Gagal mendaftar. Periksa kembali data Anda atau email mungkin sudah terdaftar."
            );
            console.error(err);
        }
    };

    return (
        <>
            <header className="relative h-60 flex-shrink-0 bg-gradient-to-b from-[#42A5F5] to-white text-black">
                <div className="absolute inset-0 px-6 py-8 z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-1 rounded-full text-black"
                    >
                        {" "}
                        <ArrowLeftIcon />{" "}
                    </button>
                    <h1 className="text-2xl font-bold mt-4">Buat Kata Sandi</h1>
                    <p className="text-sm opacity-90 mt-1">
                        Buat kata sandi untuk keamanan akun Anda
                    </p>
                </div>
            </header>
            <main className="flex-grow w-full bg-white rounded-t-3xl shadow-lg p-6 -mt-20 z-20">
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword((p) => !p)}
                            >
                                {" "}
                                {showPassword ? (
                                    <EyeOffIcon />
                                ) : (
                                    <EyeIcon />
                                )}{" "}
                            </button>
                        </div>
                        {backendErrors?.password && (
                            <small className="text-red-500 mt-1">
                                {backendErrors.password[0]}
                            </small>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Masukan ulang Kata sandi
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={password_confirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() =>
                                    setShowConfirmPassword((p) => !p)
                                }
                            >
                                {" "}
                                {showConfirmPassword ? (
                                    <EyeOffIcon />
                                ) : (
                                    <EyeIcon />
                                )}{" "}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">
                            {error}
                        </p>
                    )}
                    <div className="!mt-8">
                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 active:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            {" "}
                            Simpan{" "}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
