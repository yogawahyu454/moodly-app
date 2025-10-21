import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";

// Impor semua modal
import AddModal from "./modals/AddModal";
import BlockModal from "./modals/BlockModal";
import UnblockModal from "./modals/UnblockModal";
import DeleteModal from "./modals/DeleteModal";

// --- Komponen Ikon ---
const DetailIcon = () => (
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
        className="text-gray-500 hover:text-gray-700"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);
const BlockIcon = () => (
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
        className="text-orange-500 hover:text-orange-700"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    </svg>
);
const UnblockIcon = () => (
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
        className="text-green-500 hover:text-green-700"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
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
const StarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-yellow-400"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
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

// --- Komponen Badge Status ---
const StatusBadge = ({ status }) => {
    const styles = {
        Verifikasi: "bg-yellow-100 text-yellow-700",
        Terverifikasi: "bg-green-100 text-green-700",
        Ditolak: "bg-orange-100 text-orange-700",
        Banned: "bg-red-100 text-red-700 font-bold",
        Offline: "bg-gray-100 text-gray-700",
    };
    return (
        <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
                styles[status] || styles.Offline
            }`}
        >
            {status}
        </span>
    );
};

const KonselorManagementPage = () => {
    const [konselors, setKonselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk semua modal
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isBlockModalOpen, setBlockModalOpen] = useState(false);
    const [isUnblockModalOpen, setUnblockModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedKonselor, setSelectedKonselor] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/super-admin/konselor-management"
            );
            setKonselors(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data konselor.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Handler untuk Aksi CRUD ---
    const handleSave = async (data, setErrors) => {
        try {
            await apiClient.post("/api/super-admin/konselor-management", data);
            setAddModalOpen(false);
            fetchData();
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error("Gagal menambah konselor:", err);
            }
        }
    };

    const handleBlock = async () => {
        try {
            await apiClient.post(
                `/api/super-admin/konselor-management/${selectedKonselor.id}/block`
            );
            setBlockModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal memblokir konselor:", err);
        }
    };

    const handleUnblock = async () => {
        try {
            await apiClient.post(
                `/api/super-admin/konselor-management/${selectedKonselor.id}/unblock`
            );
            setUnblockModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal membuka blokir konselor:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await apiClient.delete(
                `/api/super-admin/konselor-management/${selectedKonselor.id}`
            );
            setDeleteModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus konselor:", err);
        }
    };

    const openModal = (setter, konselor = null) => {
        setSelectedKonselor(konselor);
        setter(true);
    };

    if (loading) return <div className="p-6">Memuat data...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Data Konselor</h1>
                <button
                    onClick={() => openModal(setAddModalOpen)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusIcon />
                    Tambah Konselor
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">ID Konselor</th>
                            <th className="p-4">Nama</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">No Telepon</th>
                            <th className="p-4">Kota</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {konselors.map((konselor, index) => (
                            <tr key={konselor.id} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{`#${String(
                                    konselor.id
                                ).padStart(5, "0")}`}</td>
                                <td className="p-4 font-medium">
                                    {konselor.name}
                                </td>
                                <td className="p-4">{konselor.email}</td>
                                <td className="p-4">{konselor.phone || "-"}</td>
                                <td className="p-4">{konselor.city || "-"}</td>
                                <td className="p-4 flex items-center gap-1">
                                    <StarIcon /> {konselor.rating || "N/A"}
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={konselor.status} />
                                </td>
                                <td className="p-4 flex gap-3 items-center">
                                    <Link
                                        to={`/admin/konselor-management/${konselor.id}`}
                                    >
                                        <DetailIcon />
                                    </Link>
                                    {konselor.status === "Banned" ? (
                                        <button
                                            onClick={() =>
                                                openModal(
                                                    setUnblockModalOpen,
                                                    konselor
                                                )
                                            }
                                        >
                                            <UnblockIcon />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                openModal(
                                                    setBlockModalOpen,
                                                    konselor
                                                )
                                            }
                                        >
                                            <BlockIcon />
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            openModal(
                                                setDeleteModalOpen,
                                                konselor
                                            )
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

            {/* Render semua modal */}
            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleSave}
            />
            <BlockModal
                isOpen={isBlockModalOpen}
                onClose={() => setBlockModalOpen(false)}
                onConfirm={handleBlock}
                konselor={selectedKonselor}
            />
            <UnblockModal
                isOpen={isUnblockModalOpen}
                onClose={() => setUnblockModalOpen(false)}
                onConfirm={handleUnblock}
                konselor={selectedKonselor}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                konselorName={selectedKonselor?.name}
            />
        </div>
    );
};

export default KonselorManagementPage;
