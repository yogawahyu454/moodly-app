import React from 'react';
import { useNavigate } from 'react-router-dom';

// Ikon panah kembali (ChevronLeft) dalam format SVG
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

// Ikon Salin (Clipboard) dalam format SVG
const ClipboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

// Komponen Pembatas Garis
const Divider = () => <hr className="my-4 border-gray-200" />;

export default function PaymentInstructionsPage() {
    const navigate = useNavigate();
    const virtualAccount = "9086986256358497"; // Contoh Nomor VA
    const amount = "230.000"; // Contoh Nominal

    // Fungsi untuk menyalin nomor VA ke clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(virtualAccount)
            .then(() => {
                alert('Nomor Virtual Account disalin!'); // Ganti dengan notifikasi yang lebih baik jika perlu
            })
            .catch(err => {
                console.error('Gagal menyalin: ', err);
                alert('Gagal menyalin nomor Virtual Account.');
            });
    };

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="w-full max-w-md bg-white flex flex-col">

                {/* Header */}
                <header className="bg-[#00B2FF] text-white p-4 flex items-center sticky top-0 z-10 shadow-md">
                    <button onClick={() => navigate(-1)} className="p-1 -ml-1">
                        <ChevronLeftIcon />
                    </button>
                    <div className="flex-grow flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h1 className="text-md font-semibold text-center">RINGKASAN PESANAN</h1>
                    </div>
                     {/* Placeholder agar judul tetap di tengah */}
                     <div className="w-6"></div>
                </header>

                {/* Konten Utama */}
                <main className="flex-1 overflow-y-auto p-5 text-sm text-gray-700 leading-relaxed">
                    {/* Detail Pembayaran */}
                    <div className="text-center mb-5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia_logo.svg/1280px-Bank_Central_Asia_logo.svg.png" alt="BCA Logo" className="h-6 mx-auto mb-3" />
                         <p className="text-xs text-gray-500 mb-1">Nomer Virtual Account</p>
                         <div className="font-semibold text-xl text-gray-800 mb-1 flex items-center justify-center">
                             <span>{virtualAccount}</span>
                             <button onClick={copyToClipboard} title="Salin Nomor VA">
                                 <ClipboardIcon />
                             </button>
                         </div>
                         <p className="text-xs text-gray-500 mb-2">Nama Virtual Account</p>

                         <p className="text-xs text-gray-500 mt-4 mb-1">Nominal yang akan dibayarkan</p>
                         <p className="font-bold text-lg text-gray-800">IDR {amount}</p>
                    </div>

                    {/* Kotak Peringatan */}
                    <div className="bg-blue-100 border border-blue-300 text-blue-800 text-xs p-3 rounded-lg mb-5">
                        <h3 className="font-semibold mb-1">Lindungi Diri Anda dari Penipuan</h3>
                        <p>Pastikan nama merchant, jumlah pembayaran, dan detail lainnya sudah benar.</p>
                        <p>Selalu periksa sebelum melanjutkan pembayaran.</p>
                    </div>

                    {/* Tombol Kembali */}
                    <button
                        onClick={() => navigate('/riwayat')} // Arahkan ke riwayat atau halaman lain yang sesuai
                        className="w-full py-2.5 bg-[#00B2FF] text-white font-semibold rounded-lg shadow-md hover:bg-[#009EE6] transition-colors duration-200 mb-6 text-base"
                    >
                        Kembali
                    </button>

                    {/* Instruksi Pembayaran */}
                    <div className="space-y-4 text-xs text-gray-600">
                        {/* Masuk ke Akun Anda */}
                        <div>
                             <h4 className="font-semibold text-gray-800 mb-1">Masuk Ke Akun Anda</h4>
                             <ol className="list-decimal list-inside space-y-1 pl-1">
                                 <li>Masukkan kartu ATM BCA</li>
                                 <li>Masukkan PIN</li>
                             </ol>
                        </div>

                        {/* Detail Pembayaran */}
                        <div>
                             <h4 className="font-semibold text-gray-800 mb-1">Detail Pembayaran</h4>
                             <ol className="list-decimal list-inside space-y-1 pl-1">
                                 <li>Pilih "m-Transfer", kemudian pilih "BCA Virtual Account".</li>
                                 <li>Masukkan Nomor Virtual Account Anda <span className="font-semibold text-blue-600">{virtualAccount}</span>, kemudian tekan "OK".</li>
                                 <li>Tekan tombol "Kirim" yang berada di sudut kanan atas aplikasi untuk melakukan transfer.</li>
                                 <li>Tekan "OK" untuk melanjutkan pembayaran.</li>
                                 <li>Masukkan PIN Anda untuk meng-otorisasi transaksi.</li>
                             </ol>
                        </div>

                         {/* Transaksi Berhasil */}
                        <div>
                             <h4 className="font-semibold text-gray-800 mb-1">Transaksi Berhasil</h4>
                             <ol className="list-decimal list-inside space-y-1 pl-1">
                                 <li>Transaksi Anda telah selesai.</li>
                                 <li>Setelah transaksi Anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit.</li>
                             </ol>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}