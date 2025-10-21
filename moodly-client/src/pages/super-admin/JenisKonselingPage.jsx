import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Untuk mengambil instance axios
import apiClient from "../../api/axios"; // Atau impor langsung jika tidak dari context

export default function JenisKonselingPage() {
    const [jenisKonseling, setJenisKonseling] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJenisKonseling = async () => {
            try {
                // Panggil endpoint API yang sudah kita buat di backend
                const response = await apiClient.get(
                    "/api/super-admin/jenis-konseling"
                );
                setJenisKonseling(response.data);
            } catch (err) {
                setError("Gagal memuat data. Silakan coba lagi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJenisKonseling();
    }, []);

    if (loading) return <div className="text-center p-10">Memuat data...</div>;
    if (error)
        return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Jenis Konseling
                </h1>
                <button className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors">
                    + Tambah Jenis Konseling
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">No</th>
                            <th className="p-3 text-left">Jenis Konseling</th>
                            <th className="p-3 text-left">Biaya Layanan</th>
                            <th className="p-3 text-left">Nilai</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jenisKonseling.map((item, index) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{item.jenis_konseling}</td>
                                <td className="p-3">{item.biaya_layanan}</td>
                                <td className="p-3">{item.nilai}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            item.status === "Aktif"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    {/* Tombol Aksi (fungsionalitas menyusul) */}
                                    <button className="text-blue-500 hover:text-blue-700">
                                        Edit
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
