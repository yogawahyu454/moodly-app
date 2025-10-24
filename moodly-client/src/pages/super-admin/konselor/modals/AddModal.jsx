import React, { useState, useEffect } from "react";

// Terima props initialData dan isEditMode
const AddModal = ({ isOpen, onClose, onSave, initialData, isEditMode }) => {
    // State awal, tambahkan universitas
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        universitas: "", // <-- Tambah universitas
        password: "",
        password_confirmation: "",
        // avatar tidak di sini, ditangani terpisah
    });
    // State untuk file avatar dan preview
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [errors, setErrors] = useState({});

    // Sesuaikan useEffect untuk handle mode Edit dan Add
    useEffect(() => {
        if (isOpen) {
            if (isEditMode && initialData) {
                // Isi form dengan data awal (kecuali password dan avatar file)
                setFormData({
                    name: initialData.name || "",
                    email: initialData.email || "",
                    phone: initialData.phone || "",
                    city: initialData.city || "",
                    universitas: initialData.universitas || "", // <-- Isi universitas
                    password: "", // Kosongkan password saat edit
                    password_confirmation: "",
                });
                setAvatarPreview(initialData.avatar || null); // Tampilkan avatar lama
                setAvatarFile(null); // Kosongkan file baru
                setErrors({});
            } else {
                // Reset form untuk mode Add
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    city: "",
                    universitas: "", // <-- Reset universitas
                    password: "",
                    password_confirmation: "",
                });
                setAvatarFile(null);
                setAvatarPreview(null);
                setErrors({});
            }
        }
    }, [isOpen, initialData, isEditMode]); // Tambah dependensi

    // Update handleChange untuk handle file
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setAvatarFile(file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatarPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Kembalikan preview ke avatar lama (jika edit) atau null
                setAvatarPreview(isEditMode ? initialData?.avatar : null);
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Hapus error jika field diubah
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gabungkan data form dan file avatar
        const dataToSave = {
            ...formData,
            // Hanya kirim avatar jika ada file baru ATAU jika mode add (biarkan backend handle default jika null)
            ...(avatarFile && { avatar: avatarFile }),
        };

        // Hapus field password jika mode edit dan password kosong
        if (isEditMode && !formData.password) {
            delete dataToSave.password;
            delete dataToSave.password_confirmation;
        }

        onSave(dataToSave, setErrors); // Kirim setErrors juga
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
            {" "}
            {/* Tambah p-4 & overflow */}
            <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
                {" "}
                {/* Lebarkan modal */}
                <h2 className="text-2xl font-bold mb-6">
                    {/* Ubah Judul berdasarkan mode */}
                    {isEditMode ? "Edit Data Konselor" : "Tambah Konselor Baru"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Tata letak grid untuk input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                        {/* Kolom Kiri */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name} // Pastikan value terhubung
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email} // Pastikan value terhubung
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>
                            {/* Input Universitas BARU */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Universitas Asal
                                </label>
                                <input
                                    type="text"
                                    name="universitas"
                                    value={formData.universitas} // Hubungkan value
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Contoh: Universitas Gadjah Mada"
                                />
                                {errors.universitas && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.universitas[0]}
                                    </p>
                                )}
                            </div>
                            {/* Input Password (opsional saat edit) */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Password{" "}
                                    {isEditMode &&
                                        "(kosongkan jika tidak diubah)"}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required={!isEditMode} // Hanya wajib saat Add
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    No Telepon
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone} // Pastikan value terhubung
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.phone[0]}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Kota
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city} // Pastikan value terhubung
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.city[0]}
                                    </p>
                                )}
                            </div>
                            {/* Input Avatar BARU */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Foto Profil (Avatar)
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {/* Preview Avatar */}
                                {avatarPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={avatarPreview}
                                            alt="Preview"
                                            className="w-20 h-20 rounded-full object-cover border"
                                        />
                                    </div>
                                )}
                                {errors.avatar && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.avatar[0]}
                                    </p>
                                )}
                            </div>
                            {/* Input Konfirmasi Password (opsional saat edit) */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Konfirmasi Password{" "}
                                    {isEditMode &&
                                        formData.password &&
                                        "(ulangi password baru)"}
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required={
                                        !isEditMode || !!formData.password
                                    } // Wajib jika mode Add ATAU jika password diisi saat Edit
                                />
                                {/* Error konfirmasi biasanya terkait dengan password */}
                            </div>
                        </div>
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

export default AddModal;
