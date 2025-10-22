import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
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
        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
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
        className="text-red-500 hover:text-red-700 transition-colors duration-200"
    >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);
const ChevronDownIconMini = () => (
    <svg
        className="w-4 h-4 ml-1 inline-block text-gray-600 group-hover:text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>
);

// --- Komponen Status Dropdown ---
const StatusDropdown = ({ currentStatus, bookingId, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    // Urutan status yang logis untuk diubah oleh Admin
    const statuses = [
        "Menunggu Konfirmasi",
        "Dijadwalkan",
        "Berlangsung",
        "Selesai",
        "Batal",
    ];
    const statusStyles = {
        Selesai: "bg-green-100 text-green-700 border-green-200",
        Batal: "bg-red-100 text-red-700 border-red-200",
        Proses: "bg-yellow-100 text-yellow-700 border-yellow-200", // Mungkin tidak dipakai Admin
        Dijadwalkan: "bg-blue-100 text-blue-700 border-blue-200",
        Berlangsung: "bg-purple-100 text-purple-700 border-purple-200",
        "Menunggu Konfirmasi": "bg-gray-100 text-gray-700 border-gray-200",
    };
    const hoverStyles = {
        Selesai: "hover:bg-green-200",
        Batal: "hover:bg-red-200",
        Proses: "hover:bg-yellow-200",
        Dijadwalkan: "hover:bg-blue-200",
        Berlangsung: "hover:bg-purple-200",
        "Menunggu Konfirmasi": "hover:bg-gray-200",
    };

    const handleChange = (newStatus) => {
        if (newStatus !== currentStatus) {
            // Hanya panggil API jika status berubah
            onStatusChange(bookingId, newStatus);
        }
        setIsOpen(false);
    };

    // Menutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest(`.dropdown-${bookingId}`)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, bookingId]);

    return (
        <div
            className={`relative inline-block text-left dropdown-${bookingId}`}
        >
            <div>
                <button
                    type="button"
                    className={`inline-flex items-center justify-center w-full rounded-full border shadow-sm px-3 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 group transition-colors duration-150 ${
                        statusStyles[currentStatus] ||
                        statusStyles["Menunggu Konfirmasi"]
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    {currentStatus}
                    <ChevronDownIconMini />
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    {" "}
                    {/* Tambah z-index */}
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => handleChange(status)}
                                // Nonaktifkan pilihan status saat ini
                                disabled={status === currentStatus}
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 
                                            ${
                                                statusStyles[status] ||
                                                statusStyles[
                                                    "Menunggu Konfirmasi"
                                                ]
                                            } 
                                            ${
                                                status !== currentStatus
                                                    ? `${hoverStyles[status]} text-gray-900`
                                                    : "opacity-50 cursor-not-allowed"
                                            }
                                         `}
                                role="menuitem"
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const JadwalKonsultasiPage = () => {
    const [jadwalList, setJadwalList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState(""); // State untuk filter dropdown utama
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);

    // --- Fungsi Fetch Data ---
    const fetchData = async () => {
        try {
            setLoading(true);
            const params = filterStatus ? { status: filterStatus } : {};
            const response = await apiClient.get(
                "/api/admin/jadwal-konsultasi",
                { params }
            );
            setJadwalList(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat jadwal konsultasi.");
            console.error("Fetch Jadwal Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Panggil fetchData saat komponen dimuat atau filter berubah
    useEffect(() => {
        fetchData();
    }, [filterStatus]);

    // --- Fungsi Hapus ---
    const handleDelete = async () => {
        if (!selectedJadwal) return;
        try {
            await apiClient.delete(
                `/api/admin/jadwal-konsultasi/${selectedJadwal.id}`
            );
            setDeleteModalOpen(false);
            setSelectedJadwal(null);
            fetchData(); // Muat ulang data
        } catch (err) {
            console.error("Gagal menghapus jadwal:", err);
            // TODO: Tampilkan notifikasi error
        }
    };

    // --- Fungsi Buka Modal ---
    const openModal = (setter, jadwal = null) => {
        setSelectedJadwal(jadwal);
        setter(true);
    };

    // --- Fungsi Format Tanggal ---
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            // Format: 05-Januari-2024
            return date
                .toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
                .replace(/ /g, "-");
        } catch (e) {
            console.error("Format date error:", e);
            return "Invalid Date";
        }
    };

    // --- FUNGSI BARU UNTUK UPDATE STATUS ---
    const handleStatusChange = async (bookingId, newStatus) => {
        // Simpan state lama jika perlu rollback
        const oldJadwalList = [...jadwalList];
        try {
            // Optimistic UI update
            setJadwalList((prevList) =>
                prevList.map((jadwal) =>
                    jadwal.id === bookingId
                        ? { ...jadwal, status_pesanan: newStatus }
                        : jadwal
                )
            );

            // Panggil API backend
            await apiClient.patch(
                `/api/admin/jadwal-konsultasi/${bookingId}/status`,
                {
                    status_pesanan: newStatus,
                }
            );
        } catch (err) {
            console.error("Gagal mengubah status jadwal:", err);
            // Rollback UI update jika API gagal
            setJadwalList(oldJadwalList);
            // Tampilkan notifikasi error (misalnya pakai library 'react-toastify')
            alert(`Gagal mengubah status: ${err.message}`);
        }
    };

    // --- Daftar Status untuk Filter Utama ---
    const filterOptions = [
        "Semua Status",
        "Menunggu Konfirmasi",
        "Dijadwalkan",
        "Berlangsung",
        "Selesai",
        "Batal",
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Jadwal Konsultasi {filterStatus && `(${filterStatus})`}
                </h1>
                {/* Dropdown Filter Status */}
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="appearance-none w-48 px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                    >
                        {filterOptions.map((option) => (
                            <option
                                key={option}
                                value={option === "Semua Status" ? "" : option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left text-sm">
                    {" "}
                    {/* Kecilkan font tabel */}
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                        {" "}
                        {/* Kecilkan font header */}
                        <tr>
                            <th className="p-3">ID Pemesanan</th>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Jam</th>
                            <th className="p-3">Jenis Konsultasi</th>
                            <th className="p-3">Nama Customer</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="p-4 text-center">
                                    Memuat jadwal...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-4 text-center text-red-500"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : jadwalList.length > 0 ? (
                            jadwalList.map((jadwal) => (
                                <tr
                                    key={jadwal.id}
                                    className="border-t hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="p-3 font-mono text-gray-500">{`#${String(
                                        jadwal.id
                                    ).padStart(7, "0")}`}</td>
                                    <td className="p-3">
                                        {formatDate(jadwal.tanggal_konsultasi)}
                                    </td>
                                    <td className="p-3">
                                        {jadwal.jam_konsultasi}
                                    </td>
                                    <td className="p-3">
                                        {jadwal.jenis_konseling
                                            ?.jenis_konseling || "N/A"}
                                    </td>
                                    <td className="p-3 font-medium text-gray-800">
                                        {jadwal.customer?.name || "N/A"}
                                    </td>
                                    <td className="p-3">
                                        <StatusDropdown
                                            currentStatus={
                                                jadwal.status_pesanan
                                            }
                                            bookingId={jadwal.id}
                                            onStatusChange={handleStatusChange}
                                        />
                                    </td>
                                    <td className="p-3 flex gap-2 items-center">
                                        <Link
                                            to={`/admin/jadwal-konsultasi/${jadwal.id}`}
                                            title="Lihat Detail"
                                            className="p-1 rounded hover:bg-blue-100"
                                        >
                                            <DetailIcon />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                openModal(
                                                    setDeleteModalOpen,
                                                    jadwal
                                                )
                                            }
                                            title="Hapus Jadwal"
                                            className="p-1 rounded hover:bg-red-100"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-4 text-center text-gray-500"
                                >
                                    Tidak ada jadwal konsultasi{" "}
                                    {filterStatus &&
                                        `dengan status "${filterStatus}"`}
                                    .
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* TODO: Tambahkan pagination jika perlu */}
            </div>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                bookingId={selectedJadwal?.id}
            />
        </div>
    );
};

export default JadwalKonsultasiPage;
