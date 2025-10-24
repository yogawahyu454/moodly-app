import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Ikon Kalender
function CalendarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

// Ikon Jam
function ClockIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

// Tombol Tab (Segmen Tab)
const TabButton = ({ title, isActive, onClick, isFirst = false, isLast = false }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-1.5 px-2 text-xs font-semibold text-center transition-colors duration-200 focus:outline-none whitespace-nowrap
      ${isActive ? "bg-sky-500 text-white" : "bg-white text-gray-700 hover:bg-sky-50"}
      ${!isLast ? "border-r border-sky-200" : ""}
      ${isFirst ? "rounded-l-lg" : ""}
      ${isLast ? "rounded-r-lg" : ""}
    `}
  >
    {title}
  </button>
);

// --- DATA CONTOH ---
const mockUpcoming = [
  {
    id: 1,
    name: "Vina Amalia, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=1",
    specialization: "Konseling anak",
    date: "12 - 09 - 2025",
    time: "16.00 - 17.00",
    type: "Video Call",
  },
];
const mockCanceled = [
  {
    id: 3,
    name: "Dimas Arifin, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=3",
    specialization: "Konseling kecemasan",
    date: "11 - 09 - 2025",
    time: "15.00 - 16.00",
    type: "Video Call",
  },
];
const mockUnpaid = [
  {
    id: 4,
    name: "Vina Amalia, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=1",
    specialization: "Konseling anak",
    date: "10 - 09 - 2025",
    time: "15.00 - 16.00",
    type: "Chat",
  },
];
const mockCompleted = [
  {
    id: 5,
    name: "Raka Ridjo, M.Psi., Psikolog",
    avatar: "https://i.pravatar.cc/100?img=2",
    specialization: "Stres kerja dan burnout",
    date: "09 - 09 - 2025",
    time: "10.00 - 11.00",
    type: "Chat",
  },
];
// --- END OF DATA CONTOH ---

const AppointmentCard = ({ item, status }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-lg mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">Spesialisasi: {item.specialization}</p>
          <h3 className="font-semibold text-gray-900 text-xs">{item.name}</h3>
        </div>
        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover ml-2" />
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-1.5">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-600">{item.date}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ClockIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-600">{item.time}</span>
        </div>
        <span className="text-xs font-semibold text-sky-500">{item.type}</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-end items-center space-x-2">
        {status === "upcoming" && (
          <>
            <Link
              to={`/history/cancel/${item.id}`}
              className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 text-center"
            >
              Batalkan
            </Link>
            <button className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
              Mulai
            </button>
          </>
        )}

        {status === "canceled" && (
          <>
            <span className="text-xs font-semibold text-red-500 mr-auto">Telah Dibatalkan</span>
            <Link
              to={`/history/cancel-detail/${item.id}`}
              className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
            >
                Detail
            </Link>
            </>
          )}

          {/* ====================================================== */}
          {/* --- PERBAIKAN ALUR SESUAI PERMINTAAN ANDA --- */}
          {/* ====================================================== */}
          {status === "unpaid" && (
            <>
              <span className="text-xs font-semibold text-orange-500 mr-auto">Menunggu Pembayaran</span>
              
              {/* PERBAIKAN 1: Tombol ini ke Halaman Detail */}
              <Link
                to={`/history/${item.id}`}
                className="px-3 py-1.5 rounded-md border border-blue-600 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 text-center"
              >
                Lihat Detail
              </Link>
              
              {/* PERBAIKAN 2: Tombol ini JUGA ke Halaman Detail */}
          <Link
            to={`/history/${item.id}`}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
          >
            Bayar Sekarang
          </Link>
        </>
      )}

          {status === "completed" && (
            <>
              <Link
                to={`/history/rate/${item.id}`}
            className="px-3 py-1.5 rounded-md border border-blue-600 bg-white text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
          >
            Beri Nilai
          </Link>
          <Link
            to={`/session/chat/${item.id}`}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 text-center"
          >
            Riwayat Chat
          </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default function RiwayatPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();

  const [upcomingData, setUpcomingData] = useState([]);
  const [canceledData, setCanceledData] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  useEffect(() => {
    setUpcomingData(mockUpcoming);
    setCanceledData(mockCanceled);
    setUnpaidData(mockUnpaid);
    setCompletedData(mockCompleted);
  }, []);

  const renderContent = () => {
    let data;
    switch (activeTab) {
      case "upcoming":
        data = upcomingData;
        break;
      case "canceled":
        data = canceledData;
        break;
      case "unpaid":
        data = unpaidData;
        break;
      case "completed":
        data = completedData;
        break;
      default:
        data = [];
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Tidak ada riwayat untuk ditampilkan.</p>
        </div>
      );
    }

    return data.map((item) => <AppointmentCard key={item.id} item={item} status={activeTab} />);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-center text-gray-800 flex-grow">Riwayat</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex w-full mb-4 rounded-lg border border-sky-300 overflow-hidden shadow-sm">
        <TabButton title="Akan Datang" isActive={activeTab === "upcoming"} onClick={() => setActiveTab("upcoming")} isFirst={true} />
        <TabButton title="Dibatalkan" isActive={activeTab === "canceled"} onClick={() => setActiveTab("canceled")} />
        <TabButton title="Belum Dibayar" isActive={activeTab === "unpaid"} onClick={() => setActiveTab("unpaid")} />
        <TabButton title="Selesai" isActive={activeTab === "completed"} onClick={() => setActiveTab("completed")} isLast={true} />
      </div>

      <div>{renderContent()}</div>
    </div>
  );
}
