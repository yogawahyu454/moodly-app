import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- Komponen Ikon ---
const BackArrowIcon = () => (
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
        className="text-gray-700 group-hover:text-gray-900" // Warna berubah saat hover
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const EditIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
    >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const ChevronRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400"
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);
// --- Akhir Komponen Ikon ---

// --- Komponen Item Form ---
const FormItem = ({
    label,
    value,
    valueLines = 1,
    editable = true,
    onClick,
}) => (
    <div
        onClick={onClick}
        className={`bg-gray-100 rounded-lg p-3 ${
            onClick ? "cursor-pointer hover:bg-gray-200 transition-colors" : ""
        }`}
    >
        <label className="text-xs text-gray-500 font-medium block mb-1">
            {label}
        </label>
        {valueLines > 1 ? (
            <p className="text-sm text-gray-800 whitespace-pre-line">{value}</p>
        ) : (
            <p className="text-sm text-gray-800">{value}</p>
        )}
        {onClick && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronRightIcon />
            </div>
        )}
    </div>
);

export default function EditProfilePage() {
    const navigate = useNavigate(); // Hook untuk navigasi

    // Dummy data state (gantilah dengan data asli dari state/context)
    const [profileData, setProfileData] = useState({
        name: "Indira Rahmania",
        email: "indirarahmania@gmail.com",
        phone: "+62 898 - 9879 - 9484",
        location:
            "Daerah Istimewa Yogyakarta (DIY)\nKota Yogyakarta\nGondokusuman",
        address: "Jl. Cendrawasih No. 12, RT 03 / RW 05, Kelurahan Demangan",
        dob: "15 Agustus 1995", // Tanggal Lahir
        avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
    });

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    return (
        <div className="bg-white min-h-full font-sans">
            {/* Header Halaman (Bagian dari konten, bukan layout) */}
            <header className="bg-white p-4 flex items-center sticky top-0 z-10 border-b border-gray-200">
                <button
                    onClick={handleBack}
                    className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-100 group transition-colors" // Tombol kembali
                    aria-label="Kembali"
                >
                    <BackArrowIcon />
                </button>
                <h1 className="text-lg font-bold text-gray-800 text-center flex-grow">
                    Edit Profile
                </h1>
                <div className="w-8"></div> {/* Spacer agar judul di tengah */}
            </header>

            {/* Konten Utama */}
            <main className="p-4 space-y-5">
                {/* Info Profil Atas */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-3">
                        <img
                            src={profileData.avatar}
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        {/* Tombol Edit Avatar (Contoh) */}
                        <button className="absolute bottom-0 right-0 bg-cyan-500 p-1.5 rounded-full border-2 border-white shadow-md hover:bg-cyan-600 transition-colors">
                            <EditIcon />
                        </button>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {profileData.name}
                    </h2>
                    <p className="text-sm text-gray-500">{profileData.email}</p>
                </div>

                {/* Form Items */}
                <FormItem
                    label="Nama"
                    value={profileData.name}
                    // onClick={() => console.log("Edit Nama")} // Tambahkan aksi jika perlu
                />
                <FormItem
                    label="Nomor"
                    value={profileData.phone}
                    // onClick={() => console.log("Edit Nomor")}
                />
                <FormItem
                    label="Provinsi, Kota, Kecamatan"
                    value={profileData.location}
                    valueLines={3} // Menampilkan beberapa baris
                    // onClick={() => console.log("Edit Lokasi")}
                />
                <FormItem
                    label="Nama Jalan, No Rumah"
                    value={profileData.address}
                    valueLines={2} // Menampilkan beberapa baris
                    onClick={() => console.log("Edit Alamat")} // Aksi edit alamat
                />
                <FormItem
                    label="Tanggal Lahir"
                    value={profileData.dob}
                    // onClick={() => console.log("Edit Tanggal Lahir")}
                />

                {/* Tombol Simpan (Contoh) */}
                <button className="w-full mt-6 bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-cyan-600 transition-colors active:scale-95">
                    Simpan Perubahan
                </button>
            </main>
        </div>
    );
}
