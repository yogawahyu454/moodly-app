import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// --- Komponen Ikon ---
// Icon Panah Kiri (SVG)
function ArrowLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
}
// --- Akhir Komponen Ikon ---

// Ganti nama export default
export default function HelpPage() {
    const navigate = useNavigate(); // Hook untuk navigasi

    // Daftar FAQ statis (bisa diganti dari API nanti)
    const faqs = [
        "Apa yang harus dilakukan jika lupa kata sandi?",
        "Bagaimana cara memulai sesi curhat?",
        "Bagaimana cara berlangganan pro?",
        "Berapa lama durasi sesi curhat?",
        "Apa yang terjadi jika saya terlambat?",
    ];

    // Fungsi navigasi saat FAQ dipilih
    const handleSelectFAQ = (faqItem) => {
        // Arahkan ke halaman FAQ, bisa kirim pertanyaan via state
        navigate("/help/faq", { state: { question: faqItem } });
        console.log("Selected FAQ:", faqItem);
    };

    // Fungsi navigasi saat tombol Kontak diklik
    const handleContactNow = () => {
        navigate("/help/chat-admin");
    };

    return (
        // Hapus MobileLayout wrapper
        <>
            {/* Header dengan tombol kembali */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10 border-b">
                <button
                    onClick={() => navigate(-1)} // Tombol kembali
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                </button>
                {/* Judul dihapus dari sini karena sudah ada di konten */}
                <h1 className="text-lg font-bold text-gray-800 mx-auto pr-8">
                    Pusat Bantuan {/* Atau biarkan kosong jika tidak perlu */}
                </h1>
            </header>

            {/* Area biru dan ilustrasi */}
            <div className="relative w-full bg-gray-50">
                {" "}
                {/* Background abu-abu muda */}
                {/* Latar belakang biru */}
                <div className="bg-sky-400 w-full h-40 rounded-b-[40%]" />{" "}
                {/* Sedikit lebih datar */}
                {/* Gambar ilustrasi */}
                <img
                    src="images/3.png" // Pastikan path ini benar relatif dari public/
                    alt="Help Illustration"
                    className="absolute left-1/2 -translate-x-1/2 top-4 w-36 h-auto drop-shadow-lg" // Lebih kecil
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/144x144/E0F2FE/FFFFFF?text=Help";
                    }} // Fallback
                />
            </div>

            {/* Konten */}
            {/* Beri background abu2 muda dan padding */}
            <div className="flex flex-col items-center text-center px-4 pt-24 pb-4 flex-grow bg-gray-50 -mt-16">
                {" "}
                {/* Tarik ke atas */}
                {/* Judul */}
                <h1 className="text-2xl font-extrabold text-gray-900">
                    Pusat Bantuan
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    Bagaimana Kami Dapat Membantu Anda?
                </p>
                {/* FAQ */}
                <div className="mt-7 w-full max-w-md">
                    {" "}
                    {/* Batasi lebar */}
                    <div className="border border-gray-300 rounded-lg divide-y divide-gray-300 bg-white text-left shadow-sm">
                        <div className="flex items-center px-4 py-3 gap-2 bg-gray-50 rounded-t-lg">
                            {" "}
                            {/* Header FAQ */}
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-400">
                                <span className="text-xs font-semibold text-gray-600">
                                    ?
                                </span>
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">
                                FAQ
                            </span>
                        </div>
                        {faqs.map((item, i) => (
                            <button
                                key={i}
                                className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                onClick={() => handleSelectFAQ(item)} // Panggil handleSelectFAQ
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Tombol Hubungi Sekarang */}
                <button
                    onClick={handleContactNow} // Panggil handleContactNow
                    className="w-full max-w-md mt-8 mb-8 bg-sky-500 text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-sky-600 transition-all shadow-md"
                >
                    Hubungi Sekarang
                </button>
            </div>
        </>
    );
}
