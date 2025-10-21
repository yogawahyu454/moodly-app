import React, { useState, useEffect } from "react";

const AddEditModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        jenis_konseling: "",
        status: "Aktif",
        biaya_layanan: "Nominal Tetap",
        nilai: "",
    });

    // Cek apakah ini mode "Edit" atau "Add"
    const isEditMode = Boolean(initialData);

    // Jika initialData berubah (saat membuka modal untuk edit), update form
    useEffect(() => {
        if (isEditMode) {
            setFormData(initialData);
        } else {
            // Reset form untuk mode "Add"
            setFormData({
                jenis_konseling: "",
                status: "Aktif",
                biaya_layanan: "Nominal Tetap",
                nilai: "",
            });
        }
    }, [initialData, isEditMode, isOpen]); // Tambahkan isOpen agar form reset saat modal dibuka kembali

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">
                    {isEditMode ? "Edit" : "Tambah"} Jenis Konseling
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Input Jenis Konseling */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Jenis Konseling
                        </label>
                        <input
                            type="text"
                            name="jenis_konseling"
                            value={formData.jenis_konseling}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Input Status */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                    </div>

                    {/* Input Jenis Biaya Layanan */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Jenis Biaya Layanan
                        </label>
                        <select
                            name="biaya_layanan"
                            value={formData.biaya_layanan}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="Nominal Tetap">Nominal Tetap</option>
                            <option value="Persentase">Persentase</option>
                        </select>
                    </div>

                    {/* Input Nilai */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Nilai
                        </label>
                        <input
                            type="text"
                            name="nilai"
                            value={formData.nilai}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder={
                                formData.biaya_layanan === "Persentase"
                                    ? "Contoh: 10%"
                                    : "Contoh: Rp. 50000"
                            }
                            required
                        />
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditModal;
