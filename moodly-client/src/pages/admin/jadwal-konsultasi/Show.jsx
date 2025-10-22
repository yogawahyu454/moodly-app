import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../../api/axios";

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
// Star Icon (jika perlu tampilkan rating konselor)
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

const JadwalDetailPage = () => {
    const { id } = useParams();
    const [jadwal, setJadwal] = useState(null);
    // ... (state loading & error) ...

    useEffect(() => {
        const fetchJadwal = async () => {
            try {
                const response = await apiClient.get(
                    `/api/admin/jadwal-konsultasi/${id}`
                );
                setJadwal(response.data);
            } catch (error) {
                console.error("Gagal load detail jadwal:", error);
            }
        };
        fetchJadwal();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    if (!jadwal) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/jadwal-konsultasi"
                    className="flex items-center gap-3"
                >
                    <BackIcon />{" "}
                    <h1 className="text-2xl font-bold">
                        Detail Jadwal Konsultasi
                    </h1>
                </Link>
                {/* Tombol Kembali saja di halaman detail */}
                <Link
                    to="/admin/jadwal-konsultasi"
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Kembali
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Kolom Kiri: Info Customer */}
                <div>
                    <div className="flex items-center gap-6 mb-8">
                        <img
                            src={`https://ui-avatars.com/api/?name=${jadwal.customer?.name}&background=EBF4FF&color=3B82F6&size=128`}
                            alt="Avatar Customer"
                            className="w-24 h-24 rounded-full"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">
                                {jadwal.customer?.name}
                            </h2>
                            <p className="text-gray-500">
                                {jadwal.customer?.email}
                            </p>
                            {/* Tampilkan rating customer jika ada */}
                            {/* <div className="flex items-center gap-1 text-lg mt-1"><StarIcon /> <span>4.8</span></div> */}
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-2">
                        Informasi Customer
                    </h3>
                    <DetailField
                        label="Nama Lengkap"
                        value={jadwal.customer?.name}
                    />
                    <DetailField label="Email" value={jadwal.customer?.email} />
                    <DetailField
                        label="Nomor Telepon"
                        value={jadwal.customer?.phone}
                    />
                    <DetailField label="Kota" value={jadwal.customer?.city} />
                </div>

                {/* Kolom Kanan: Info Konsultasi */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">
                        Informasi Konsultasi
                    </h3>
                    <DetailField
                        label="ID Pemesanan"
                        value={`#${String(jadwal.id).padStart(7, "0")}`}
                    />
                    <DetailField
                        label="Nama Konselor"
                        value={jadwal.konselor?.name}
                    />
                    <DetailField
                        label="Jenis Konsultasi"
                        value={jadwal.jenis_konseling?.jenis_konseling}
                    />
                    <DetailField
                        label="Tanggal"
                        value={formatDate(jadwal.tanggal_konsultasi)}
                    />
                    <DetailField label="Waktu" value={jadwal.jam_konsultasi} />
                    <DetailField
                        label="Metode"
                        value={jadwal.metode_konsultasi}
                    />
                    <DetailField label="Status" value={jadwal.status_pesanan} />
                    {/* TODO: Tambahkan tombol/logika untuk ubah status */}
                </div>
            </div>
        </div>
    );
};

export default JadwalDetailPage;
