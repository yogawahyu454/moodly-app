import React from "react";
// Isinya mirip modal hapus lain, sesuaikan teksnya
const DeleteModal = ({ isOpen, onClose, onConfirm, bookingId }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
                {/* Icon */}
                <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin menghapus pesanan dengan ID{" "}
                    <span className="font-semibold">
                        #{String(bookingId).padStart(3, "0")}
                    </span>
                    ?
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
