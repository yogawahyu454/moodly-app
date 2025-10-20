import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Komponen InputField dengan Label
function InputField({ label, placeholder, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
        </div>
    );
}

// --- Komponen Ikon ---
function ArrowLeftIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24"
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
}

export default function AddressPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Menerima data (name, phone, email, address) dari halaman registrasi
    const registrationData = location.state;

    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [postalCode, setPostalCode] = useState("");
    // Menggunakan alamat singkat dari halaman sebelumnya sebagai nilai default
    const [streetAddress, setStreetAddress] = useState(
        registrationData?.address || ""
    );
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Pengaman: Jika pengguna mengakses halaman ini tanpa melalui halaman registrasi,
        // kembalikan mereka.
        if (!registrationData) {
            alert("Silakan isi data diri terlebih dahulu.");
            navigate("/register");
        }
    }, [registrationData, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        // Gabungkan data dari halaman sebelumnya dengan data dari form ini
        const finalData = {
            ...registrationData, // Ini berisi: name, phone, email, dan address singkat
            province,
            city,
            district,
            postalCode,
            streetAddress, // Ini berisi alamat detail (nama jalan, dll.)
        };

        // Kirim SEMUA data ke endpoint register
        axios
            .post("http://127.0.0.1:8000/api/register", finalData)
            .then((response) => {
                const userId = response.data.user_id;
                // Jika berhasil, arahkan ke halaman pembuatan password dan kirim user ID
                navigate("/create-password", { state: { userId: userId } });
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    alert(
                        "Data yang Anda masukkan tidak valid. Harap periksa kembali."
                    );
                } else {
                    console.error("Error saat registrasi:", error);
                    setErrors({ server: ["Terjadi kesalahan pada server."] });
                    alert("Terjadi kesalahan, silakan coba lagi.");
                }
            });
    };

    const contentWidth = "max-w-md";

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex-1 hidden md:block"></div>
            <div
                className={`w-full ${contentWidth} min-h-screen bg-white shadow-2xl flex flex-col`}
            >
                <header className="p-4 flex items-center border-b">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 mr-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">
                        Alamat Lengkap
                    </h1>
                </header>
                <main className="flex-grow flex flex-col p-8 pt-6">
                    <p className="text-sm text-gray-500 mb-6">
                        Silakan lengkapi detail alamat Anda.
                    </p>
                    <div className="w-full">
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <InputField
                                label="Provinsi"
                                placeholder="Masukkan provinsi"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                            <InputField
                                label="Kota"
                                placeholder="Masukkan kota"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <InputField
                                label="Kecamatan"
                                placeholder="Masukkan kecamatan"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                            <InputField
                                label="Kode Pos"
                                placeholder="Masukkan kode pos"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                type="number"
                            />
                            <InputField
                                label="Nama Jalan, Gedung, No. Rumah"
                                placeholder="Masukkan detail alamat"
                                value={streetAddress}
                                onChange={(e) =>
                                    setStreetAddress(e.target.value)
                                }
                            />
                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                                >
                                    Lanjutkan
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            <div className="flex-1 hidden md:block"></div>
        </div>
    );
}
