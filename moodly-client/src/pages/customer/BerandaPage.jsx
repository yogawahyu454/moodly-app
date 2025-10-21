import React from "react";

// --- Komponen Ikon yang Hanya Digunakan di Halaman Ini ---
const WalletIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
    >
        {" "}
        <path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>{" "}
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path>{" "}
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h2v-4h-2z"></path>{" "}
    </svg>
);
const TransactionIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
    >
        {" "}
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>{" "}
        <line x1="12" y1="3" x2="12" y2="21"></line>{" "}
        <line x1="3" y1="12" x2="21" y2="12"></line>{" "}
    </svg>
);
const ArrowRightIcon = () => (
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
    >
        {" "}
        <line x1="5" y1="12" x2="19" y2="12"></line>{" "}
        <polyline points="12 5 19 12 12 19"></polyline>{" "}
    </svg>
);
const BuildingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
    >
        {" "}
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>{" "}
        <line x1="3" y1="9" x2="21" y2="9"></line>{" "}
        <line x1="9" y1="21" x2="9" y2="9"></line>{" "}
    </svg>
);
const ThumbsUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
    >
        {" "}
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>{" "}
    </svg>
);

// --- Komponen Pembantu ---
const SectionHeader = ({ title }) => (
    <div className="flex justify-between items-center pt-6">
        {" "}
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>{" "}
        <a href="#" className="text-sm font-semibold text-blue-500">
            Lihat Semua
        </a>{" "}
    </div>
);
const ServiceCard = ({ icon, title }) => (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        {" "}
        <img src={icon} alt="" className="w-12 h-12" />{" "}
        <p className="font-semibold text-gray-700 mt-2 text-sm">{title}</p>{" "}
        <button className="mt-3 flex items-center gap-1 text-sm font-bold text-gray-800">
            {" "}
            <span>Book</span> <ArrowRightIcon />{" "}
        </button>{" "}
    </div>
);
const CounselorCard = ({ image, name, university, rating, specialty }) => (
    <div className="relative flex-shrink-0 w-3/4 md:w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-3 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        {" "}
        <div className="flex gap-3">
            {" "}
            <img
                src={image}
                alt={name}
                className="w-20 h-28 rounded-xl object-cover"
            />{" "}
            <div className="space-y-1">
                {" "}
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>{" "}
                <div className="flex items-center gap-1.5">
                    {" "}
                    <BuildingIcon />{" "}
                    <p className="text-xs text-gray-500">{university}</p>{" "}
                </div>{" "}
                <div className="flex items-center gap-1.5">
                    {" "}
                    <ThumbsUpIcon />{" "}
                    <p className="text-xs text-gray-500">{rating}</p>{" "}
                </div>{" "}
                <p className="text-xs text-gray-500 pt-1">{specialty}</p>{" "}
            </div>{" "}
        </div>{" "}
    </div>
);

// --- Komponen Halaman Beranda ---
export default function BerandaPage() {
    return (
        <main className="px-4 space-y-6 bg-gray-50">
            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl p-4 text-white flex items-center relative overflow-hidden mt-4">
                <div className="w-2/3">
                    <h2 className="font-bold text-lg leading-tight">
                        {" "}
                        Tumpahkan isi hatimu,{" "}
                        <span className="font-extrabold">MOODLY</span> temukan
                        solusi dari masalahmu.{" "}
                    </h2>
                    <button className="mt-4 bg-white text-blue-500 font-bold py-2 px-6 rounded-full text-sm">
                        {" "}
                        Book Now{" "}
                    </button>
                </div>
                <div className="w-1/3 h-full absolute right-0 bottom-0">
                    <img
                        src="https://placehold.co/120x160/FFFFFF/4A5568?text=Dr"
                        alt="Doctor"
                        className="absolute bottom-0 right-0 h-40 w-auto object-cover"
                    />
                </div>
            </div>

            {/* Balance Card */}
            <div className="bg-blue-500 rounded-2xl p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                    {" "}
                    <WalletIcon />{" "}
                    <p className="text-2xl font-bold">Rp 300.000</p>{" "}
                </div>
                <TransactionIcon />
            </div>

            {/* Services Section */}
            <div>
                <SectionHeader title="Online" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    <ServiceCard
                        title="Konseling Pernikahan"
                        icon="https://placehold.co/64x64/E0F2FE/0EA5E9?text=💑"
                    />
                    <ServiceCard
                        title="Konseling Individu"
                        icon="https://placehold.co/64x64/E0F2FE/0EA5E9?text=👤"
                    />
                </div>
            </div>

            <div>
                <SectionHeader title="Tatap Muka" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    <ServiceCard
                        title="Konseling Pernikahan"
                        icon="https://placehold.co/64x64/E0F2FE/0EA5E9?text=💑"
                    />
                    <ServiceCard
                        title="Konseling Individu"
                        icon="https://placehold.co/64x64/E0F2FE/0EA5E9?text=👤"
                    />
                </div>
            </div>

            {/* Counselor Section */}
            <div>
                <SectionHeader title="Konselor" />
                <div className="flex space-x-4 overflow-x-auto mt-2 pb-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-x-0 md:overflow-x-visible">
                    <CounselorCard
                        name="Vina Amalia, M.Psi., Psikolog"
                        university="Universitas Padjadjaran"
                        rating="99% Terbantu"
                        specialty="Spesialisasi : Konseling anak"
                        image="https://placehold.co/100x120/E2E8F0/4A5568?text=Vina"
                    />
                    <CounselorCard
                        name="Budi Santoso, M.Psi., Psikolog"
                        university="Universitas Gadjah Mada"
                        rating="98% Terbantu"
                        specialty="Spesialisasi : Konseling remaja"
                        image="https://placehold.co/100x120/E2E8F0/4A5568?text=Budi"
                    />
                    <CounselorCard
                        name="Citra Lestari, M.Psi., Psikolog"
                        university="Universitas Indonesia"
                        rating="99% Terbantu"
                        specialty="Spesialisasi : Depresi"
                        image="https://placehold.co/100x120/E2E8F0/4A5568?text=Citra"
                    />
                </div>
            </div>
        </main>
    );
}
