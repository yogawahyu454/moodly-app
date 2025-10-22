import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../../api/axios";

// Komponen DetailField (sama seperti sebelumnya)
const DetailField = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <div className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-800">
            {value || "-"}
        </div>
    </div>
);
const BackIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);
const StarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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

const CustomerDetailPage = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(
                    `/api/super-admin/customer-management/${id}`
                );
                setCustomer(response.data);
                setError(null);
            } catch (err) {
                setError("Gagal memuat detail customer.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    const formatDate = (dateString) => {
        /* ... (fungsi format tanggal sama) ... */
    };

    if (loading) return <div className="p-6">Memuat detail...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!customer) return <div className="p-6">Customer tidak ditemukan.</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/customer-management"
                    className="flex items-center gap-3"
                >
                    <BackIcon />{" "}
                    <h1 className="text-2xl font-bold">Profile Customer</h1>
                </Link>
                <div>
                    <button className="px-5 py-2 bg-gray-200 rounded-lg mr-3">
                        Batal
                    </button>
                    <button className="px-5 py-2 bg-blue-500 text-white rounded-lg">
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={`https://ui-avatars.com/api/?name=${customer.name}&background=EBF4FF&color=3B82F6&size=128`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{customer.name}</h2>
                        <p className="text-gray-500">{customer.email}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 text-xl">
                        <StarIcon />{" "}
                        <span className="font-bold text-gray-700">4.8</span>{" "}
                        {/* Placeholder */}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <h3 className="md:col-span-2 text-lg font-semibold border-b pb-2 mb-2">
                        Profile Customer
                    </h3>
                    <DetailField label="Nama Lengkap" value={customer.name} />
                    <DetailField label="No Telepon" value={customer.phone} />
                    <DetailField
                        label="Jenis Kelamin"
                        value="Laki - laki"
                    />{" "}
                    {/* Placeholder */}
                    <DetailField
                        label="Tanggal Lahir"
                        value="12 Januari 1997"
                    />{" "}
                    {/* Placeholder */}
                    <DetailField label="Kota" value={customer.city} />
                    <DetailField
                        label="Alamat"
                        value={
                            customer.street_address
                                ? `${customer.street_address}, ${customer.district}, ${customer.city}, ${customer.province} ${customer.postal_code}`
                                : "-"
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailPage;
