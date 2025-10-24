import React, { useState, useEffect } from "react";

const AddEditModal = ({ isOpen, onClose, onSave, initialData }) => {
    // State untuk data form, termasuk field baru
    const [formData, setFormData] = useState({
        nama_tempat: "",
        alamat: "",
        status: "Aktif",
        rating: 0, // Default 0
        review_count: 0, // Default 0
        // image tidak dimasukkan di sini, ditangani terpisah
    });
    // State khusus untuk file gambar dan preview
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            // Reset hanya saat modal dibuka
            if (isEditMode && initialData) {
                // Set form data KECUALI image
                setFormData({
                    nama_tempat: initialData.nama_tempat || "",
                    alamat: initialData.alamat || "",
                    status: initialData.status || "Aktif",
                    rating: initialData.rating || 0,
                    review_count: initialData.review_count || 0,
                });
                // Set preview gambar dari URL data awal (jika ada)
                setImagePreview(initialData.image || null); // Gunakan URL dari accessor
                setImageFile(null); // Kosongkan file saat edit
            } else {
                // Reset form untuk mode "Add"
                setFormData({
                    nama_tempat: "",
                    alamat: "",
                    status: "Aktif",
                    rating: 0,
                    review_count: 0,
                });
                setImageFile(null);
                setImagePreview(null);
            }
        }
    }, [initialData, isEditMode, isOpen]); // Tambah isOpen

    // Handle perubahan input biasa dan file
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setImageFile(file); // Simpan objek File
            if (file) {
                // Buat URL preview sementara
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Jika file dihapus, kembalikan preview ke gambar awal (jika edit) atau null
                setImagePreview(isEditMode ? initialData?.image : null);
            }
        } else {
            // Handle input number
            const val =
                name === "rating" || name === "review_count"
                    ? value === ""
                        ? ""
                        : Number(value) // Biarkan kosong atau konversi ke Angka
                    : value;
            setFormData((prev) => ({ ...prev, [name]: val }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gabungkan data form dan file gambar
        const dataToSave = {
            ...formData,
            // Hanya sertakan 'image' jika ada file baru yang dipilih
            ...(imageFile && { image: imageFile }),
        };
        onSave(dataToSave);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
            {" "}
            {/* Tambah p-4 dan overflow */}
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
                {" "}
                {/* Lebarkan modal */}
                <h2 className="text-2xl font-bold mb-6">
                    {isEditMode ? "Edit" : "Tambah"} Tempat Konseling
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Nama Tempat */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Nama Tempat
                        </label>
                        <input
                            type="text"
                            name="nama_tempat"
                            value={formData.nama_tempat}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    {/* Alamat */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Alamat
                        </label>
                        <textarea
                            name="alamat"
                            value={formData.alamat}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    {/* Upload Gambar */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Gambar Tempat
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*" // Hanya terima file gambar
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {/* Preview Gambar */}
                        {imagePreview && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-1">
                                    Preview:
                                </p>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-24 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Rating & Review Count (side-by-side) */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Rating (0-5)
                            </label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                min="0"
                                max="5"
                                step="0.1" // Izinkan desimal 1 angka
                                placeholder="Contoh: 4.5"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Jumlah Reviews
                            </label>
                            <input
                                type="number"
                                name="review_count"
                                value={formData.review_count}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                min="0"
                                step="1" // Hanya angka bulat
                                placeholder="Contoh: 150"
                            />
                        </div>
                    </div>

                    {/* Status */}
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
