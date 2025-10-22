import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import ApproveModal from "./modals/ApproveModal";
import RejectModal from "./modals/RejectModal";

// --- Komponen yang Benar ---
const DetailField = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <div className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 min-h-[42px] flex items-center">
            {" "}
            {/* Tambah min-h */}
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
// ----------------------------

const VerifikasiCustomerDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setLoading(true); // Set loading true di awal
                const response = await apiClient.get(
                    `/api/admin/verifikasi-customer/${id}`
                );
                setCustomer(response.data);
                setError(null); // Clear error jika sukses
            } catch (error) {
                setError("Gagal memuat detail customer.");
                console.error("Fetch detail error:", error);
            } finally {
                setLoading(false); // Set loading false di akhir
            }
        };
        fetchCustomer();
    }, [id]);

    const handleApprove = async () => {
        try {
            await apiClient.post(
                `/api/admin/verifikasi-customer/${id}/approve`
            );
            setApproveModalOpen(false);
            navigate("/admin/verifikasi-customer");
        } catch (err) {
            console.error("Gagal approve:", err);
            // TODO: Tampilkan notifikasi error
        }
    };

    const handleReject = async (reason = null) => {
        try {
            // Kirim alasan jika ada
            await apiClient.post(
                `/api/admin/verifikasi-customer/${id}/reject`,
                { alasan_ditolak: reason }
            );
            setRejectModalOpen(false);
            navigate("/admin/verifikasi-customer");
        } catch (err) {
            console.error("Gagal reject:", err);
            // TODO: Tampilkan notifikasi error
        }
    };

    // --- Format Tanggal ---
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch (e) {
            return "Invalid Date";
        }
    };

    if (loading) return <div className="p-6">Memuat detail...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!customer) return <div className="p-6">Customer tidak ditemukan.</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/verifikasi-customer"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <BackIcon />{" "}
                    <h1 className="text-2xl font-bold">
                        Detail Verifikasi Data Customer
                    </h1>
                </Link>
                {/* Tampilkan tombol hanya jika status masih 'Verifikasi' */}
                {customer.status === "Verifikasi" && (
                    <div>
                        <button
                            onClick={() => setRejectModalOpen(true)}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg mr-3 hover:bg-red-600"
                        >
                            Tolak
                        </button>
                        <button
                            onClick={() => setApproveModalOpen(true)}
                            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Setujui
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Bagian Atas: Avatar, Nama */}
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={`https://ui-avatars.com/api/?name=${customer.name}&background=EBF4FF&color=3B82F6&size=128`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{customer.name}</h2>
                        <p className="text-gray-500">{customer.email}</p>
                        {/* Placeholder Rating jika diperlukan */}
                        {/* <div className="flex items-center gap-1 text-lg mt-1"><StarIcon /> <span>4.8</span></div> */}
                    </div>
                </div>

                {/* Bagian Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <h3 className="md:col-span-2 text-lg font-semibold border-b pb-2 mb-2">
                        Profile Customer
                    </h3>
                    <DetailField label="Nama Lengkap" value={customer.name} />
                    <DetailField label="No Telepon" value={customer.phone} />
                    <DetailField label="Email" value={customer.email} />
                    <DetailField label="Tanggal Lahir" value="-" />{" "}
                    {/* Placeholder */}
                    <DetailField label="Kota" value={customer.city} />
                    <DetailField
                        label="Alamat Lengkap"
                        value={
                            customer.street_address
                                ? `${customer.street_address}, ${customer.district}, ${customer.city}, ${customer.province} ${customer.postal_code}`
                                : "-"
                        }
                    />
                    <DetailField label="Jenis Kelamin" value="-" />{" "}
                    {/* Placeholder */}
                    <DetailField
                        label="Tanggal Bergabung"
                        value={formatDate(customer.created_at)}
                    />
                    <DetailField
                        label="Status Verifikasi"
                        value={customer.status}
                    />
                    {/* Tampilkan alasan ditolak jika ada */}
                    {customer.status === "Ditolak" &&
                        customer.alasan_ditolak && (
                            <DetailField
                                label="Alasan Ditolak"
                                value={customer.alasan_ditolak}
                            />
                        )}
                </div>
            </div>

            {/* Modals */}
            <ApproveModal
                isOpen={isApproveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                onConfirm={handleApprove}
                customerName={customer.name}
            />
            {/* Pastikan handleReject dikirim ke onConfirm */}
            <RejectModal
                isOpen={isRejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                onConfirm={handleReject}
                customerName={customer.name}
            />
        </div>
    );
};

export default VerifikasiCustomerDetailPage;
