import React from "react";

// --- Komponen Ikon yang Disesuaikan dengan Desain Baru ---
const BalanceIcon = () => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        <path
            d="M2 20V11C2 9.34315 3.34315 8 5 8H19C20.6569 8 22 9.34315 22 11V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 2C9.23858 2 7 4.23858 7 7V8H17V7C17 4.23858 14.7614 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const TransferIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        <rect
            width="18"
            height="18"
            rx="2"
            transform="matrix(1 0 0 -1 3 21)"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M8 14L11 11L14 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 11V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 10L13 7L10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13 13V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
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
        className="text-cyan-500"
    >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
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
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
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
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
);

// --- Komponen Pembantu ---
const SectionHeader = ({ title }) => (
    <div className="flex justify-between items-center pt-6 px-4">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <a href="#" className="text-sm font-semibold text-cyan-500">
            Lihat Semua
        </a>
    </div>
);
const ServiceCard = ({ icon, title, highlighted = false }) => (
    <div
        className={`bg-white p-3 rounded-2xl border-2 ${
            highlighted ? "border-cyan-400" : "border-gray-200"
        } shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center`}
    >
        <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
        <p className="font-semibold text-gray-700 mt-2 text-sm leading-tight">
            {title}
        </p>
        <button className="mt-4 flex items-center gap-1.5 text-xs font-bold text-gray-800">
            <span>Book</span> <ArrowRightIcon />
        </button>
    </div>
);
const CounselorCard = ({ image, name, university, rating, specialty }) => (
    <div className="relative flex-shrink-0 w-[280px] md:w-full bg-white border-2 border-gray-200 rounded-2xl shadow-sm p-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div className="flex gap-4">
            <img
                src={image}
                alt={name}
                className="w-24 h-32 rounded-xl object-cover"
            />
            <div className="space-y-1.5 flex flex-col">
                <h4 className="font-bold text-base text-gray-800 leading-tight">
                    {name}
                </h4>
                <div className="flex items-center gap-1.5">
                    <BuildingIcon />
                    <p className="text-xs text-gray-500">{university}</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <ThumbsUpIcon />
                    <p className="text-xs text-gray-500">{rating}</p>
                </div>
                <p className="text-xs text-gray-500 pt-1">{specialty}</p>
            </div>
        </div>
    </div>
);

// --- Komponen Halaman Beranda ---
export default function BerandaPage() {
    return (
        <main className="space-y-4 bg-white pb-6">
            {/* Promo Banner */}
            <div className="px-4 mt-4">
                <div className="bg-cyan-400 rounded-2xl text-white relative overflow-hidden h-40">
                    {/* Image is positioned absolutely to the left */}
                    <div className="absolute -left-4 -bottom-2 h-44 w-auto z-0">
                        <img
                            src="images/beranda/dokter1.png"
                            alt="Dokter"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    {/* Text and button are positioned absolutely, with adjusted sizes */}
                    <div className="absolute left-[35%] top-1/2 -translate-y-1/2 w-3/5 z-10">
                        <h2 className="font-bold text-lg leading-tight">
                            Tumpahkan isi hatimu,{" "}
                            <span className="font-extrabold">MOODLY</span>
                            <br />
                            temukan solusi dari masalahmu.
                        </h2>
                        <button className="mt-3 bg-white text-cyan-500 font-bold py-2 px-6 rounded-full text-sm shadow-md transform transition-transform duration-300 hover:scale-105 active:scale-95">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Balance Card */}
            <div className="px-4">
                <div className="bg-cyan-500 rounded-2xl p-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <BalanceIcon />
                        <p className="text-2xl font-bold">Rp 300.000</p>
                    </div>
                    <TransferIcon />
                </div>
            </div>

            {/* Services Sections */}
            <div>
                <SectionHeader title="Online" />
                <div className="grid grid-cols-2 gap-4 mt-2 px-4">
                    <ServiceCard
                        title="Konseling Pernikahan"
                        icon={
                            <img
                                src="images/beranda/pernikahan1.png"
                                alt="Marriage Counseling"
                                className="w-16 h-16"
                            />
                        }
                    />
                    <ServiceCard
                        title="Konseling Individu"
                        icon={
                            <img
                                src="images/beranda/individu1.png"
                                alt="Individual Counseling"
                                className="w-16 h-16"
                            />
                        }
                    />
                </div>
            </div>

            <div>
                <SectionHeader title="Tatap Muka" />
                <div className="grid grid-cols-2 gap-4 mt-2 px-4">
                    <ServiceCard
                        title="Konseling Pernikahan"
                        icon={
                            <img
                                src="images/beranda/pernikahan1.png"
                                alt="Marriage Counseling"
                                className="w-16 h-16"
                            />
                        }
                    />
                    <ServiceCard
                        title="Konseling Individu"
                        icon={
                            <img
                                src="images/beranda/individu1.png"
                                alt="Specialist Counseling"
                                className="w-16 h-16"
                            />
                        }
                        highlighted={true}
                    />
                </div>
            </div>

            {/* Counselor Section */}
            <div>
                <SectionHeader title="Konselor" />
                <div className="flex space-x-4 overflow-x-auto mt-2 pb-4 scrollbar-hide px-4">
                    <CounselorCard
                        name="Vina Amalia, M.Psi., Psikolog"
                        university="Universitas Padjadjaran"
                        rating="99% Terbantu"
                        specialty="Spesialisasi : Konseling anak"
                        image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    <CounselorCard
                        name="Budi Santoso, M.Psi., Psikolog"
                        university="Universitas Gadjah Mada"
                        rating="98% Terbantu"
                        specialty="Spesialisasi : Konseling remaja"
                        image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    <CounselorCard
                        name="Citra Lestari, M.Psi., Psikolog"
                        university="Universitas Indonesia"
                        rating="99% Terbantu"
                        specialty="Spesialisasi : Depresi"
                        image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                </div>
            </div>
        </main>
    );
}
