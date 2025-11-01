import React, { useState, useEffect, useRef } from "react";
// --- PERBAIKAN: Path relatif tanpa ekstensi ---
import apiClient from "../../../../api/axios";
// --- AKHIR PERBAIKAN ---

export default function AddEditModal({
    isOpen,
    onClose,
    onSuccess,
    methodToEdit,
}) {
    const isEditMode = Boolean(methodToEdit);
    const [name, setName] = useState("");
    const [accountDetails, setAccountDetails] = useState("");
    const [status, setStatus] = useState("Aktif");
    const [image, setImage] = useState(null); // File object
    const [imagePreview, setImagePreview] = useState(null); // URL

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // Isi form jika mode edit
    useEffect(() => {
        if (isEditMode && methodToEdit) {
            setName(methodToEdit.name);
            setAccountDetails(methodToEdit.account_details || "");
            setStatus(methodToEdit.status);
            setImagePreview(methodToEdit.image_url); // Tampilkan gambar yang ada
        } else {
            // Reset form jika mode Tambah
            setName("");
            setAccountDetails("");
            setStatus("Aktif");
            setImage(null);
            setImagePreview(null);
        }
    }, [isOpen, isEditMode, methodToEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("account_details", accountDetails);
        formData.append("status", status);

        if (image) {
            // Hanya kirim gambar jika ada file baru
            formData.append("image", image);
        }

        // Tentukan URL dan method API
        let url = "/api/super-admin/payment-methods";
        let method = "POST";

        if (isEditMode) {
            url = `/api/super-admin/payment-methods/${methodToEdit.id}`;
            formData.append("_method", "PUT"); // Laravel butuh ini untuk update file
        }

        try {
            await apiClient.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onSuccess(); // Panggil refresh data di parent
        } catch (err) {
            console.error("Save error:", err);
            let errorMessage = "Gagal menyimpan data.";
            if (err.response && err.response.data && err.response.data.errors) {
                // Ambil error validasi pertama
                const firstError = Object.values(
                    err.response.data.errors
                )[0][0];
                errorMessage = firstError || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col transition-transform transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">
                        {isEditMode
                            ? "Edit Metode Pembayaran"
                            : "Tambah Metode Pembayaran"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Tutup"
                    >
                        {/* Ikon X */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex-grow overflow-y-auto"
                >
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nama Metode (Contoh: QRIS - BCA) *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="account_details"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Detail Akun (Contoh: 123456789 a/n Moodly)
                            </label>
                            <input
                                type="text"
                                id="account_details"
                                value={accountDetails}
                                onChange={(e) =>
                                    setAccountDetails(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Status *
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gambar QRIS
                            </label>
                            <div className="flex items-center gap-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-md border"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
                                        No Image
                                    </div>
                                )}
                                <div>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleImageChange}
                                        className="hidden" // Sembunyikan input asli
                                        ref={fileInputRef}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current &&
                                            fileInputRef.current.click()
                                        }
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        {isEditMode
                                            ? "Ganti Gambar"
                                            : "Upload Gambar"}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Max 2MB (JPG, PNG)
                                    </p>
                                    {isEditMode && !image && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kosongkan jika tidak ingin ganti
                                            gambar.
                                        </p>
                                    )}
                                </div>
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
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-cyan-600 text-white rounded-md text-sm font-medium hover:bg-cyan-700 disabled:bg-gray-400"
                        >
                            {loading
                                ? "Menyimpan..."
                                : isEditMode
                                ? "Simpan Perubahan"
                                : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
