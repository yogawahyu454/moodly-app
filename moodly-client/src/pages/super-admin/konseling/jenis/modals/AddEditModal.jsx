import React, { useState, useEffect } from "react";

// Komponen baru untuk preview gambar
const ImagePreview = ({ file, existingUrl }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (file) {
            // Buat preview untuk file baru
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else if (existingUrl) {
            // Tampilkan gambar yang sudah ada
            setPreview(existingUrl);
        } else {
            // Tampilkan placeholder
            setPreview("https://placehold.co/100x100/EBF4FF/3B82F6?text=Icon");
        }
    }, [file, existingUrl]);

    return (
        <img
            src={preview}
            alt="Preview Ikon"
            className="w-24 h-24 rounded-lg object-cover border"
        />
    );
};

const AddEditModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        jenis_konseling: "",
        status: "Aktif",
        biaya_layanan: "Nominal Tetap",
        nilai: "",
        tipe_layanan: "Online",
        // 'image_url' diganti namanya
    });

    // State terpisah untuk file gambar
    const [imageFile, setImageFile] = useState(null);
    // State untuk menyimpan URL gambar yang sudah ada (saat edit)
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setFormData(initialData);
                // Simpan URL gambar yang ada (dari accessor Laravel)
                setExistingImageUrl(initialData.image || null);
            } else {
                // Reset form untuk mode "Add"
                setFormData({
                    jenis_konseling: "",
                    status: "Aktif",
                    biaya_layanan: "Nominal Tetap",
                    nilai: "",
                    tipe_layanan: "Online",
                });
                setExistingImageUrl(null);
            }
            // Selalu reset file input
            setImageFile(null);
        }
    }, [initialData, isEditMode, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handler terpisah untuk file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim formData (data teks) dan imageFile (data file)
        onSave(formData, imageFile);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">
                    {isEditMode ? "Edit" : "Tambah"} Jenis Konseling
                </h2>
                {/* Ubah form untuk menangani file upload */}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Input Ikon (File Upload) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Ikon</label>
                        <div className="flex items-center gap-4">
                            <ImagePreview
                                file={imageFile}
                                existingUrl={existingImageUrl}
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        {/* Input Tipe Layanan */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Tipe Layanan
                            </label>
                            <select
                                name="tipe_layanan"
                                value={formData.tipe_layanan}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Input Jenis Biaya Layanan */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Jenis Biaya
                            </label>
                            <select
                                name="biaya_layanan"
                                value={formData.biaya_layanan}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Nominal Tetap">
                                    Nominal Tetap
                                </option>
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
                                        : "Contoh: 50000"
                                }
                                required
                            />
                        </div>
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
