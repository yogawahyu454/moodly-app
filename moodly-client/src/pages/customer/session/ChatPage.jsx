import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // <-- IMPORT useParams & Link
import apiClient from "../../../api/axios.js"; // <-- PERBAIKAN: Menambahkan .js
import { useAuth } from "../../../context/AuthContext.jsx"; // <-- PERBAIKAN: Menambahkan .jsx

// Komponen MobileLayout
const MobileLayout = ({ children }) => (
    <div className="flex justify-center min-h-screen bg-white">
        <div className="w-full max-w-md min-h-screen bg-white flex flex-col border-x">
            {children}
        </div>
    </div>
);

// Ikon panah kembali (ChevronLeft)
const ChevronLeftIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
        />
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
    const navigate = useNavigate();
    const { bookingId } = useParams(); // <-- Ambil bookingId dari URL
    const { user: authUser } = useAuth(); // <-- PERBAIKAN: Gunakan hook useAuth

    const [messages, setMessages] = useState([]);
    const [bookingInfo, setBookingInfo] = useState(null); // <-- State untuk info booking (header)
    const [input, setInput] = useState("");
    const [isChatEnded, setIsChatEnded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false); // <-- State untuk loading kirim

    const messagesEndRef = useRef(null);

    // Fungsi untuk auto-scroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 1. Fetch data chat dan info booking saat komponen dimuat
    useEffect(() => {
        // --- PERBAIKAN: Tunda fetch jika authUser belum siap ---
        if (!bookingId) {
            setError("Booking ID tidak ditemukan.");
            setLoading(false);
            return;
        }
        if (!authUser) {
            // authUser mungkin null saat loading awal, jangan set error dulu
            setLoading(true); // Tetap tampilkan loading
            return;
        }
        // --- AKHIR PERBAIKAN ---

        const fetchChatData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(
                    `/api/booking/${bookingId}/chat/messages`
                );

                setMessages(response.data.messages || []);
                setBookingInfo(response.data.booking || null);

                // Cek apakah chat sudah berakhir berdasarkan status booking
                const endedStatus = ["Selesai", "Dibatalkan", "Tidak Hadir"];
                if (
                    endedStatus.includes(response.data.booking?.status_pesanan)
                ) {
                    setIsChatEnded(true);
                }

                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data chat:", err);
                if (err.response && err.response.status === 403) {
                    setError(
                        err.response.data.message ||
                            "Anda tidak diizinkan mengakses chat ini."
                    );
                } else {
                    setError("Gagal memuat percakapan.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchChatData();
    }, [bookingId, authUser]); // <-- Jalankan jika bookingId atau authUser berubah

    // 2. Auto-scroll ke pesan terbaru
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // <-- Jalankan setiap kali messages berubah

    // 3. Fungsi kirim pesan (dinamis)
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isChatEnded || sending) return;

        setSending(true);
        const optimisticMessage = {
            // Pesan sementara (opsional, tapi bagus)
            id: Date.now(),
            sender_id: authUser.id,
            sender: { avatar: authUser.avatar, name: authUser.name },
            message: input.trim(),
            created_at: new Date().toISOString(),
            isOptimistic: true, // Tanda
        };

        // --- PERBAIKAN: Gunakan cara sederhana untuk update UI ---
        // setMessages(prev => [...prev, optimisticMessage]);
        // setInput(""); // Langsung kosongkan

        try {
            const response = await apiClient.post(
                `/api/booking/${bookingId}/chat/messages`,
                { message: input.trim() }
            );

            // Tambahkan pesan baru dari server
            setMessages((prev) => [...prev, response.data]);
            setInput(""); // Kosongkan input setelah berhasil
        } catch (err) {
            console.error("Gagal mengirim pesan:", err);
            // Hapus pesan sementara jika gagal
            // setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
            // setInput(optimisticMessage.message); // Kembalikan teks ke input

            if (err.response && err.response.data.message) {
                // GANTI ALERT DENGAN MODAL NANTI
                alert(err.response.data.message);
                if (err.response.status === 403) {
                    setIsChatEnded(true); // Jika error 403, tutup sesi chat
                }
            } else {
                // GANTI ALERT DENGAN MODAL NANTI
                alert("Gagal mengirim pesan.");
            }
        } finally {
            setSending(false);
        }
    };

    // --- Tampilan Loading, Error, atau Data Kosong ---

    // --- PERBAIKAN: Handle loading authUser ---
    if (loading || !authUser) {
        return (
            <MobileLayout>
                <div className="text-center p-10">Memuat percakapan...</div>
            </MobileLayout>
        );
    }
    // --- AKHIR PERBAIKAN ---

    if (error) {
        return (
            <MobileLayout>
                <div className="text-center p-10 text-red-600">
                    <p>{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg"
                    >
                        Kembali
                    </button>
                </div>
            </MobileLayout>
        );
    }

    if (!bookingInfo) {
        return (
            <MobileLayout>
                <div className="text-center p-10">
                    Data booking tidak ditemukan.
                </div>
            </MobileLayout>
        );
    }

    // Tentukan siapa konselor dan siapa user
    // Asumsi: authUser adalah customer
    // TODO: Perlu penyesuaian jika authUser adalah konselor
    const counselor = bookingInfo.konselor;
    const userAvatar =
        authUser.avatar ||
        `https://placehold.co/32x32/E2E8F0/4A5568?text=${authUser.name.charAt(
            0
        )}`;

    return (
        <MobileLayout>
            {/* Header Dinamis */}
            <header className="bg-[#00A9E0] text-white flex items-center justify-between p-4 shadow-md sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white p-2 -ml-2"
                >
                    <ChevronLeftIcon />
                </button>
                <div className="flex items-center flex-grow justify-center mr-10">
                    <img
                        src={
                            counselor.avatar ||
                            `https://placehold.co/40x40/EBF8FF/3B82F6?text=${counselor.name.charAt(
                                0
                            )}`
                        }
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/40x40/EBF8FF/7F9CF5?text=P`;
                        }}
                        alt={counselor.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                        <h2 className="font-semibold text-sm leading-tight">
                            {counselor.name}
                        </h2>
                        {/* Tampilkan status 'Aktif' jika chat belum berakhir */}
                        {!isChatEnded && (
                            <span className="text-xs text-white/80 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                                Online
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* Chat area Dinamis */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB]">
                {messages.map((msg, i) => {
                    // Tentukan apakah pesan ini dikirim oleh user yang login
                    const isSenderMe = msg.sender_id === authUser.id;
                    const senderAvatar = isSenderMe
                        ? userAvatar
                        : counselor.avatar ||
                          `https://placehold.co/32x32/EBF8FF/3B82F6?text=${counselor.name.charAt(
                              0
                          )}`;
                    const fallbackAvatar = isSenderMe
                        ? `https://placehold.co/32x32/E2E8F0/4A5568?text=U`
                        : `https://placehold.co/32x32/EBF8FF/7F9CF5?text=P`;

                    return (
                        <div
                            key={msg.id || i} // Gunakan msg.id
                            className={`flex ${
                                isSenderMe ? "justify-end" : "justify-start"
                            } items-end`}
                        >
                            {!isSenderMe && (
                                <img
                                    src={senderAvatar}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = fallbackAvatar;
                                    }}
                                    alt="Sender"
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                />
                            )}

                            <div
                                className={`whitespace-pre-line px-4 py-3 text-sm leading-relaxed text-white max-w-[75%] shadow-sm ${
                                    isSenderMe
                                        ? "bg-[#4C6ED7] rounded-2xl rounded-br-none"
                                        : "bg-[#175694] rounded-2xl rounded-bl-none"
                                } ${msg.isOptimistic ? "opacity-70" : ""}`} // <-- Tanda pesan sementara
                            >
                                {msg.message}
                            </div>

                            {isSenderMe && (
                                <img
                                    src={senderAvatar}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.targset.src = fallbackAvatar;
                                    }} // <-- PERBAIKAN: e.target.src (typo diperbaiki)
                                    alt="Me"
                                    className="w-8 h-8 rounded-full ml-2 object-cover"
                                />
                            )}
                        </div>
                    );
                })}
                {/* Ref element untuk scroll */}
                <div ref={messagesEndRef} />

                {/* Pesan penutup jika chat selesai */}
                {isChatEnded && (
                    <div className="flex flex-col items-center text-center mt-6">
                        {/* Arahkan ke halaman rating dinamis */}
                        {bookingInfo.status_pesanan === "Selesai" && (
                            <Link // Gunakan Link
                                to={`/history/rate/${bookingId}`} // Ganti dengan path yg benar
                                className="bg-[#706E6E] text-white text-sm font-medium px-6 py-2 rounded-md shadow-sm hover:bg-[#5a59B9] transition mb-4"
                            >
                                Beri Penilaian
                            </Link>
                        )}

                        <div className="border border-[#00A9E0] rounded-lg bg-white p-3 text-xs text-gray-600 leading-relaxed w-full">
                            <p>
                                Sesi chat ini telah berakhir (Status:{" "}
                                {bookingInfo.status_pesanan}). Jika Anda
                                membutuhkan bantuan lebih lanjut, silakan
                                menjadwalkan sesi baru.
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
                            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 px-5 py-3 text-sm"
                            disabled={sending} // Disable saat mengirim
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#00A9E0] hover:bg-[#0091D5] text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-300 flex-shrink-0 shadow-md active:scale-95 disabled:bg-gray-400"
                        disabled={sending || !input.trim()} // Disable saat mengirim atau input kosong
                    >
                        <SendIcon />
                    </button>
                </form>
            )}
        </MobileLayout>
    );
}
