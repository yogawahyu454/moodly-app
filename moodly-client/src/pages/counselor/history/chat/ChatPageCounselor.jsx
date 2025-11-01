import React, { useState } from "react";

// Komponen MobileLayout
const MobileLayout = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col border-x">
        {children}
      </div>
    </div>
  );
};

// Dummy Link
const DummyLink = ({ to, children }) => <a href={to}>{children}</a>;

export default function ChatPage() {
  const [messages, setMessages] = useState([]); // pesan awal kosong
  const [input, setInput] = useState("");
  const [isChatEnded, setIsChatEnded] = useState(false); // ubah ke true untuk cek tampilan akhir

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input.trim() },
    ];
    setMessages(newMessages);
    setInput("");
  };

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.hash = path;
  };

  return (
    <MobileLayout>
      {/* Header */}
      <header className="bg-[#00A9E0] text-white flex items-center justify-between p-4 shadow-md sticky top-0 z-10">
        <div className="flex items-center">
          {/* Tombol Panah Kembali */}
          <button
            onClick={() => window.history.back()}
            className="mr-3 p-1 hover:bg-[#0091D5]/30 rounded-full transition"
          >
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <img
            src="images/user_chat.png"
            alt="Psikolog"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h2 className="font-semibold text-sm leading-tight">
              Indira Rahmania
            </h2>
            <span className="text-xs text-white/80 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
              Online
            </span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } items-end`}
          >
            {msg.sender === "psychologist" && (
              <img
                src="images/user_chat.png"
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
                src="images/jenaya.jpg"
                alt="User"
                className="w-8 h-8 rounded-full ml-2 object-cover"
              />
            )}
          </div>
        ))}

        {/* Pesan penutup jika sesi selesai */}
        {isChatEnded && (
          <div className="flex flex-col items-center text-center mt-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#FFD700] via-[#FFEA94] to-[#FFF8DC] border border-[#E6C200] rounded-2xl shadow-md p-5 text-gray-800 leading-relaxed w-full">
              <p className="font-semibold text-[15px]">
                ✨ Sesi percakapan telah selesai.
              </p>
              <p className="mt-2 text-sm">
                Terima kasih atas pendampingan Anda hari ini.
              </p>
              <p className="mt-1 text-sm">
                Anda dapat melihat riwayat atau membuat jadwal sesi berikutnya
                melalui dashboard konselor.
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
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 px-5 py-3"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00A9E0] hover:bg-[#0091D5] text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-300 flex-shrink-0 shadow-md active:scale-95"
          >
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
          </button>
        </form>
      )}
    </MobileLayout>
  );
}
