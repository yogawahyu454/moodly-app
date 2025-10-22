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

const BookingDetailPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    // ... (state loading & error) ...

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await apiClient.get(
                    `/api/super-admin/booking-management/${id}`
                );
                setBooking(response.data);
            } catch (error) {
                console.error("Gagal load detail:", error);
            }
        };
        fetchBooking();
    }, [id]);

    const formatDate = (dateString) => {
        /* ... */
    };
    const formatRupiah = (number) => {
        /* ... */
    };

    if (!booking) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/booking-management"
                    className="flex items-center gap-3"
                >
                    <BackIcon />{" "}
                    <h1 className="text-2xl font-bold">Detail Pesanan</h1>
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Kolom Kiri */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{`#${String(
                            booking.id
                        ).padStart(3, "0")}`}</span>
                        <span className="text-gray-500">
                            Tanggal Order: {formatDate(booking.created_at)}
                        </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-3">
                        Informasi Pelanggan
                    </h3>
                    <DetailField
                        label="Nama Lengkap"
                        value={booking.customer?.name}
                    />
                    <DetailField
                        label="Email"
                        value={booking.customer?.email}
                    />
                    <DetailField
                        label="Nomor Telepon"
                        value={booking.customer?.phone}
                    />

                    <h3 className="text-lg font-semibold mt-6 mb-3">
                        Informasi Konselor
                    </h3>
                    <DetailField
                        label="Nama Lengkap"
                        value={booking.konselor?.name}
                    />
                    <DetailField
                        label="Email"
                        value={booking.konselor?.email}
                    />
                    <DetailField
                        label="Nomor Telepon"
                        value={booking.konselor?.phone}
                    />
                </div>

                {/* Kolom Kanan */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">
                        Informasi Pesanan
                    </h3>
                    <DetailField
                        label="Jenis Konsultasi"
                        value={booking.jenis_konseling?.jenis_konseling}
                    />
                    {/* <DetailField label="Durasi Konseling" value={booking.durasi_konseling?.durasi_menit} /> */}
                    <DetailField
                        label="Tanggal Konseling"
                        value={formatDate(booking.tanggal_konsultasi)}
                    />
                    <DetailField
                        label="Waktu Konseling"
                        value={booking.jam_konsultasi}
                    />
                    <DetailField
                        label="Metode Konsultasi"
                        value={booking.metode_konsultasi}
                    />
                    {/* <DetailField label="Tempat Konseling" value={booking.tempat_konseling?.nama_tempat} /> */}
                    <DetailField
                        label="Harga"
                        value={formatRupiah(booking.total_harga)}
                    />
                    <DetailField
                        label="Status Pesanan"
                        value={booking.status_pesanan}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingDetailPage;
