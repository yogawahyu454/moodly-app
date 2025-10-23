import React, { useState, useEffect } from "react";
import apiClient from "../../../../api/axios";
import AddEditModal from "./modals/AddEditModal";
import DeleteModal from "./modals/DeleteModal";

// (Ikon-ikon tetap sama, tidak perlu di-copy lagi)
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

const JenisKonselingPage = () => {
    const [jenisKonselingList, setJenisKonselingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedJenisKonseling, setSelectedJenisKonseling] = useState(null);

    const fetchJenisKonseling = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/super-admin/jenis-konseling"
            );
            setJenisKonselingList(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data. Silakan coba lagi.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJenisKonseling();
    }, []);

    const handleOpenAddModal = () => {
        setSelectedJenisKonseling(null);
        setAddEditModalOpen(true);
    };

    const handleOpenEditModal = (data) => {
        setSelectedJenisKonseling(data);
        setAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (data) => {
        setSelectedJenisKonseling(data);
        setDeleteModalOpen(true);
    };

    // --- LOGIKA SAVE DIPERBARUI ---
    // Sekarang menerima (data teks) dan (file)
    const handleSave = async (data, imageFile) => {
        // 1. Buat FormData
        const formData = new FormData();

        // 2. Tambahkan semua data teks ke FormData
        formData.append("jenis_konseling", data.jenis_konseling);
        formData.append("tipe_layanan", data.tipe_layanan);
        formData.append("biaya_layanan", data.biaya_layanan);
        formData.append("nilai", data.nilai);
        formData.append("status", data.status);

        // 3. Tambahkan file gambar HANYA jika ada file baru
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            if (selectedJenisKonseling) {
                // --- Mode Edit (Update) ---
                // Kita 'menipu' Laravel seolah-olah ini method PUT
                formData.append("_method", "PUT");

                // Kita HARUS pakai 'post' untuk mengirim FormData,
                // tapi endpoint-nya sama dengan 'update'
                await apiClient.post(
                    `/api/super-admin/jenis-konseling/${selectedJenisKonseling.id}`,
                    formData,
                    {
                        headers: {
                            // Hapus content-type agar browser mengaturnya
                            // menjadi 'multipart/form-data' secara otomatis
                            "Content-Type": null,
                        },
                    }
                );
            } else {
                // --- Mode Add (Store) ---
                await apiClient.post(
                    "/api/super-admin/jenis-konseling",
                    formData,
                    {
                        headers: {
                            "Content-Type": null, // Sama, hapus header
                        },
                    }
                );
            }
            setAddEditModalOpen(false);
            fetchJenisKonseling();
        } catch (err) {
            console.error("Gagal menyimpan data:", err);
            // Tangani error validasi (jika perlu)
            if (err.response && err.response.status === 422) {
                alert(
                    "Gagal menyimpan: " +
                        JSON.stringify(err.response.data.errors)
                );
            }
        }
    };
    // --- AKHIR PERUBAHAN HANDLE SAVE ---

    const handleDelete = async () => {
        try {
            await apiClient.delete(
                `/api/super-admin/jenis-konseling/${selectedJenisKonseling.id}`
            );
            setDeleteModalOpen(false);
            fetchJenisKonseling();
        } catch (err) {
            console.error("Gagal menghapus data:", err);
        }
    };

    if (loading) return <div className="p-6">Memuat data...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Jenis Konseling</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusIcon />
                    Tambah Jenis Konseling
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">Jenis Konseling</th>
                            <th className="p-4">Tipe Layanan</th>
                            <th className="p-4">Ikon</th>
                            <th className="p-4">Biaya Layanan</th>
                            <th className="p-4">Nilai</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jenisKonselingList.length > 0 ? (
                            jenisKonselingList.map((item, index) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">
                                        {item.jenis_konseling}
                                    </td>
                                    <td className="p-4">{item.tipe_layanan}</td>
                                    <td className="p-4">
                                        <img
                                            // Gunakan item.image (dari accessor)
                                            src={
                                                item.image ||
                                                "https://placehold.co/40x40/EBF4FF/3B82F6?text=?"
                                            }
                                            alt="Ikon"
                                            className="w-10 h-10 rounded-md object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "https://placehold.co/40x40/EBF4FF/3B82F6?text=?";
                                            }}
                                        />
                                    </td>
                                    <td className="p-4">
                                        {item.biaya_layanan}
                                    </td>
                                    <td className="p-4">{item.nilai}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 text-sm rounded-full ${
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="p-4 text-center text-gray-500"
                                >
                                    Data belum tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AddEditModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                onSave={handleSave}
                initialData={selectedJenisKonseling}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={selectedJenisKonseling?.jenis_konseling}
            />
        </div>
    );
};

export default JenisKonselingPage;
