import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api/axios'; // Sesuaikan path jika perlu

// --- Komponen Ikon ---
// Icon: bi-arrow-left (Sama seperti di PaymentOnlinePage)
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-gray-800 group-hover:text-black" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
);
// --- Akhir Komponen Ikon ---

function ChangePhoneNumberPage() {
    const navigate = useNavigate();
    const [oldPhoneNumber, setOldPhoneNumber] = useState(''); // TODO: Isi dengan nomor lama dari user context
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleBack = () => navigate(-1); // Kembali ke halaman sebelumnya

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Validasi sederhana (bisa diperketat)
        if (!oldPhoneNumber || !newPhoneNumber) {
            setError("Harap isi kedua nomor telepon.");
            setIsLoading(false);
            return;
        }
        if (newPhoneNumber === oldPhoneNumber) {
            setError("Nomor telepon baru tidak boleh sama dengan nomor lama.");
            setIsLoading(false);
            return;
        }
        // TODO: Tambahkan validasi format nomor telepon jika perlu

        try {
            // --- GANTI DENGAN ENDPOINT API ANDA ---
            // Contoh: Mengirim data ke API
            // const response = await apiClient.post('/api/user/change-phone', {
            //     oldPhoneNumber,
            //     newPhoneNumber,
            // });

            // Simulasi sukses
            await new Promise(resolve => setTimeout(resolve, 1000)); // Hapus ini nanti

            console.log("Nomor telepon berhasil diubah (simulasi)");
            setSuccessMessage("Nomor telepon berhasil diubah.");

            // TODO: Update nomor telepon di user context/state global jika perlu

            // Kembali ke halaman sebelumnya setelah beberapa saat
            // Kirim state `phoneUpdated: true` agar PaymentOnlinePage tahu
            setTimeout(() => {
                navigate(-1, { state: { phoneUpdated: true } });
            }, 1500);

        } catch (err) {
            console.error("Gagal mengubah nomor telepon:", err);
            // Ambil pesan error dari response API jika ada
            const apiError = err.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.";
            setError(apiError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // --- PERBAIKAN: Ganti bg-pink-50 menjadi bg-white ---
        <div className="font-sans bg-white min-h-screen max-w-md mx-auto">
        {/* --- AKHIR PERBAIKAN --- */}

            {/* 1. Header */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
                <button onClick={handleBack} className="p-1 -ml-1 mr-2 group">
                    <BackArrowIcon />
                </button>
                <h1 className="text-lg font-bold m-0 flex-1 text-gray-800">
                    Ubah Nomor Telepon
                </h1>
            </header>

            {/* 2. Konten Form */}
            <main className="p-6">
                <p className="text-sm text-gray-600 mb-6">
                    Ubah nomor telepon anda dengan nomor telepon baru
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="oldPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            No. Telepon lama
                        </label>
                        <input
                            type="tel" // Tipe 'tel' untuk input nomor telepon
                            id="oldPhoneNumber"
                            value={oldPhoneNumber}
                            onChange={(e) => setOldPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            placeholder="Masukkan nomor telepon lama"
                            // disabled // Aktifkan jika nomor lama diambil dari context dan tidak bisa diubah
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            No. Telepon baru
                        </label>
                        <input
                            type="tel"
                            id="newPhoneNumber"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            placeholder="Masukkan nomor telepon baru"
                            required
                        />
                    </div>

                    {/* Tampilkan Pesan Error atau Sukses */}
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                    {successMessage && (
                        <p className="text-sm text-green-600">{successMessage}</p>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white ${
                                isLoading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
                        >
                            {isLoading ? 'Memproses...' : 'Ubah No Telepon'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ChangePhoneNumberPage;