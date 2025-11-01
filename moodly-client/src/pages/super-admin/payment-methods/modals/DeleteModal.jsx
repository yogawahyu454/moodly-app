import React, { useState } from "react";
// --- PERBAIKAN: Path relatif yang benar (4x mundur) tanpa ekstensi ---
import apiClient from "../../../../api/axios";
// --- AKHIR PERBAIKAN ---

export default function DeleteModal({
    isOpen,
    onClose,
    onSuccess,
    methodToDelete,
}) {
    const [loading, setLoading] = useState(false); // <-- Tambahkan state loading
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!methodToDelete) return;

        setLoading(true);
        setError(null);

        try {
            await apiClient.delete(
                `/api/super-admin/payment-methods/${methodToDelete.id}`
            );
            onSuccess(); // Panggil refresh data di parent
        } catch (err) {
            console.error("Delete error:", err);
            setError("Gagal menghapus data. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md transition-transform transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            {/* Ikon Peringatan */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Hapus Metode Pembayaran
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Apakah Anda yakin ingin menghapus metode{" "}
                                    <strong>"{methodToDelete?.name}"</strong>?
                                    Data yang sudah dihapus tidak dapat
                                    dikembalikan.
                                </p>
                            </div>
                            {error && (
                                <p className="text-sm text-red-600 mt-2">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:bg-gray-400"
                    >
                        {loading ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
