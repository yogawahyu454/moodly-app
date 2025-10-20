import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../api/axios"; // Import apiClient

// --- Komponen Ikon ---
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

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(""); // State untuk menampilkan pesan sukses
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setStatus("");

        if (!email) {
            setErrors({ message: "Harap masukkan alamat email Anda." });
            return;
        }

        try {
            await apiClient.get("/sanctum/csrf-cookie");
            const response = await apiClient.post("/forgot-password", {
                email,
            });
            setStatus(response.data.status); // Simpan pesan sukses dari backend
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ message: "Terjadi kesalahan, silakan coba lagi." });
            }
        }
    };

    return (
        <>
            <header className="relative h-80 flex-shrink-0">
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
                <button
                    type="button"
                    className="absolute top-6 left-6 z-20 text-white p-2"
                    onClick={() => navigate(-1)}
                    aria-label="Kembali"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <div className="relative z-10 flex justify-center items-start h-full pt-12">
                    <img
                        src="/images/3.png"
                        alt="Ilustrasi"
                        className="w-44 h-auto object-contain"
                    />
                </div>
            </header>

            <main className="flex-grow flex flex-col justify-center p-8">
                <div className="w-full">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        Lupa Kata Sandi
                    </h1>
                    <p className="text-center text-gray-600 text-sm mb-8">
                        Jangan khawatir! Masukkan email Anda di bawah ini dan
                        kami akan mengirimkan tautan untuk mengatur ulang kata
                        sandi Anda.
                    </p>

                    {status ? (
                        <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
                            {status}
                            <p className="text-xs mt-2">
                                Silakan periksa kotak masuk atau folder spam
                                Anda.
                            </p>
                        </div>
                    ) : (
                        <form
                            className="space-y-4"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <MailIcon />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Masukkan alamat email Anda"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Kirim Tautan Reset
                            </button>
                        </form>
                    )}

                    {errors && !status && (
                        <div className="text-red-600 text-xs mt-3 text-center">
                            {errors.email ? errors.email[0] : errors.message}
                        </div>
                    )}

                    <div className="text-center text-sm text-gray-600 mt-8">
                        Ingat kata sandi?{" "}
                        <Link
                            to="/login"
                            className="text-sky-500 font-semibold hover:underline"
                        >
                            Masuk di sini
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
