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
        Online: "bg-green-100 text-green-700",
        Offline: "bg-gray-100 text-gray-700",
        Banned: "bg-red-100 text-red-700",
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

const AdminManagementPage = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk semua modal
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isBlockModalOpen, setBlockModalOpen] = useState(false);
    const [isUnblockModalOpen, setUnblockModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    // --- Logika Fetch Data ---
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/super-admin/admin-management"
            );
            setAdmins(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data admin. Silakan coba lagi.");
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
        // Terima fungsi setErrors
        try {
            await apiClient.post("/api/super-admin/admin-management", data);
            setAddModalOpen(false);
            fetchData();
        } catch (err) {
            // PERBAIKAN: Jika error adalah 422, teruskan pesan error ke modal
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error("Gagal menambah admin:", err);
                // Di sini Anda bisa mengatur state error global untuk ditampilkan di halaman
            }
        }
    };

    const handleBlock = async () => {
        try {
            await apiClient.post(
                `/api/super-admin/admin-management/${selectedAdmin.id}/block`
            );
            setBlockModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal memblokir admin:", err);
            // TODO: Tampilkan notifikasi error ke pengguna
        }
    };

    const handleUnblock = async () => {
        try {
            await apiClient.post(
                `/api/super-admin/admin-management/${selectedAdmin.id}/unblock`
            );
            setUnblockModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal membuka blokir admin:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await apiClient.delete(
                `/api/super-admin/admin-management/${selectedAdmin.id}`
            );
            setDeleteModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus admin:", err);
        }
    };

    // --- Handler untuk membuka modal ---
    const openModal = (setter, admin = null) => {
        setSelectedAdmin(admin);
        setter(true);
    };

    if (loading) return <div className="p-6">Memuat data...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin</h1>
                <button
                    onClick={() => openModal(setAddModalOpen)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusIcon />
                    Tambah Admin
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">ID Admin</th>
                            <th className="p-4">Nama Admin</th>
                            <th className="p-4">No Telepon</th>
                            <th className="p-4">Kota</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={admin.id} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{`#${String(
                                    admin.id
                                ).padStart(5, "0")}`}</td>
                                <td className="p-4 font-medium">
                                    {admin.name}
                                </td>
                                <td className="p-4">{admin.phone || "-"}</td>
                                <td className="p-4">{admin.city || "-"}</td>
                                <td className="p-4">
                                    <StatusBadge status={admin.status} />
                                </td>
                                <td className="p-4 flex gap-3 items-center">
                                    <Link
                                        to={`/admin/admin-management/${admin.id}`}
                                    >
                                        <DetailIcon />
                                    </Link>
                                    {admin.status === "Banned" ? (
                                        <button
                                            onClick={() =>
                                                openModal(
                                                    setUnblockModalOpen,
                                                    admin
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
                                                    admin
                                                )
                                            }
                                        >
                                            <BlockIcon />
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            openModal(setDeleteModalOpen, admin)
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
                admin={selectedAdmin}
            />
            <UnblockModal
                isOpen={isUnblockModalOpen}
                onClose={() => setUnblockModalOpen(false)}
                onConfirm={handleUnblock}
                admin={selectedAdmin}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                adminName={selectedAdmin?.name}
            />
        </div>
    );
};

export default AdminManagementPage;
