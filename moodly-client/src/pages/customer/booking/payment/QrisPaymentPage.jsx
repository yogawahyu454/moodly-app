import React, { useRef } from 'react'; // Import useRef
import { useLocation, useNavigate } from 'react-router-dom';

// --- Komponen Ikon ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-800 group-hover:text-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
// --- Akhir Komponen Ikon ---

function QrisPaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const qrImageRef = useRef(null); // Ref untuk elemen gambar QR

    // --- Ambil data dari state navigasi ---
    const { qrCodeUrl, orderId, totalPayment } = location.state || {};

    // --- Jika data QR tidak ada, gunakan placeholder ---
    if (!qrCodeUrl) {
        console.warn("QR Code URL tidak ditemukan di location.state. Menggunakan placeholder.");
    }
    const qrCodeToDisplay = qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ContohDataQRIS_Order_${orderId || '123'}`;

    const handleBack = () => navigate(-1); // Kembali ke halaman sebelumnya

    // --- PERBAIKAN: Fungsi untuk menyimpan QR Code ---
    const handleSaveQR = async () => {
        if (!qrImageRef.current) {
            alert("Gambar QR tidak ditemukan.");
            return;
        }

        const imageUrl = qrImageRef.current.src;

        try {
            // 1. Fetch gambar sebagai blob
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Gagal mengambil gambar QR: ${response.statusText}`);
            }
            const blob = await response.blob();

            // 2. Buat Object URL dari blob
            const url = window.URL.createObjectURL(blob);

            // 3. Buat link sementara
            const link = document.createElement('a');
            link.href = url;
            // Tentukan nama file saat di-download
            link.download = `qris_payment_${orderId || Date.now()}.png`; // Nama file dinamis

            // 4. Tambahkan link ke body (agar bisa diklik) & klik
            document.body.appendChild(link);
            link.click();

            // 5. Hapus link & revoke object URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error saat menyimpan QR Code:", error);
            alert("Gagal menyimpan gambar QR Code. Silakan coba screenshot manual.");
            // Tampilkan pesan error yang lebih baik jika perlu
        }
    };
    // --- AKHIR PERBAIKAN ---

    return (
        <div className="font-sans bg-cyan-500 min-h-screen max-w-md mx-auto">
            {/* 1. Header (Putih) */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10 text-gray-800">
                <button onClick={handleBack} className="p-1 -ml-1 mr-2 group">
                    <BackArrowIcon />
                </button>
                <h1 className="text-lg font-bold m-0 flex-1 text-center">
                    Bayar Dengan QRIS
                </h1>
                <div className="w-6 h-6 mr-2 opacity-0"></div>
            </header>

            {/* 2. Konten Utama */}
            <main className="p-4 flex flex-col items-center pt-10">
                {/* Kartu Putih */}
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Scan QR Anda
                    </h2>

                    {/* Container QR Code */}
                    <div className="relative inline-block p-1 border-2 border-dashed border-cyan-400 rounded-lg mb-8">
                         {/* Garis sudut */}
                        <span className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-cyan-500"></span>
                        <span className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-cyan-500"></span>
                        <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-cyan-500"></span>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-cyan-500"></span>

                        {/* --- PERBAIKAN: Tambahkan ref ke img --- */}
                        <img
                            ref={qrImageRef} // Tambahkan ref di sini
                            src={qrCodeToDisplay}
                            alt="QR Code Pembayaran"
                            className="w-full max-w-[200px] h-auto aspect-square block mx-auto"
                            crossOrigin="anonymous" // Penting jika QR dari domain berbeda
                        />
                        {/* --- AKHIR PERBAIKAN --- */}
                    </div>

                    {/* Tombol Simpan (Sekarang berfungsi) */}
                    <button
                        onClick={handleSaveQR}
                        className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-cyan-600 transition-colors active:scale-95"
                    >
                        Simpan Code QR
                    </button>
                </div>
            </main>
        </div>
    );
}

export default QrisPaymentPage;