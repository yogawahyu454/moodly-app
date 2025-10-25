import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
// --- PERBAIKAN: Path relatif dengan ekstensi ---
import apiClient from "../../../api/axios.js";
import AdminLayout from "../../../layouts/AdminLayout.jsx"; // <-- Kita tetap import, tapi tidak dipakai membungkus di sini
// --- AKHIR PERBAIKAN ---

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

// --- Komponen Badge Status ---
const StatusBadge = ({ status }) => {
    const styles = {
        Verifikasi: "bg-yellow-100 text-yellow-700",
        Terverifikasi: "bg-green-100 text-green-700",
        Ditolak: "bg-orange-100 text-orange-700",
        Banned: "bg-red-100 text-red-700 font-bold",
        Offline: "bg-gray-100 text-gray-700",
        Active: "bg-blue-100 text-blue-700",
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

// --- Komponen Input Read-Only ---
const DetailField = ({ label, value }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <div className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-800 min-h-[42px] flex items-center">
            {value || "-"}
        </div>
    </div>
);

// --- Helper Format Jadwal ---
const formatDayOfWeek = (day) => {
    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu",
    ];
    // Pastikan day adalah number sebelum akses array
    const dayIndex = Number(day);
    return days[dayIndex] || "Tidak Valid";
};

const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5); // Format HH:MM
};

// --- Komponen Form Tambah Jadwal ---
const AddAvailabilityForm = ({ counselorId, onAvailabilityAdded }) => {
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!dayOfWeek || !startTime || !endTime) {
            setError("Harap lengkapi semua field.");
            setLoading(false);
            return;
        }
        if (startTime >= endTime) {
            setError("Jam selesai harus setelah jam mulai.");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post(
                `/api/super-admin/konselor-management/${counselorId}/availabilities`,
                {
                    day_of_week: dayOfWeek,
                    start_time: startTime,
                    end_time: endTime,
                }
            );
            onAvailabilityAdded(response.data);
            setDayOfWeek("");
            setStartTime("");
            setEndTime("");
        } catch (err) {
            console.error("Error adding availability:", err);
            // Cek jika error validasi dari backend
            if (err.response && err.response.status === 422) {
                // Ambil pesan error pertama (atau format sesuai kebutuhan)
                const firstError = Object.values(
                    err.response.data.errors
                )[0][0];
                setError(firstError || "Input tidak valid.");
            } else {
                setError(
                    err.response?.data?.message || "Gagal menambahkan jadwal."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 p-4 border rounded bg-gray-50"
        >
            <h4 className="text-md font-semibold mb-3">Tambah Jadwal Baru</h4>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label
                        htmlFor="day_of_week"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Hari
                    </label>
                    <select
                        id="day_of_week"
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                    >
                        <option value="" disabled>
                            Pilih Hari
                        </option>
                        <option value="1">Senin</option>
                        <option value="2">Selasa</option>
                        <option value="3">Rabu</option>
                        <option value="4">Kamis</option>
                        <option value="5">Jum'at</option>
                        <option value="6">Sabtu</option>
                        <option value="0">Minggu</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="start_time"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Jam Mulai
                    </label>
                    <input
                        type="time"
                        id="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        step="1800" // Set kelipatan 30 menit jika perlu
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="end_time"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Jam Selesai
                    </label>
                    <input
                        type="time"
                        id="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        step="1800" // Set kelipatan 30 menit jika perlu
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="mt-3 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-md hover:bg-cyan-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
                {loading ? "Menyimpan..." : "Simpan Jadwal"}
            </button>
        </form>
    );
};

// --- Komponen Utama Halaman Detail ---
const KonselorDetailPage = () => {
    const { id: userId } = useParams(); // Ganti nama variabel agar konsisten
    const navigate = useNavigate(); // Tambahkan useNavigate
    const [konselor, setKonselor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("detail"); // State untuk tab

    // State untuk jadwal
    const [availabilities, setAvailabilities] = useState([]);
    const [loadingAvailabilities, setLoadingAvailabilities] = useState(false);
    const [errorAvailabilities, setErrorAvailabilities] = useState(null);

    // Fetch detail konselor
    useEffect(() => {
        const fetchKonselor = async () => {
            if (!userId) {
                setError("ID Konselor tidak valid.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await apiClient.get(
                    `/api/super-admin/konselor-management/${userId}`
                );
                // Validasi role di sini (jika perlu)
                if (response.data.role !== "konselor") {
                    setError("User yang dipilih bukan konselor.");
                    setLoading(false);
                    return;
                }
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
    }, [userId]);

    // Fetch jadwal ketersediaan
    const fetchAvailabilities = async () => {
        if (!userId) return;
        try {
            setLoadingAvailabilities(true);
            setErrorAvailabilities(null);
            const response = await apiClient.get(
                `/api/super-admin/konselor-management/${userId}/availabilities`
            );
            // Urutkan jadwal saat diterima
            const sortedAvailabilities = response.data.sort((a, b) => {
                if (a.day_of_week !== b.day_of_week) {
                    const dayA = a.day_of_week === 0 ? 7 : a.day_of_week;
                    const dayB = b.day_of_week === 0 ? 7 : b.day_of_week;
                    return dayA - dayB;
                }
                return a.start_time.localeCompare(b.start_time);
            });
            setAvailabilities(sortedAvailabilities);
        } catch (err) {
            console.error("Error fetching availabilities:", err);
            setErrorAvailabilities(
                err.response?.data?.message || "Gagal memuat jadwal."
            );
        } finally {
            setLoadingAvailabilities(false);
        }
    };

    // Panggil fetchAvailabilities saat komponen mount atau userId berubah
    // Atau panggil saat tab jadwal di klik agar tidak selalu load
    useEffect(() => {
        // Fetch jadwal hanya jika tab jadwal aktif dan belum pernah load/error
        if (
            activeTab === "jadwal" &&
            availabilities.length === 0 &&
            !errorAvailabilities
        ) {
            fetchAvailabilities();
        }
    }, [userId, activeTab, availabilities.length, errorAvailabilities]); // Tambahkan dependencies

    // Handler untuk menambah jadwal baru ke state
    const handleAvailabilityAdded = (newAvailability) => {
        setAvailabilities((prev) =>
            [...prev, newAvailability].sort((a, b) => {
                if (a.day_of_week !== b.day_of_week) {
                    // Urutkan Minggu (0) di akhir
                    const dayA = a.day_of_week === 0 ? 7 : a.day_of_week;
                    const dayB = b.day_of_week === 0 ? 7 : b.day_of_week;
                    return dayA - dayB;
                }
                return a.start_time.localeCompare(b.start_time);
            })
        );
        // Optional: Tampilkan notifikasi sukses
        // alert('Jadwal baru berhasil ditambahkan.');
    };

    // Handler untuk menghapus jadwal
    const handleDeleteAvailability = async (availabilityId) => {
        // Ganti alert dengan konfirmasi yang lebih baik (misal: modal)
        if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
            return;
        }
        try {
            // Optional: Set loading state untuk item spesifik jika perlu
            await apiClient.delete(
                `/api/super-admin/konselor-management/${userId}/availabilities/${availabilityId}`
            );
            setAvailabilities((prev) =>
                prev.filter((av) => av.id !== availabilityId)
            );
            // Ganti alert dengan notifikasi toast/snackbar
            alert("Jadwal berhasil dihapus.");
        } catch (err) {
            console.error("Error deleting availability:", err);
            // Ganti alert dengan notifikasi toast/snackbar
            alert(err.response?.data?.message || "Gagal menghapus jadwal.");
        }
    };

    // --- PERBAIKAN: Hapus AdminLayout dari return loading/error/not found ---
    if (loading) return <div className="p-6">Memuat detail konselor...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!konselor) return <div className="p-6">Konselor tidak ditemukan.</div>;
    // --- AKHIR PERBAIKAN ---

    // Format rating
    const ratingDisplay = konselor.rating
        ? Number(konselor.rating).toFixed(1)
        : "N/A";

    // Helper render spesialisasi
    const renderSpecializations = (specializations) => {
        if (
            !specializations ||
            !Array.isArray(specializations) ||
            specializations.length === 0
        ) {
            return "-";
        }
        return specializations.map((spec, index) => (
            <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mr-2 mb-2 inline-block" // Tambah margin
            >
                {spec}
            </span>
        ));
    };

    return (
        // --- PERBAIKAN: Hapus <AdminLayout> dari sini ---
        <div className="p-6 bg-gray-50 min-h-screen">
            {" "}
            {/* Ganti bg jika perlu */}
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    {" "}
                    {/* Groupkan back & title */}
                    <button
                        onClick={() => navigate(-1)} // Gunakan navigate(-1) untuk kembali
                        className="text-gray-700 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
                        aria-label="Kembali"
                    >
                        <BackIcon />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Profile Konselor
                    </h1>{" "}
                    {/* Sesuaikan title */}
                </div>
                <div>
                    {/* Tombol Edit mungkin perlu link ke halaman edit */}
                    <Link
                        // TODO: Buat halaman edit terpisah atau modal edit
                        to={`/super-admin/konselor-management/${userId}/edit`} // Contoh path edit
                        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors duration-150"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
            {/* Konten Detail dalam Card */}
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Bagian Atas: Avatar, Nama, Rating */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                    {" "}
                    {/* Tambah border */}
                    <img
                        src={
                            konselor.avatar_url || // Gunakan avatar_url dari accessor
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                konselor.name || "K" // Fallback jika nama kosong
                            )}&background=EBF4FF&color=3B82F6&size=128&bold=true`
                        }
                        alt={`Avatar ${konselor.name}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm" // Style avatar
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                konselor.name || "K"
                            )}&background=EBF4FF&color=3B82F6&size=128&bold=true`;
                        }}
                    />
                    <div className="text-center md:text-left flex-grow">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {konselor.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {konselor.email}
                        </p>
                        {/* Status Badge */}
                        <div className="mt-2">
                            <StatusBadge status={konselor.status} />
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xl mt-4 md:mt-0 md:ml-auto flex-shrink-0">
                        {" "}
                        {/* Style Rating */}
                        <StarIcon />
                        <span className="font-bold text-gray-700">
                            {ratingDisplay}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">
                            {/* TODO: Tambahkan jumlah review jika ada */}
                            {/* ({konselor.review_count || 0} ulasan) */}
                        </span>
                    </div>
                </div>

                {/* Tabs Navigasi */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab("detail")}
                            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm focus:outline-none transition-colors duration-150 ${
                                activeTab === "detail"
                                    ? "border-cyan-500 text-cyan-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            Detail Informasi
                        </button>
                        <button
                            onClick={() => setActiveTab("jadwal")}
                            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm focus:outline-none transition-colors duration-150 ${
                                activeTab === "jadwal"
                                    ? "border-cyan-500 text-cyan-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            Jadwal Ketersediaan
                        </button>
                        {/* Tambahkan tab lain jika perlu, misal: Riwayat Booking */}
                    </nav>
                </div>

                {/* Konten Tab */}
                {activeTab === "detail" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <h3 className="md:col-span-2 text-lg font-semibold border-b pb-2 mb-2 text-gray-700">
                            Informasi Konselor
                        </h3>
                        <DetailField
                            label="Nama Lengkap"
                            value={konselor.name}
                        />
                        <DetailField
                            label="Universitas Asal"
                            value={konselor.universitas}
                        />
                        <DetailField label="Email" value={konselor.email} />
                        <DetailField
                            label="Nomor Telepon"
                            value={konselor.phone}
                        />
                        <DetailField label="Kota" value={konselor.city} />
                        {/* Tambahkan field lain jika perlu */}
                        <DetailField
                            label="Provinsi"
                            value={konselor.province}
                        />
                        {/* <DetailField label="Kecamatan" value={konselor.district} /> */}
                        {/* <DetailField label="Kode Pos" value={konselor.postal_code} /> */}

                        <div className="md:col-span-2">
                            <DetailField
                                label="Alamat Lengkap"
                                value={konselor.street_address}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <DetailField
                                label="Nomor Surat Izin Praktik" // Ubah label
                                value={konselor.surat_izin_praktik}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-500 block mb-1">
                                {" "}
                                {/* Jadikan block */}
                                Spesialis Konseling
                            </label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {" "}
                                {/* Hapus mt-2 */}
                                {renderSpecializations(konselor.spesialisasi)}
                            </div>
                        </div>
                        {/* Tambahkan tombol aksi block/unblock di sini jika diinginkan */}
                        <div className="md:col-span-2 mt-4 border-t pt-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Aksi Akun
                            </h3>
                            {/* Logika tombol block/unblock perlu state & handler */}
                            {konselor.status !== "Banned" ? (
                                <button
                                    // onClick={handleBlock} // TODO: Implementasi handler
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-150 mr-3"
                                >
                                    Block Akun
                                </button>
                            ) : (
                                <button
                                    // onClick={handleUnblock} // TODO: Implementasi handler
                                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-150 mr-3"
                                >
                                    Unblock Akun
                                </button>
                            )}
                            {/* Tombol Hapus (hati-hati!) */}
                            {/* <button onClick={handleDelete} className="...">Hapus Akun</button> */}
                        </div>
                    </div>
                )}

                {activeTab === "jadwal" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">
                            Jadwal Ketersediaan
                        </h2>

                        {loadingAvailabilities && (
                            <p className="text-sm text-gray-500 italic">
                                Memuat jadwal...
                            </p>
                        )}
                        {errorAvailabilities && (
                            <p className="text-sm text-red-500">
                                {errorAvailabilities}
                            </p>
                        )}

                        {!loadingAvailabilities &&
                            availabilities.length === 0 && (
                                <p className="text-sm text-gray-500 italic mb-4">
                                    Belum ada jadwal ketersediaan yang
                                    ditambahkan.
                                </p>
                            )}

                        {!loadingAvailabilities &&
                            availabilities.length > 0 && (
                                <div className="overflow-x-auto mb-6 border border-gray-200 rounded-lg shadow-sm">
                                    {" "}
                                    {/* Styling tabel */}
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Hari
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Jam Mulai
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Jam Selesai
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="relative px-6 py-3"
                                                >
                                                    <span className="sr-only">
                                                        Aksi
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {availabilities.map((av) => (
                                                <tr
                                                    key={av.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    {" "}
                                                    {/* Efek hover */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {formatDayOfWeek(
                                                            av.day_of_week
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {formatTime(
                                                            av.start_time
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {formatTime(
                                                            av.end_time
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteAvailability(
                                                                    av.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-800 transition-colors duration-150 focus:outline-none"
                                                            aria-label={`Hapus jadwal ${formatDayOfWeek(
                                                                av.day_of_week
                                                            )} ${formatTime(
                                                                av.start_time
                                                            )}`}
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        {/* Form Tambah Jadwal */}
                        <AddAvailabilityForm
                            counselorId={userId}
                            onAvailabilityAdded={handleAvailabilityAdded}
                        />
                    </div>
                )}
            </div>
        </div>
        // --- PERBAIKAN: Hapus </AdminLayout> dari sini ---
    );
};

export default KonselorDetailPage;
