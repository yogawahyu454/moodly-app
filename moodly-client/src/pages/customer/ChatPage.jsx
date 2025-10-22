import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT BARU

// Komponen MobileLayout sekarang didefinisikan di file yang sama
const MobileLayout = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col border-x">
        {children}
      </div>
    </div>
  );
}

// Ikon panah kembali (ChevronLeft) dalam format SVG
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

// Ikon Kirim (Panah Kanan)
const SendIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
    </svg>
);


export default function ChatPage() {
    const navigate = useNavigate(); // <-- Tambahkan hook useNavigate
    const [messages, setMessages] = useState([]); // Pesan awal kosong
    const [input, setInput] = useState("");
    const [isChatEnded, setIsChatEnded] = useState(false);
    const messagesEndRef = useRef(null); // Ref untuk auto-scroll

    // Dummy data untuk awal chat (bisa diganti data asli)
    useEffect(() => {
        setMessages([
            { sender: "psychologist", text: "Halo! Selamat datang di sesi konseling kita. Ada yang bisa saya bantu hari ini?" },
            { sender: "user", text: "Halo dok, saya merasa agak cemas akhir-akhir ini." },
            { sender: "psychologist", text: "Terima kasih sudah berbagi. Bisa ceritakan lebih lanjut tentang apa yang membuat Anda merasa cemas?" },
        ]);
    }, []);

    // Auto-scroll ke pesan terbaru
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim() || isChatEnded) return;

        const newMessages = [
            ...messages,
            { sender: "user", text: input.trim() },
            // Simulate psychologist response (for demo)
            { sender: "psychologist", text: "Saya mengerti..." }
        ];
        setMessages(newMessages);
        setInput("");

        // Demo logic to end chat after a few messages
        if (newMessages.length > 8) {
             setTimeout(() => setIsChatEnded(true), 1000);
        }
    };

    return (
        <MobileLayout>
            {/* Header */}
            <header className="bg-[#00A9E0] text-white flex items-center justify-between p-4 shadow-md sticky top-0 z-10">
                {/* --- PERBAIKAN DI SINI --- */}
                <button onClick={() => navigate(-1)} className="text-white p-2"> {/* Tambahkan onClick */}
                    <ChevronLeftIcon />
                </button>
                <div className="flex items-center flex-grow justify-center mr-12"> {/* Wrap info psikolog */}
                    <img
                        src="https://placehold.co/40x40/EBF8FF/3B82F6?text=JA" // Ganti dengan gambar asli jika ada
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/EBF8FF/7F9CF5?text=P"; }}
                        alt="Psikolog"
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                        <h2 className="font-semibold text-sm leading-tight">
                            Jenaya Adinna, M.Psi., Psikolog
                        </h2>
                        <span className="text-xs text-white/80 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                            Online
                        </span>
                    </div>
                </div>
                {/* <div className="w-10"></div> Placeholder agar judul tengah */}
            </header>

            {/* Chat area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB]">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        } items-end`}
                    >
                        {msg.sender === "psychologist" && (
                            <img
                                src="https://placehold.co/32x32/EBF8FF/3B82F6?text=JA" // Ganti dengan gambar asli jika ada
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/EBF8FF/7F9CF5?text=P"; }}
                                alt="Psikolog"
                                className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                        )}

                        <div
                            className={`whitespace-pre-line px-4 py-3 text-sm leading-relaxed text-white max-w-[75%] shadow-sm ${
                                msg.sender === "user"
                                    ? "bg-[#4C6ED7] rounded-2xl rounded-br-none"
                                    : "bg-[#175694] rounded-2xl rounded-bl-none"
                            }`}
                        >
                            {msg.text}
                        </div>

                        {msg.sender === "user" && (
                            <img
                                src="https://placehold.co/32x32/E2E8F0/4A5568?text=U" // Ganti dengan gambar asli user jika ada
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/EBF8FF/7F9CF5?text=U"; }}
                                alt="User"
                                className="w-8 h-8 rounded-full ml-2 object-cover"
                            />
                        )}
                    </div>
                ))}
                {/* Ref element untuk scroll */}
                <div ref={messagesEndRef} />

                {/* Pesan penutup jika chat selesai */}
                {isChatEnded && (
                    <div className="flex flex-col items-center text-center mt-6">
                         {/* Gunakan Link dari react-router-dom jika sudah terinstall */}
                        <button
                             // Menggunakan ID dummy '123', ganti dengan ID sesi chat yang sebenarnya
                            onClick={() => navigate("/beri-nilai/123")}
                            className="bg-[#706E6E] text-white text-sm font-medium px-6 py-2 rounded-md shadow-sm hover:bg-[#5a5959] transition mb-4"
                        >
                            Beri Penilaian
                        </button>


                        <div className="border border-[#00A9E0] rounded-lg bg-white p-3 text-xs text-gray-600 leading-relaxed w-full">
                            <p>
                                Sesi chat ini telah berakhir. Jika Anda
                                membutuhkan bantuan lebih lanjut, silakan
                                menjadwalkan sesi baru melalui aplikasi.
                                Terima kasih telah menggunakan layanan kami.
                            </p>
                        </div>
                    </div>
                )}
            </main>

            {/* Input area */}
            {!isChatEnded && (
                <form
                    onSubmit={sendMessage}
                    className="p-4 bg-gray-100 border-t sticky bottom-0 flex items-center space-x-3"
                >
                    <div className="flex-grow bg-white rounded-full flex items-center shadow-sm border border-gray-200">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Tulis pesan..."
                            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 px-5 py-3 text-sm" // Adjusted padding and text size
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#00A9E0] hover:bg-[#0091D5] text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-300 flex-shrink-0 shadow-md active:scale-95"
                    >
                       <SendIcon/>
                    </button>
                </form>
            )}
        </MobileLayout>
    );
}

