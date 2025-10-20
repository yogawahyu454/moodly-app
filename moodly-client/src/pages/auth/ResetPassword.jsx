import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function ResetPasswordPage() {
    const { state } = useLocation();
    const email = state?.email || "";
    const navigate = useNavigate();

    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [err, setErr] = useState("");

    const strongEnough = (s) =>
        s.length >= 8 && /[A-Z]/.test(s) && /\d/.test(s);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!strongEnough(p1)) {
            setErr("Minimal 8 karakter, kombinasi huruf besar dan angka.");
            return;
        }
        if (p1 !== p2) {
            setErr("Konfirmasi kata sandi tidak cocok.");
            return;
        }
        setErr("");
        // TODO: panggil API untuk set password baru
        console.log("Password baru disimpan:", p1);
        alert("Kata sandi berhasil diatur ulang!");
        navigate("/login");
    };

    const contentWidth = "max-w-md";

    return (
        <div className="flex min-h-screen bg-white">
            {/* Panel Putih Kiri (Hanya muncul di desktop) */}
            <div className="flex-1 hidden md:block"></div>

            {/* Konten Utama di Tengah */}
            <div
                className={`w-full ${contentWidth} min-h-screen bg-white shadow-2xl flex flex-col`}
            >
                {/* Header dengan Kurva Biru dan Ilustrasi */}
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
                    <div className="relative z-10 flex justify-center items-start h-full pt-12">
                        <img
                            src="/images/3.png"
                            alt="Ilustrasi"
                            className="w-44 h-auto object-contain"
                        />
                    </div>
                </header>

                {/* Konten Atur Ulang Kata Sandi */}
                <main className="flex-grow flex flex-col justify-center p-8">
                    <div className="w-full">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                            Atur Ulang Kata Sandi
                        </h1>
                        <p className="text-center text-gray-600 text-sm mb-6">
                            {email
                                ? `Untuk ${email}`
                                : "Masukkan kata sandi baru Anda."}
                        </p>

                        <form
                            className="space-y-4"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            {/* Kata Sandi Baru */}
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <LockIcon />
                                </span>
                                <input
                                    type={show1 ? "text" : "password"}
                                    placeholder="Kata Sandi Baru"
                                    value={p1}
                                    onChange={(e) => setP1(e.target.value)}
                                    autoFocus
                                    required
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShow1((s) => !s)}
                                    aria-label={
                                        show1
                                            ? "Sembunyikan kata sandi"
                                            : "Tampilkan kata sandi"
                                    }
                                >
                                    {show1 ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>

                            {/* Konfirmasi Kata Sandi */}
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <LockIcon />
                                </span>
                                <input
                                    type={show2 ? "text" : "password"}
                                    placeholder="Konfirmasi Kata Sandi Baru"
                                    value={p2}
                                    onChange={(e) => setP2(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShow2((s) => !s)}
                                    aria-label={
                                        show2
                                            ? "Sembunyikan kata sandi"
                                            : "Tampilkan kata sandi"
                                    }
                                >
                                    {show2 ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>

                            {/* Pesan error */}
                            {err && (
                                <div className="text-red-600 text-xs text-center pt-1">
                                    {err}
                                </div>
                            )}
                            {!err && (
                                <div className="text-gray-500 text-xs text-center pt-1">
                                    Minimal 8 karakter, dengan huruf besar &
                                    angka.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 !mt-6 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Simpan Kata Sandi
                            </button>
                        </form>

                        <div className="text-center text-sm text-gray-600 mt-8">
                            <Link
                                to="/login"
                                className="text-sky-500 font-semibold hover:underline"
                            >
                                Kembali ke Halaman Masuk
                            </Link>
                        </div>
                    </div>
                </main>
            </div>

            {/* Panel Putih Kanan (Hanya muncul di desktop) */}
            <div className="flex-1 hidden md:block"></div>
        </div>
    );
}

// --- Komponen Ikon ---

function LockIcon() {
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    );
}
