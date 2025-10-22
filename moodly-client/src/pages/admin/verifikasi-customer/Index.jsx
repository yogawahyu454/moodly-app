import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";

// Ikon & Badge Status
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
const StatusBadge = ({ status }) => {
    const styles = {
        Verifikasi: "bg-yellow-100 text-yellow-700",
        Terverifikasi: "bg-green-100 text-green-700",
        Ditolak: "bg-orange-100 text-orange-700", // Atau bg-red-100 text-red-700
        Banned: "bg-red-100 text-red-700 font-bold",
        Offline: "bg-gray-100 text-gray-700", // Tetap ada sebagai fallback
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

const VerifikasiCustomerPage = () => {
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(
                "/api/admin/verifikasi-customer"
            );
            setCustomerList(response.data);
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Verifikasi Data Customer
            </h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">ID Customer</th>
                            <th className="p-4">Nama Customer</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">No Telepon</th>
                            <th className="p-4">Rating</th> {/* Placeholder */}
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="p-4 text-center text-gray-500"
                                >
                                    Memuat...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="p-4 text-center text-red-500"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : customerList.length > 0 ? (
                            customerList.map((customer, index) => (
                                <tr
                                    key={customer.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{`#${String(
                                        customer.id
                                    ).padStart(5, "0")}`}</td>
                                    <td className="p-4 font-medium">
                                        {customer.name}
                                    </td>
                                    <td className="p-4">{customer.email}</td>
                                    <td className="p-4">
                                        {customer.phone || "-"}
                                    </td>
                                    <td className="p-4">4.8</td>{" "}
                                    {/* Placeholder Rating */}
                                    <td className="p-4">
                                        <StatusBadge status={customer.status} />
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/admin/verifikasi-customer/${customer.id}`}
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
                                    colSpan="8"
                                    className="p-4 text-center text-gray-500"
                                >
                                    Tidak ada customer yang perlu diverifikasi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// PASTIKAN BARIS INI ADA DI PALING BAWAH
export default VerifikasiCustomerPage;
