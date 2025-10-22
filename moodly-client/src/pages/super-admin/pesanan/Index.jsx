import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
import DeleteModal from "./modals/DeleteModal"; // Akan kita buat

// Ikon
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
        className="text-blue-500 hover:text-blue-700"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
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

// Badge Status
const StatusBadge = ({ status }) => {
    const styles = {
        Selesai: "bg-green-100 text-green-700",
        Batal: "bg-red-100 text-red-700",
        Proses: "bg-yellow-100 text-yellow-700",
        Dijadwalkan: "bg-blue-100 text-blue-700",
        "Menunggu Konfirmasi": "bg-gray-100 text-gray-700",
    };
    return (
        <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
                styles[status] || styles["Menunggu Konfirmasi"]
            }`}
        >
            {status}
        </span>
    );
};

const BookingManagementPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchData = async () => {
        /* ... logika fetch ... */
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        /* ... logika delete ... */
    };
    const openModal = (setter, booking = null) => {
        /* ... logika open modal ... */
    };

    const formatDate = (dateString) => {
        /* ... fungsi format tanggal ... */
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Pesanan</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">ID Pelanggan</th>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Nama Pelanggan</th>
                            <th className="p-4">Pilihan Konsultasi</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.id} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{`#${String(
                                    booking.customer_id
                                ).padStart(5, "0")}`}</td>
                                <td className="p-4">
                                    {formatDate(booking.tanggal_konsultasi)}
                                </td>
                                <td className="p-4 font-medium">
                                    {booking.customer?.name || "N/A"}
                                </td>
                                <td className="p-4">
                                    {booking.metode_konsultasi}
                                </td>
                                <td className="p-4">
                                    <StatusBadge
                                        status={booking.status_pesanan}
                                    />
                                </td>
                                <td className="p-4 flex gap-3 items-center">
                                    <Link
                                        to={`/admin/booking-management/${booking.id}`}
                                    >
                                        <DetailIcon />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            openModal(
                                                setDeleteModalOpen,
                                                booking
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
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                bookingId={selectedBooking?.id}
            />
        </div>
    );
};
// Implementasi lengkap fetch, delete, openModal, formatDate disembunyikan
export default BookingManagementPage;
