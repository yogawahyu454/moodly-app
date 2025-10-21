import React, { useState } from "react";

const AddModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }
        setError("");
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Tambah Admin Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                No Telepon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Kota
                            </label>
                            <input
                                type="text"
                                name="city"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

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
