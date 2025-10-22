import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";

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
        className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

// --- Komponen Badge Status ---
const StatusBadge = ({ status }) => {
    const styles = {
        Verifikasi: "bg-yellow-100 text-yellow-700",
        Terverifikasi: "bg-green-100 text-green-700",
        Ditolak: "bg-orange-100 text-orange-700", // Atau bg-red-100 text-red-700
        Banned: "bg-red-100 text-red-700 font-bold",
        Offline: "bg-gray-100 text-gray-700", // Fallback
    };
    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
                styles[status] || styles.Offline
            }`}
        >
            {status}
        </span>
    );
};

const VerifikasiKonselorPage = () => {
    const [konselorList, setKonselorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // State filter bisa ditambahkan nanti jika perlu
    // const [filterStatus, setFilterStatus] = useState('Verifikasi');

    const fetchData = async () => {
        try {
            setLoading(true);
            // API endpoint khusus untuk admin verifikasi (hanya status 'Verifikasi')
            const response = await apiClient.get(
                "/api/admin/verifikasi-konselor"
            );
            setKonselorList(response.data);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data konselor yang perlu diverifikasi.");
            console.error("Fetch verifikasi error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Panggil fetchData saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, []); // Array dependensi kosong agar hanya fetch sekali

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Verifikasi Data Konselor
                </h1>
                {/* Dropdown Status (bisa ditambahkan nanti) */}
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100 text-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">No</th>
                            <th className="p-4 font-semibold">ID Konselor</th>
                            <th className="p-4 font-semibold">Nama</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">No Telepon</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-6 text-center text-gray-500"
                                >
                                    Memuat data...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-6 text-center text-red-500"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : konselorList.length > 0 ? (
                            konselorList.map((konselor, index) => (
                                <tr
                                    key={konselor.id}
                                    className="border-t hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="p-4 text-gray-600">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-gray-800">{`#${String(
                                        konselor.id
                                    ).padStart(5, "0")}`}</td>
                                    <td className="p-4 font-medium text-gray-900">
                                        {konselor.name}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {konselor.email}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {konselor.phone || "-"}
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={konselor.status} />
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/admin/verifikasi-konselor/${konselor.id}`}
                                            title="Lihat Detail Verifikasi"
                                            className="inline-block p-1 rounded hover:bg-blue-100"
                                        >
                                            <DetailIcon />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-6 text-center text-gray-500"
                                >
                                    Tidak ada konselor baru yang perlu
                                    diverifikasi saat ini.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VerifikasiKonselorPage; // Pastikan export default ada
