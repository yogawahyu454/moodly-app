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

const DurasiKonselingPage = () => {
    const [durasiList, setDurasiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDurasi, setSelectedDurasi] = useState(null);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/super-admin/durasi-konseling"
            );
            setDurasiList(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data. Silakan coba lagi.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenAddModal = () => {
        setSelectedDurasi(null);
        setAddEditModalOpen(true);
    };

    const handleOpenEditModal = (data) => {
        setSelectedDurasi(data);
        setAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (data) => {
        setSelectedDurasi(data);
        setDeleteModalOpen(true);
    };

    const handleSave = async (data) => {
        try {
            if (selectedDurasi) {
                await apiClient.put(
                    `/api/super-admin/durasi-konseling/${selectedDurasi.id}`,
                    data
                );
            } else {
                await apiClient.post("/api/super-admin/durasi-konseling", data);
            }
            setAddEditModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menyimpan data:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await apiClient.delete(
                `/api/super-admin/durasi-konseling/${selectedDurasi.id}`
            );
            setDeleteModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus data:", err);
        }
    };

    if (loading) return <div className="p-6">Memuat data...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Durasi Konseling</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusIcon />
                    Tambah Durasi Konseling
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">Durasi (Menit)</th>
                            <th className="p-4">Harga (Rp)</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {durasiList.map((item, index) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{item.durasi_menit}</td>
                                <td className="p-4">
                                    {formatRupiah(item.harga)}
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
                initialData={selectedDurasi}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={selectedDurasi?.durasi_menit}
            />
        </div>
    );
};

export default DurasiKonselingPage;
