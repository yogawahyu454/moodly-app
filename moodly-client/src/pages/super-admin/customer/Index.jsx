import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";

// Impor modal-modal
import BlockModal from "./modals/BlockModal";
import UnblockModal from "./modals/UnblockModal";
import DeleteModal from "./modals/DeleteModal";

// Ikon-ikon
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
    </svg>
);

// Badge Status (Sama seperti di halaman Admin)
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

const CustomerManagementPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State modals
    const [isBlockModalOpen, setBlockModalOpen] = useState(false);
    const [isUnblockModalOpen, setUnblockModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/super-admin/customer-management"
            );
            setCustomers(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data customer.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Handlers CRUD (Block, Unblock, Delete) - Sama seperti Admin & Konselor
    const handleBlock = async () => {
        try {
            await apiClient.post(
                `/api/super-admin/customer-management/${selectedCustomer.id}/block`
            );
            setBlockModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal memblokir:", err);
        }
    };
    const handleUnblock = async () => {
        try {
            await apiClient.post(
                `/api/super-admin/customer-management/${selectedCustomer.id}/unblock`
            );
            setUnblockModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal unblock:", err);
        }
    };
    const handleDelete = async () => {
        try {
            await apiClient.delete(
                `/api/super-admin/customer-management/${selectedCustomer.id}`
            );
            setDeleteModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus:", err);
        }
    };

    const openModal = (setter, customer = null) => {
        setSelectedCustomer(customer);
        setter(true);
    };

    if (loading) return <div className="p-6">Memuat data...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Data Customer</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">ID Customer</th>
                            <th className="p-4">Nama</th>
                            <th className="p-4">Jenis Kelamin</th>{" "}
                            {/* Placeholder */}
                            <th className="p-4">No Telepon</th>
                            <th className="p-4">Kota</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{`#${String(
                                    customer.id
                                ).padStart(5, "0")}`}</td>
                                <td className="p-4 font-medium">
                                    {customer.name}
                                </td>
                                <td className="p-4">Perempuan</td>{" "}
                                {/* Placeholder */}
                                <td className="p-4">{customer.phone || "-"}</td>
                                <td className="p-4">{customer.city || "-"}</td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">
                                    <StatusBadge status={customer.status} />
                                </td>
                                <td className="p-4 flex gap-3 items-center">
                                    <Link
                                        to={`/admin/customer-management/${customer.id}`}
                                    >
                                        <DetailIcon />
                                    </Link>
                                    {customer.status === "Banned" ? (
                                        <button
                                            onClick={() =>
                                                openModal(
                                                    setUnblockModalOpen,
                                                    customer
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
                                                    customer
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
                                                customer
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

            {/* Render Modals */}
            <BlockModal
                isOpen={isBlockModalOpen}
                onClose={() => setBlockModalOpen(false)}
                onConfirm={handleBlock}
                customer={selectedCustomer}
            />
            <UnblockModal
                isOpen={isUnblockModalOpen}
                onClose={() => setUnblockModalOpen(false)}
                onConfirm={handleUnblock}
                customer={selectedCustomer}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                customerName={selectedCustomer?.name}
            />
        </div>
    );
};

export default CustomerManagementPage;
