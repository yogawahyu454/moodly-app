import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../../api/axios";

// --- Komponen Input Read-Only untuk Tampilan ---
const DetailField = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <div className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg">
            {value || "-"}
        </div>
    </div>
);

// --- Komponen Utama Halaman Detail ---
const AdminDetailPage = () => {
    const { id } = useParams(); // Mengambil ID dari URL, contoh: /admin/admin-management/1
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                setLoading(true);
                // Memanggil endpoint 'show' di backend
                const response = await apiClient.get(
                    `/api/super-admin/admin-management/${id}`
                );
                setAdmin(response.data);
                setError(null);
            } catch (err) {
                setError(
                    "Gagal memuat detail admin. Mungkin admin tidak ditemukan."
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmin();
    }, [id]); // Efek ini akan berjalan lagi jika ID di URL berubah

    if (loading) return <div className="p-6">Memuat detail admin...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!admin) return <div className="p-6">Admin tidak ditemukan.</div>;

    // Fungsi untuk format tanggal
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="p-6">
            {/* Header dengan tombol Back dan Aksi */}
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/admin-management"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
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
                    <h1 className="text-2xl font-bold">Profile Admin</h1>
                </Link>
                <div>
                    <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg mr-3 hover:bg-gray-300">
                        Batal
                    </button>
                    <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Konten Detail */}
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Bagian Atas: Avatar dan Nama */}
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={`https://ui-avatars.com/api/?name=${admin.name}&background=EBF4FF&color=3B82F6&size=128`}
                        alt="Admin Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{admin.name}</h2>
                        <p className="text-gray-500">Admin Moodly</p>
                    </div>
                </div>

                {/* Bagian Bawah: Grid Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <h3 className="md:col-span-2 text-lg font-semibold border-b pb-2 mb-2">
                        Profile Admin
                    </h3>
                    <DetailField label="Nama Lengkap" value={admin.name} />
                    <DetailField
                        label="Tanggal Lahir"
                        value="10-08-1998"
                    />{" "}
                    {/* Placeholder */}
                    <DetailField label="Email" value={admin.email} />
                    <DetailField label="Nomor Telepon" value={admin.phone} />
                    <DetailField label="Posisi" value="Admin Curhat" />{" "}
                    {/* Placeholder */}
                    <DetailField label="Kota" value={admin.city} />
                    <DetailField label="Jenis Kelamin" value="Perempuan" />{" "}
                    {/* Placeholder */}
                    <DetailField
                        label="Tanggal Bergabung"
                        value={formatDate(admin.created_at)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDetailPage;
