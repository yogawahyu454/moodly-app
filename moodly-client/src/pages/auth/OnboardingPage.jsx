import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Data untuk konten slide (tidak ada perubahan)
const slides = [
    { image: "/images/3.png", title: "MOODLY", description: null },
    {
        image: "/images/4.png",
        title: "Aplikasi Moodly",
        description:
            "Aplikasi Moodly mendengarkan keluh kesah Anda melalui chat, voice call, atau video meeting.",
    },
    {
        image: "/images/2.png",
        title: "Pendampingan Psikolog",
        description:
            "Psikolog membantu mengatasi masalah emosional dan menjaga kesehatan mental agar Anda lebih siap menghadapi tantangan hidup.",
    },
    {
        image: "/images/1.png",
        title: "Catatan Harian",
        description:
            "Psikolog membantu Anda memahami dan mengelola emosi, serta menjaga kesehatan mental untuk menghadapi tantangan hidup.",
    },
];

// Komponen ikon (sudah diperbaiki)
function ArrowIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
        >
            <path
                d="M9 18l6-6-6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function OnboardingPage() {
    const [step, setStep] = useState(0);

    const next = () => setStep((s) => Math.min(s + 1, slides.length));
    const skip = () => setStep(slides.length);

    // Efek untuk transisi otomatis di halaman pertama setelah 3 detik
    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => {
                next();
            }, 3000); // 3 detik
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Layar terakhir (Masuk/Daftar)
    if (step === slides.length) {
        return (
            <div className="min-h-screen bg-[#00A9E0] flex flex-col justify-center items-center p-8 text-center text-white">
                <h1 className="text-3xl font-bold font-poppins">MOODLY</h1>
                <p className="mt-2 mb-10 max-w-xs">
                    Cerita kamu penting. Temukan jalan keluarnya bersama Moodly.
                </p>
                <img
                    src="/images/3.png"
                    alt="Ilustrasi Moodly"
                    className="w-60 mx-auto mb-10"
                />
                <div className="flex flex-col space-y-3 w-full max-w-xs">
                    <Link
                        to="/login"
                        className="bg-black text-white py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    >
                        Masuk
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white text-black py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Daftar
                    </Link>
                </div>
            </div>
        );
    }

    const currentSlide = slides[step];
    const isLastOnboardingSlide = step === slides.length - 1;

    // Tampilan slide onboarding
    return (
        <div className="min-h-screen bg-[#00A9E0] flex flex-col justify-between p-8 text-white">
            {/* Header: Hanya tampil jika bukan slide pertama */}
            <header className="text-center h-6">
                {step > 0 && (
                    <h1 className="text-xl font-bold font-poppins">MOODLY</h1>
                )}
            </header>

            {/* Konten Utama */}
            <main className="flex-grow flex flex-col justify-center items-center text-center">
                {isLastOnboardingSlide && (
                    <>
                        <h2 className="text-2xl font-bold mb-3">
                            {currentSlide.title}
                        </h2>
                        <p className="max-w-xs text-center mb-8">
                            {currentSlide.description}
                        </p>
                    </>
                )}
                <img
                    src={currentSlide.image}
                    alt="Ilustrasi"
                    className="w-[250px] mx-auto"
                />
                {step === 0 && (
                    <h1 className="text-3xl font-bold font-poppins mt-8">
                        {currentSlide.title}
                    </h1>
                )}
                {step > 0 && !isLastOnboardingSlide && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-3">
                            {currentSlide.title}
                        </h2>
                        <p className="max-w-xs text-center">
                            {currentSlide.description}
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <div className="h-28 relative">
                {step > 0 && !isLastOnboardingSlide && (
                    <div className="flex justify-center items-center space-x-2 my-4">
                        {slides.map((_, index) =>
                            index > 0 && index < slides.length - 1 ? (
                                <div
                                    key={index}
                                    className={`rounded-full transition-all ${
                                        step === index
                                            ? "w-2.5 h-2.5 bg-white"
                                            : "w-2 h-2 bg-white/50"
                                    }`}
                                ></div>
                            ) : null
                        )}
                    </div>
                )}
                {isLastOnboardingSlide && (
                    <button
                        className="w-full bg-white text-sky-500 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                        onClick={next}
                    >
                        Mulai
                    </button>
                )}
                {step > 0 && !isLastOnboardingSlide && (
                    <>
                        <div className="absolute inset-x-0 bottom-5 flex justify-center">
                            <button
                                className="bg-white text-sky-500 rounded-full p-2.5 shadow-lg"
                                onClick={next}
                                aria-label="Berikutnya"
                            >
                                <ArrowIcon />
                            </button>
                        </div>
                        <button
                            className="absolute bottom-6 right-0 font-semibold"
                            onClick={skip}
                        >
                            Lewati
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
