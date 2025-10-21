import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, adminName }) => {
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin menghapus admin{" "}
                    <span className="font-semibold">"{adminName}"</span> secara
                    permanen?
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
                        className="px-6 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
