import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";

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
        className="text-gray-500 hover:text-gray-700"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

// Badge Status (Sama seperti halaman Konselor Super Admin)
const StatusBadge = ({ status }) => {
    const styles = { Verifikasi: "bg-yellow-100 text-yellow-700" /* ... */ };
    return (
        <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
                styles[status] || "bg-gray-100 text-gray-700"
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
    const [filterStatus, setFilterStatus] = useState("Verifikasi"); // Filter default

    const fetchData = async () => {
        try {
            setLoading(true);
            // API endpoint khusus untuk admin verifikasi
            const response = await apiClient.get(
                "/api/admin/verifikasi-konselor"
            );
            setKonselorList(response.data);
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
    }, []); // Hanya fetch sekali saat load

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Verifikasi Data Konselor</h1>
                {/* Dropdown Status (jika ingin bisa filter status lain) */}
                {/* <select ...></select> */}
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
                        ) : konselorList.length > 0 ? (
                            konselorList.map((konselor, index) => (
                                <tr
                                    key={konselor.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{`#${String(
                                        konselor.id
                                    ).padStart(5, "0")}`}</td>
                                    <td className="p-4 font-medium">
                                        {konselor.name}
                                    </td>
                                    <td className="p-4">{konselor.email}</td>
                                    <td className="p-4">
                                        {konselor.phone || "-"}
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={konselor.status} />
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/admin/verifikasi-konselor/${konselor.id}`}
                                            title="Lihat Detail Verifikasi"
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
                                    className="p-4 text-center text-gray-500"
                                >
                                    Tidak ada konselor yang perlu diverifikasi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
// Implementasi StatusBadge disembunyikan
export default VerifikasiKonselorPage;
