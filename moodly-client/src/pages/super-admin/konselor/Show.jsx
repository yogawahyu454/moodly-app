import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../../api/axios";

// --- Komponen Ikon ---
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
        width="16" // Kecilkan ikon bintang agar pas
        height="16"
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

// --- Komponen Badge Status (Sama seperti di Index.jsx) ---
const StatusBadge = ({ status }) => {
    const styles = {
        Verifikasi: "bg-yellow-100 text-yellow-700",
        Terverifikasi: "bg-green-100 text-green-700",
        Ditolak: "bg-orange-100 text-orange-700",
        Banned: "bg-red-100 text-red-700 font-bold",
        Offline: "bg-gray-100 text-gray-700",
        Active: "bg-blue-100 text-blue-700", // Tambahkan status 'Active' jika ada
    };
    return (
        <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
                styles[status] || styles.Offline // Fallback ke Offline
            }`}
        >
            {status}
        </span>
    );
};

// --- Komponen Input Read-Only untuk Tampilan ---
const DetailField = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <div className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-800 min-h-[42px] flex items-center">
            {" "}
            {/* Tambah min-height */}
            {value || "-"}
        </div>
    </div>
);

// --- Komponen Utama Halaman Detail ---
const KonselorDetailPage = () => {
    const { id } = useParams();
    const [konselor, setKonselor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKonselor = async () => {
            if (!id) {
                // Tambah pengecekan ID
                setError("ID Konselor tidak valid.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await apiClient.get(
                    // Pastikan URL endpoint benar
                    `/api/super-admin/konselor-management/${id}`
                );
                setKonselor(response.data);
                setError(null);
            } catch (err) {
                setError(
                    "Gagal memuat detail konselor. Mungkin konselor tidak ditemukan."
                );
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchKonselor();
    }, [id]); // Dependensi pada ID

    if (loading) return <div className="p-6">Memuat detail konselor...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!konselor) return <div className="p-6">Konselor tidak ditemukan.</div>;

    // Format rating (pastikan number)
    const ratingDisplay = konselor.rating
        ? Number(konselor.rating).toFixed(1)
        : "N/A";

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/konselor-management" // Pastikan link kembali benar
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <BackIcon />
                    <h1 className="text-2xl font-bold">Profile Konselor</h1>
                </Link>
                <div>
                    {/* TODO: Implementasikan fungsi Edit */}
                    <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Edit Profile
                    </button>
                    {/* <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg mr-3 hover:bg-gray-300">
                        Batal
                    </button> */}
                </div>
            </div>

            {/* Konten Detail */}
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Bagian Atas: Avatar, Nama, Rating */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    {/* --- PERBAIKAN: Tampilkan Avatar Asli --- */}
                    <img
                        src={
                            konselor.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                konselor.name
                            )}&background=EBF4FF&color=3B82F6&size=128`
                        } // Gunakan URL dari backend
                        alt={`Avatar ${konselor.name}`}
                        className="w-24 h-24 rounded-full object-cover border" // Tambah border
                        onError={(e) => {
                            // Fallback jika URL gagal load
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                konselor.name
                            )}&background=EBF4FF&color=3B82F6&size=128`;
                        }}
                    />
                    {/* --- AKHIR PERBAIKAN --- */}
                    <div className="text-center md:text-left flex-grow">
                        <h2 className="text-2xl font-bold">
                            {konselor.name} {/* Hapus gelar sementara */}
                        </h2>
                        <p className="text-gray-500">{konselor.email}</p>
                        {/* Status Badge */}
                        <div className="mt-2">
                            <StatusBadge status={konselor.status} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xl mt-4 md:mt-0 md:ml-auto">
                        <StarIcon />
                        <span className="font-bold text-gray-700">
                            {ratingDisplay}
                        </span>
                    </div>
                </div>

                {/* Bagian Bawah: Grid Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <h3 className="md:col-span-2 text-lg font-semibold border-b pb-2 mb-2">
                        Informasi Konselor
                    </h3>
                    <DetailField label="Nama Lengkap" value={konselor.name} />
                    {/* --- Kolom Baru: Universitas --- */}
                    <DetailField
                        label="Universitas Asal"
                        value={konselor.universitas}
                    />
                    {/* --- AKHIR Kolom Baru --- */}
                    <DetailField label="Email" value={konselor.email} />
                    <DetailField label="Nomor Telepon" value={konselor.phone} />
                    <DetailField label="Kota" value={konselor.city} />
                    {/* Tampilkan data lain jika ada di $fillable */}
                    <DetailField label="Provinsi" value={konselor.province} />
                    <DetailField label="Kecamatan" value={konselor.district} />
                    <DetailField
                        label="Kode Pos"
                        value={konselor.postal_code}
                    />

                    <div className="md:col-span-2">
                        <DetailField
                            label="Alamat Lengkap"
                            value={konselor.street_address}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <DetailField
                            label="Surat Izin Praktik"
                            value={konselor.surat_izin_praktik}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-500">
                            Spesialis Konseling
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {konselor.spesialisasi &&
                            Array.isArray(konselor.spesialisasi) && // Pastikan array
                            konselor.spesialisasi.length > 0 ? (
                                konselor.spesialisasi.map(
                                    (
                                        spec,
                                        index // Tambah index
                                    ) => (
                                        <span
                                            key={index} // Gunakan index sebagai key jika spec tidak unik
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                        >
                                            {spec}
                                        </span>
                                    )
                                )
                            ) : (
                                <span className="text-gray-400 text-sm">-</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KonselorDetailPage;
