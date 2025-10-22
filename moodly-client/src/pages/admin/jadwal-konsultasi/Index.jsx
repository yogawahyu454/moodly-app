import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
import DeleteModal from "./modals/DeleteModal";

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
// Tambahkan ikon lain jika perlu (misal: Edit Status)

// Badge Status (Sama seperti halaman Pesanan Super Admin)
const StatusBadge = ({ status }) => {
    const styles = {
        Selesai: "bg-green-100 text-green-700",
        Batal: "bg-red-100 text-red-700",
        Proses: "bg-yellow-100 text-yellow-700",
        Dijadwalkan: "bg-blue-100 text-blue-700",
        Berlangsung: "bg-purple-100 text-purple-700",
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

const JadwalKonsultasiPage = () => {
    const [jadwalList, setJadwalList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState(""); // State untuk filter dropdown
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Tambahkan parameter status jika filter dipilih
            const params = filterStatus ? { status: filterStatus } : {};
            const response = await apiClient.get(
                "/api/admin/jadwal-konsultasi",
                { params }
            );
            setJadwalList(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat jadwal konsultasi.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Panggil fetchData saat komponen dimuat atau filter berubah
    useEffect(() => {
        fetchData();
    }, [filterStatus]);

    const handleDelete = async () => {
        if (!selectedJadwal) return;
        try {
            await apiClient.delete(
                `/api/admin/jadwal-konsultasi/${selectedJadwal.id}`
            );
            setDeleteModalOpen(false);
            setSelectedJadwal(null);
            fetchData();
        } catch (err) {
            console.error("Gagal menghapus jadwal:", err);
        }
    };

    const openModal = (setter, jadwal = null) => {
        setSelectedJadwal(jadwal);
        setter(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Jadwal Konsultasi</h1>
                {/* Dropdown Filter Status */}
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="appearance-none w-48 px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Semua Status</option>
                        <option value="Menunggu Konfirmasi">
                            Menunggu Konfirmasi
                        </option>
                        <option value="Dijadwalkan">Dijadwalkan</option>
                        <option value="Berlangsung">Berlangsung</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Batal">Batal</option>
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
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">ID Pemesanan</th>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Jam</th>
                            <th className="p-4">Jenis Konsultasi</th>
                            <th className="p-4">Nama Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="p-4 text-center">
                                    Memuat...
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
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4">{`#${String(
                                        jadwal.id
                                    ).padStart(7, "0")}`}</td>
                                    <td className="p-4">
                                        {formatDate(jadwal.tanggal_konsultasi)}
                                    </td>
                                    <td className="p-4">
                                        {jadwal.jam_konsultasi}
                                    </td>
                                    <td className="p-4">
                                        {jadwal.jenis_konseling
                                            ?.jenis_konseling || "N/A"}
                                    </td>
                                    <td className="p-4 font-medium">
                                        {jadwal.customer?.name || "N/A"}
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge
                                            status={jadwal.status_pesanan}
                                        />
                                    </td>
                                    <td className="p-4 flex gap-3 items-center">
                                        <Link
                                            to={`/admin/jadwal-konsultasi/${jadwal.id}`}
                                            title="Lihat Detail"
                                        >
                                            <DetailIcon />
                                        </Link>
                                        {/* TODO: Tambahkan tombol/logika untuk ubah status */}
                                        <button
                                            onClick={() =>
                                                openModal(
                                                    setDeleteModalOpen,
                                                    jadwal
                                                )
                                            }
                                            title="Hapus Jadwal"
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
                                    Tidak ada jadwal konsultasi.
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
