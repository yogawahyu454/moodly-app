import React from "react";
// Isinya sama persis dengan BlockModal untuk Admin/Konselor,
// hanya ganti teks 'Admin'/'Konselor' menjadi 'Customer'.
const BlockModal = ({ isOpen, onClose, onConfirm, customer }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                    >
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">
                    Yakin ingin mem-banned akun ini?
                </h2>
                <p>
                    Nama Customer:{" "}
                    <span className="font-semibold">
                        {customer?.name || "..."}
                    </span>
                </p>
                <p className="text-gray-600 mb-4">
                    Email:{" "}
                    <span className="font-semibold">
                        {customer?.email || "..."}
                    </span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Aksi ini akan memblokir akses customer ke aplikasi.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 rounded-lg"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-200 text-red-700 rounded-lg"
                    >
                        Blokir
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BlockModal;
