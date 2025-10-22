import React from "react"; // Tambahkan useState jika perlu input alasan

const RejectModal = ({ isOpen, onClose, onConfirm, konselorName }) => {
    // const [reason, setReason] = useState(''); // Jika perlu input alasan
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
                {/* Icon Silang */}
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
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
                        className="text-red-500"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-4">Tolak Verifikasi?</h2>
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin menolak verifikasi untuk konselor{" "}
                    <span className="font-semibold">"{konselorName}"</span>?
                    Status akan diubah menjadi 'Ditolak'.
                </p>
                {/* Opsional: Input Alasan Penolakan */}
                {/* <textarea placeholder="Alasan penolakan (opsional)" className="w-full border rounded p-2 mb-4" rows="3" onChange={(e) => setReason(e.target.value)}></textarea> */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 rounded-lg"
                    >
                        Batal
                    </button>
                    {/* Kirim reason jika ada: onClick={() => onConfirm(reason)} */}
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Tolak
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RejectModal;
