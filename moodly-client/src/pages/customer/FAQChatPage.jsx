import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// --- Komponen & Ikon Bantuan ---
const MobileLayout = ({ children }) => (
  <div className="flex justify-center min-h-screen bg-[#FFF9F8]">
    <div className="w-full max-w-md min-h-screen bg-[#FFF9F8] flex flex-col">
      {children}
    </div>
  </div>
);

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

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 ml-1"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

// --- Komponen Utama ---
export default function FAQChatPage() {
  const { faqId } = useParams();
  const navigate = useNavigate();
  const faqText = faqId ? decodeURIComponent(faqId) : null;

  const answers = {
    "Apa yang harus dilakukan jika lupa kata sandi?":
      "Jika kamu lupa kata sandi kamu bisa masuk ke profile lalu akan ada pilihan menu lupa kata sandi. Pilih menu tersebut dan kamu akan di arahkan untuk membuat kata sandi baru.",
    "Bagaimana cara memulai sesi curhat?":
      "Untuk memulai sesi curhat, kembali ke Beranda, pilih psikolog, dan jadwalkan sesi.",
    "Bagaimana cara berlangganan pro?":
      "Berlangganan pro dapat dilakukan di menu 'Profile' dengan memilih paket yang diinginkan.",
    "Berapa lama durasi sesi curhat?":
      "Durasi standar untuk sesi curhat adalah 60 menit.",
    "Apa yang terjadi jika saya terlambat?":
      "Jika terlambat lebih dari 15 menit, sesi akan dianggap hangus. Harap hubungi admin jika ada kendala.",
  };

  const faqAnswer = faqText ? answers[faqText] || "Pertanyaan tidak ditemukan" : null;

  const [messages, setMessages] = useState(() => {
    if (faqText) {
      return [
        { sender: "user", text: faqText },
        { sender: "admin", text: faqAnswer },
      ];
    }
    return [];
  });

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: inputText.trim() }]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <MobileLayout>
      {/* --- Warna biru untuk latar belakang --- */}
      <div className="flex flex-col h-full w-full bg-[#00D1FF]">
        {/* Header tetap di atas (sticky) */}
        <header className="w-full p-4 pt-8 sticky top-0 z-20 bg-[#00D1FF]">
          <div className="flex items-center gap-4">
            <button className="text-white" onClick={() => navigate(-1)}>
              <BackArrowIcon />
            </button>
            <img
              src="/images/Admin_Moodly.png"
              alt="Admin Avatar"
              className="w-12 h-12 rounded-full object-cover scale-[1.5]"
              style={{ borderRadius: "9999px" }}
            />
            <div>
              <h1 className="font-semibold text-white text-base">Admin Moodly</h1>
              <p className="text-xs text-white/90">Online</p>
            </div>
          </div>
        </header>

        {/* Kontainer putih untuk isi chat */}
        <div className="flex-1 flex flex-col bg-white pt-8 z-10 rounded-t-[2.5rem] overflow-y-auto">
          {/* Chat area */}
          <main className="flex-1 p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "rounded-tr-none bg-white text-gray-800 border-2 border-black"
                      : "rounded-tl-none bg-white text-gray-800 border-2 border-black"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </main>

          {/* Input bawah */}
          <footer className="bg-white p-4 sticky bottom-0">
            <div className="flex items-center space-x-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 w-full px-5 py-3 bg-white border-2 border-black rounded-xl focus:outline-none resize-none"
                rows={1}
                placeholder="Ketik pesan..."
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-[#00D1FF] text-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-black flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Kirim Pesan"
              >
                <PlayIcon />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </MobileLayout>
  );
}
