import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import ApproveModal from "./modals/ApproveModal";
import RejectModal from "./modals/RejectModal";

// Komponen DetailField & BackIcon (sama seperti sebelumnya)
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

const VerifikasiDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [konselor, setKonselor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);

    useEffect(() => {
        const fetchKonselor = async () => {
            /* ... logika fetch detail ... */
        };
        fetchKonselor();
    }, [id]);

    const handleApprove = async () => {
        try {
            await apiClient.post(
                `/api/admin/verifikasi-konselor/${id}/approve`
            );
            setApproveModalOpen(false);
            navigate("/admin/verifikasi-konselor"); // Kembali ke halaman daftar
        } catch (err) {
            console.error("Gagal approve:", err);
        }
    };

    const handleReject = async () => {
        // Tambahkan parameter `reason` jika perlu
        try {
            await apiClient.post(`/api/admin/verifikasi-konselor/${id}/reject`); // Kirim reason jika ada
            setRejectModalOpen(false);
            navigate("/admin/verifikasi-konselor");
        } catch (err) {
            console.error("Gagal reject:", err);
        }
    };

    if (loading || !konselor) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/verifikasi-konselor"
                    className="flex items-center gap-3"
                >
                    <BackIcon />{" "}
                    <h1 className="text-2xl font-bold">
                        Detail Verifikasi Konselor
                    </h1>
                </Link>
                {/* Tombol Aksi Verifikasi */}
                {konselor.status === "Verifikasi" && (
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
                {/* Tampilkan detail konselor sama seperti di Super Admin/Show.jsx */}
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={`https://ui-avatars.com/api/?name=${konselor.name}&background=EBF4FF&color=3B82F6&size=128`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    {/* ... Nama, email, rating ... */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* ... Semua DetailField ... */}
                    <DetailField
                        label="Status Verifikasi Saat Ini"
                        value={konselor.status}
                    />
                </div>
            </div>

            {/* Modals */}
            <ApproveModal
                isOpen={isApproveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                onConfirm={handleApprove}
                konselorName={konselor.name}
            />
            <RejectModal
                isOpen={isRejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                onConfirm={handleReject}
                konselorName={konselor.name}
            />
        </div>
    );
};
// Implementasi fetchKonselor disembunyikan
export default VerifikasiDetailPage;
