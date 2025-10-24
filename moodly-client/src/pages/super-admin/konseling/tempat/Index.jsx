import React, { useState, useEffect } from "react";
import apiClient from "../../../../api/axios";
import AddEditModal from "./modals/AddEditModal";
import DeleteModal from "./modals/DeleteModal";

// --- Komponen Ikon ---
const EditIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500 hover:text-blue-700"
    >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);
const DeleteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-red-500 hover:text-red-700"
    >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);
const PlusIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
// Icon Bintang (untuk rating)
const StarIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const TempatKonselingPage = () => {
    const [tempatList, setTempatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTempat, setSelectedTempat] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/super-admin/tempat-konseling"
            );
            // Pastikan data yang diterima adalah array
            setTempatList(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data. Silakan coba lagi.");
            console.error(err);
            setTempatList([]); // Set ke array kosong jika error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenAddModal = () => {
        setSelectedTempat(null);
        setAddEditModalOpen(true);
    };

    const handleOpenEditModal = (data) => {
        setSelectedTempat(data);
        setAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (data) => {
        setSelectedTempat(data);
        setDeleteModalOpen(true);
    };

    // --- PERUBAHAN: Kirim sebagai FormData ---
    const handleSave = async (formData) => {
        // Konversi data biasa ke FormData
        const dataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            // Hanya kirim file jika ada, atau jika bukan file kirim nilainya
            if (key === "image" && formData[key] instanceof File) {
                dataToSend.append(key, formData[key]);
            } else if (key !== "image") {
                // Pastikan nilai tidak null/undefined sebelum dikirim
                dataToSend.append(key, formData[key] ?? "");
            }
            // Jika key adalah image tapi bukan File (misal saat edit tanpa ganti gambar),
            // kita tidak append apa-apa, backend akan handle
        });

        // Penting untuk method spoofing saat update dengan FormData
        if (selectedTempat) {
            dataToSend.append("_method", "PUT"); // Laravel butuh ini
        }

        try {
            const url = selectedTempat
                ? `/api/super-admin/tempat-konseling/${selectedTempat.id}`
                : // Gunakan POST untuk update karena FormData tidak support PUT/PATCH native
                  "/api/super-admin/tempat-konseling";

            await apiClient.post(url, dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setAddEditModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menyimpan data:", err);
            // Tampilkan error (jika ada response error dari backend)
            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                alert(`Error: ${err.response.data.message}`); // Ganti dengan notifikasi
            } else {
                alert("Gagal menyimpan data. Periksa koneksi atau input Anda."); // Ganti dengan notifikasi
            }
        }
    };
    // --- AKHIR PERUBAHAN ---

    const handleDelete = async () => {
        try {
            await apiClient.delete(
                `/api/super-admin/tempat-konseling/${selectedTempat.id}`
            );
            setDeleteModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus data:", err);
            alert("Gagal menghapus data."); // Ganti dengan notifikasi
        }
    };

    if (loading) return <div className="p-6">Memuat data...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tempat Konseling</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusIcon />
                    Tambah Tempat Konseling
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                {" "}
                {/* Tambah overflow-x-auto */}
                <table className="w-full text-left min-w-[800px]">
                    {" "}
                    {/* Tambah min-width */}
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">Gambar</th> {/* <-- BARU */}
                            <th className="p-4">Nama Tempat</th>
                            <th className="p-4">Alamat</th>
                            <th className="p-4">Rating</th> {/* <-- BARU */}
                            <th className="p-4">Reviews</th> {/* <-- BARU */}
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempatList.map((item, index) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">
                                    {" "}
                                    {/* <-- BARU */}
                                    <img
                                        src={
                                            item.image ||
                                            "https://placehold.co/60x40/EBF4FF/7F9CF5?text=Img"
                                        } // Gunakan item.image dari accessor
                                        alt={item.nama_tempat}
                                        className="w-16 h-12 object-cover rounded"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/60x40/EBF4FF/7F9CF5?text=Err";
                                        }} // Fallback
                                    />
                                </td>
                                <td className="p-4">{item.nama_tempat}</td>
                                <td className="p-4">{item.alamat}</td>
                                <td className="p-4 flex items-center">
                                    {" "}
                                    {/* <-- BARU */}
                                    <StarIcon filled={true} />{" "}
                                    {/* Sederhana, bisa dibuat lebih dinamis */}
                                    <span className="ml-1">
                                        {item.rating?.toFixed(1) ?? "N/A"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {item.review_count ?? 0}
                                </td>{" "}
                                {/* <-- BARU */}
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            // Ukuran teks diubah ke xs
                                            item.status === "Aktif"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-4">
                                    <button
                                        onClick={() =>
                                            handleOpenEditModal(item)
                                        }
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleOpenDeleteModal(item)
                                        }
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddEditModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                onSave={handleSave}
                initialData={selectedTempat}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={selectedTempat?.nama_tempat}
            />
        </div>
    );
};

export default TempatKonselingPage;
