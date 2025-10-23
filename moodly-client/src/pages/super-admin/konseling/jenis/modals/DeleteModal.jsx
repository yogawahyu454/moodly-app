import React from "react";

// --- Komponen Ikon Tong Sampah ---
// Dibuat sebagai komponen internal agar mandiri
const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56" // Ukuran besar seperti di gambar
        height="56"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-red-500 mx-auto" // Warna merah dan di tengah
    >
        {/* Path untuk ikon tong sampah yang solid */}
        <path d="M15 4V3C15 2.44772 14.5523 2 14 2H10C9.44772 2 9 2.44772 9 3V4H4V6H20V4H15Z" />
        <path d="M19 21H5C4.44772 21 4 20.5523 4 20V7H20V20C20 20.5523 19.5523 21 19 21Z" />
    </svg>
);

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* --- Perbarui styling modal --- */}
            <div className="bg-white rounded-lg p-8 w-full max-w-sm text-center">
                {/* --- 1. Ikon ditambahkan --- */}
                <TrashIcon />

                {/* --- 2. Judul diubah --- */}
                <h2 className="text-2xl font-bold my-4">Hapus Data</h2>

                {/* --- 3. Teks disesuaikan --- */}
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin akan menghapus data
                    <br />
                    <span className="font-semibold">"{itemName}"</span>?
                </p>

                <div className="flex justify-center gap-4">
                    {/* --- 4. Styling Tombol Batal Diubah --- */}
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Batal
                    </button>

                    {/* --- 5. Styling Tombol Hapus Diubah --- */}
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
