import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function VerifyCode() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email || "";
    const [codes, setCodes] = useState(Array(6).fill(""));
    const [seconds, setSeconds] = useState(60);
    const inputsRef = useRef([]);

    useEffect(() => {
        inputsRef.current?.[0]?.focus();
    }, []);

    useEffect(() => {
        if (seconds <= 0) return;
        const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [seconds]);

    const onChange = (i, v) => {
        if (!/^\d?$/.test(v)) return;
        const next = [...codes];
        next[i] = v;
        setCodes(next);
        if (v && i < 5) inputsRef.current[i + 1].focus();
    };

    const onKeyDown = (i, e) => {
        if (e.key === "Backspace" && !codes[i] && i > 0) {
            inputsRef.current[i - 1].focus();
        }
    };

    const onPaste = (e) => {
        const txt = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);
        if (!txt) return;
        const next = Array(6).fill("");
        for (let i = 0; i < txt.length; i++) next[i] = txt[i];
        setCodes(next);
        const idx = Math.min(txt.length, 5);
        inputsRef.current[idx]?.focus();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const code = codes.join("");
        if (code.length !== 6) return;
        // TODO: verify code ke API
        navigate("/reset-password", { state: { email } });
    };

    const resend = () => {
        if (seconds > 0) return;
        // TODO: request ulang OTP
        setSeconds(60);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <main className="content py-6">
                    <h1 className="text-3xl font-semibold text-center text-gray-800">
                        Silahkan periksa email anda
                    </h1>
                    <p className="text-sm text-center text-gray-500 mt-2 mb-6">
                        Kami telah mengirimkan kode ke{" "}
                        <b>{email || "(email Anda)"}</b>
                    </p>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="flex justify-between space-x-2">
                            {codes.map((c, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputsRef.current[i] = el)}
                                    value={c}
                                    onChange={(e) =>
                                        onChange(i, e.target.value)
                                    }
                                    onKeyDown={(e) => onKeyDown(i, e)}
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    aria-label={`Digit ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Verify
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Kirim ulang kode{" "}
                        <button
                            type="button"
                            onClick={resend}
                            className={`font-semibold ${
                                seconds === 0
                                    ? "text-blue-500 cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                            aria-disabled={seconds !== 0}
                        >
                            {seconds === 0
                                ? "sekarang"
                                : `00:${String(seconds).padStart(2, "0")}`}
                        </button>
                    </p>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Salah email?{" "}
                        <Link
                            to="/forgot-password"
                            className="text-blue-500 hover:underline"
                        >
                            Ubah
                        </Link>
                    </p>
                </main>
            </div>
        </div>
    );
}
