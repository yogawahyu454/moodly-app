import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../../../api/axios";
import ApproveModal from "./modals/ApproveModal";
import RejectModal from "./modals/RejectModal";

// --- Komponen DetailField & BackIcon ---
const DetailField = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <div className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 min-h-[42px] flex items-center">
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
        width="20"
        height="20"
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

const VerifikasiDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [konselor, setKonselor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState(""); // State untuk alasan penolakan

    useEffect(() => {
        const fetchKonselor = async () => {
            try {
                setLoading(true);
                // Pastikan endpoint benar
                const response = await apiClient.get(
                    `/api/admin/verifikasi-konselor/${id}`
                );
                setKonselor(response.data);
                setError(null);
            } catch (err) {
                setError("Gagal memuat detail konselor. Pastikan ID valid.");
                console.error("Fetch detail error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchKonselor();
    }, [id]);

    const handleApprove = async () => {
        try {
            await apiClient.post(
                `/api/admin/verifikasi-konselor/${id}/approve`
            );
            setApproveModalOpen(false);
            navigate("/admin/verifikasi-konselor"); // Kembali ke halaman daftar setelah sukses
        } catch (err) {
            console.error("Gagal approve:", err);
            // TODO: Tampilkan notifikasi error di modal/halaman
        }
    };

    const handleReject = async (reason) => {
        if (!reason && konselor?.status === "Verifikasi") {
            // Alasan wajib jika menolak
            // Mungkin tampilkan pesan error di modal
            console.error("Alasan penolakan wajib diisi.");
            return;
        }
        try {
            // Kirim alasan jika ada
            await apiClient.post(
                `/api/admin/verifikasi-konselor/${id}/reject`,
                { alasan_ditolak: reason }
            );
            setRejectModalOpen(false);
            navigate("/admin/verifikasi-konselor");
        } catch (err) {
            console.error("Gagal reject:", err);
            // TODO: Tampilkan notifikasi error di modal/halaman
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

    if (loading)
        return (
            <div className="p-6 text-center text-gray-500">
                Memuat detail konselor...
            </div>
        );
    if (error)
        return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!konselor)
        return (
            <div className="p-6 text-center text-gray-500">
                Data konselor tidak ditemukan.
            </div>
        );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/verifikasi-konselor"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                    <BackIcon />{" "}
                    <h1 className="text-2xl font-bold text-gray-800">
                        Detail Verifikasi Konselor
                    </h1>
                </Link>
                {/* Tampilkan tombol hanya jika status masih 'Verifikasi' */}
                {konselor.status === "Verifikasi" && (
                    <div>
                        <button
                            onClick={() => setRejectModalOpen(true)}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg mr-3 hover:bg-red-600 transition-colors duration-200"
                        >
                            Tolak
                        </button>
                        <button
                            onClick={() => setApproveModalOpen(true)}
                            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            Setujui
                        </button>
                    </div>
                )}
                {/* Tombol kembali jika status sudah berubah */}
                {konselor.status !== "Verifikasi" && (
                    <Link
                        to="/admin/verifikasi-konselor"
                        className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                        Kembali
                    </Link>
                )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Bagian Atas: Avatar, Nama, Rating */}
                <div className="flex items-center gap-6 mb-8 pb-6 border-b">
                    <img
                        src={`https://ui-avatars.com/api/?name=${konselor.name}&background=EBF4FF&color=3B82F6&size=128&bold=true`}
                        alt="Avatar Konselor"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {konselor.name}, M.Psi., Psikolog
                        </h2>
                        <p className="text-gray-500">{konselor.email}</p>
                    </div>
                    {/* Tampilkan rating jika ada */}
                    {konselor.rating && (
                        <div className="ml-auto flex items-center gap-1 text-xl">
                            <StarIcon />
                            <span className="font-bold text-gray-700">
                                {konselor.rating}
                            </span>
                        </div>
                    )}
                </div>

                {/* Bagian Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <h3 className="md:col-span-2 text-lg font-semibold text-gray-700 mb-2">
                        Profile Konselor
                    </h3>
                    <DetailField label="Nama Lengkap" value={konselor.name} />
                    <DetailField
                        label="Surat Izin Praktik"
                        value={konselor.surat_izin_praktik}
                    />
                    <DetailField label="Email" value={konselor.email} />
                    <DetailField label="Nomor Telepon" value={konselor.phone} />
                    <DetailField label="Kota" value={konselor.city} />
                    <DetailField label="Jenis Kelamin" value="-" />{" "}
                    {/* Placeholder */}
                    <DetailField
                        label="Tanggal Bergabung"
                        value={formatDate(konselor.created_at)}
                    />
                    <DetailField
                        label="Status Verifikasi"
                        value={konselor.status}
                    />
                    {/* Tampilkan Spesialisasi */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-500">
                            Spesialis Konseling
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {konselor.spesialisasi &&
                            konselor.spesialisasi.length > 0 ? (
                                konselor.spesialisasi.map((spec) => (
                                    <span
                                        key={spec}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                    >
                                        {spec}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm">-</span>
                            )}
                        </div>
                    </div>
                    {/* Tampilkan alasan ditolak jika ada */}
                    {konselor.status === "Ditolak" &&
                        konselor.alasan_ditolak && (
                            <DetailField
                                label="Alasan Ditolak"
                                value={konselor.alasan_ditolak}
                            />
                        )}
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
                setReason={setRejectReason}
                reason={rejectReason}
            />
        </div>
    );
};

export default VerifikasiDetailPage;
