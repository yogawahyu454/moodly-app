import React, { useState, useEffect } from "react";

const AddEditModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        durasi_menit: "",
        harga: "",
    });

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isEditMode) {
            setFormData(initialData);
        } else {
            setFormData({
                durasi_menit: "",
                harga: "",
            });
        }
    }, [initialData, isEditMode, isOpen]);

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
                    {isEditMode ? "Edit" : "Tambah"} Durasi Konseling
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Durasi Konseling
                        </label>
                        <input
                            type="text"
                            name="durasi_menit"
                            value={formData.durasi_menit}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Contoh: 60 Menit"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Harga (Rp)
                        </label>
                        <input
                            type="number"
                            name="harga"
                            value={formData.harga}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Contoh: 100000"
                            required
                        />
                    </div>
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
