import React, { useState, useEffect } from "react";
// --- PERBAIKAN: Path relatif tanpa ekstensi ---
import apiClient from "../../../api/axios";
// AdminLayout tidak diimpor di sini, karena sudah di-handle oleh Router
import AddEditModal from "./modals/AddEditModal";
import DeleteModal from "./modals/DeleteModal";
// --- AKHIR PERBAIKAN ---

// --- Komponen Ikon ---
const PlusIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
        />
    </svg>
);

const EditIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
);

const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
        />
    </svg>
);
// --- Akhir Komponen Ikon ---

// Komponen Badge Status
const StatusBadge = ({ status }) => {
    const isActive = status === "Aktif";
    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
                isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
            }`}
        >
            {status}
        </span>
    );
};

export default function PaymentMethodsPage() {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk Modal
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null); // Untuk edit atau delete

    // Fungsi Fetch Data
    const fetchPaymentMethods = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                "/api/super-admin/payment-methods"
            );
            setPaymentMethods(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal mengambil data metode pembayaran.");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data saat komponen dimuat
    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    // Handler Modal
    const handleOpenAddModal = () => {
        setSelectedMethod(null); // Pastikan null (mode Tambah)
        setIsAddEditModalOpen(true);
    };

    const handleOpenEditModal = (method) => {
        setSelectedMethod(method); // Set data (mode Edit)
        setIsAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (method) => {
        setSelectedMethod(method);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsAddEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedMethod(null);
    };

    // Handler Sukses (refresh data)
    const handleSuccess = () => {
        handleCloseModals();
        fetchPaymentMethods(); // Ambil data terbaru
    };

    // --- PERBAIKAN: Bungkus dengan Fragment (<>) ---
    return (
        <>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Metode Pembayaran (QRIS)
                    </h1>
                    <button
                        onClick={handleOpenAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-150 text-sm font-medium"
                    >
                        <PlusIcon />
                        Tambah Metode
                    </button>
                </div>

                {/* Loading & Error Handling */}
                {loading && (
                    <p className="text-center text-gray-500">Memuat data...</p>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Tabel Data */}
                {!loading && !error && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Gambar (QRIS)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Nama
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Detail Akun
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paymentMethods.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            Belum ada data metode pembayaran.
                                        </td>
                                    </tr>
                                ) : (
                                    paymentMethods.map((method) => (
                                        <tr
                                            key={method.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={method.image_url} // Gunakan accessor dari model
                                                    alt={method.name}
                                                    className="w-16 h-16 object-cover rounded-md border"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "https://placehold.co/100x100/EBF8FF/3B82F6?text=QRIS";
                                                    }}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {method.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {method.account_details ||
                                                        "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge
                                                    status={method.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        handleOpenEditModal(
                                                            method
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-150 mr-3"
                                                    aria-label={`Edit ${method.name}`}
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleOpenDeleteModal(
                                                            method
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 transition-colors duration-150"
                                                    aria-label={`Hapus ${method.name}`}
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Tambah/Edit */}
            {isAddEditModalOpen && (
                <AddEditModal
                    isOpen={isAddEditModalOpen}
                    onClose={handleCloseModals}
                    onSuccess={handleSuccess}
                    methodToEdit={selectedMethod} // Kirim data jika mode edit, null jika mode tambah
                />
            )}

            {/* Modal Delete */}
            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseModals}
                    onSuccess={handleSuccess}
                    methodToDelete={selectedMethod}
                />
            )}
        </>
        // --- AKHIR PERBAIKAN (Fragment) ---
    );
}
