import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icon Panah Kiri (SVG)
function ArrowLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
}

export default function GantiJadwalPage() {
    const navigate = useNavigate();
    const [alasan, setAlasan] = useState("");
    const [tanggalBaru, setTanggalBaru] = useState("");
    const [catatan, setCatatan] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika untuk mengirim data ganti jadwal ke API
        console.log({ alasan, tanggalBaru, catatan });
        alert("Permintaan ganti jadwal terkirim!");
        navigate("/riwayat"); // Kembali ke halaman riwayat
    };

    return (
        // Halaman ini TIDAK menggunakan MobileLayout agar bisa punya header sendiri
        <div className="max-w-md mx-auto min-h-screen bg-sky-50 flex flex-col"> 
            {/* Header Khusus */}
            <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)} // Tombol kembali
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-800 mx-auto pr-8">
                    Ganti Jadwal Konseling
                </h1>
            </header>

            {/* Konten Halaman */}
            <div className="flex-1 flex flex-col"> {/* Wrapper untuk konten scrollable jika perlu */}
                {/* Info Psikolog */}
                <div className="p-4 m-4 bg-white rounded-lg shadow-md flex items-center space-x-3">
                    <img
                        src="https://via.placeholder.com/100" // Ganti dengan path gambar
                        alt="Vina Amalia"
                        className="w-16 h-16 rounded-full object-cover border-2 border-sky-500"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-800">Vina Amalia, M.Psi., Psikolog</h2>
                        <p className="text-sm text-gray-500">Spesialis: konseling anak</p>
                        <p className="text-sm text-gray-500 mt-1">12-09-2025 | 16.00 - 17.00</p>
                    </div>
                </div>

                {/* Form Ganti Jadwal */}
                <form className="flex-1 p-4 pt-0" onSubmit={handleSubmit}> {/* Hapus padding top */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Pilih Alasan Ganti Jadwal
                            </label>
                            <select
                                value={alasan}
                                onChange={(e) => setAlasan(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white" // Tambah bg-white
                            >
                                <option value="">-- Pilih Alasan --</option>
                                <option value="ada acara keluarga">Ada acara keluarga</option>
                                <option value="jadwal bentrok">Jadwal bentrok</option>
                                <option value="sakit">Sakit</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Tanggal Baru
                            </label>
                            <input
                                type="date"
                                value={tanggalBaru}
                                onChange={(e) => setTanggalBaru(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white" // Tambah bg-white
                            />
                        </div>
                        {/* UI untuk memilih jam bisa ditambahkan di sini */}

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Catatan
                            </label>
                            <textarea
                                rows="4"
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                                placeholder="Contoh: Saya mohon maaf..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white resize-none" // Tambah bg-white dan resize-none
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 pb-4"> {/* Tambah padding bottom */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors"
                        >
                            Ganti Jadwal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}