import React from "react"; // Hapus useState karena reason diambil dari parent

const RejectModal = ({
    isOpen,
    onClose,
    onConfirm,
    konselorName,
    setReason,
    reason,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center shadow-xl">
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
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Tolak Verifikasi?
                </h2>
                <p className="text-gray-600 mb-6">
                    Yakin menolak verifikasi konselor{" "}
                    <span className="font-semibold text-gray-900">
                        "{konselorName}"
                    </span>
                    ? Status akan diubah menjadi 'Ditolak'.
                </p>
                {/* Input Alasan Penolakan */}
                <textarea
                    placeholder="Alasan penolakan (wajib diisi)"
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    onChange={(e) => setReason(e.target.value)} // Gunakan setter dari props
                    value={reason} // Gunakan value dari props
                ></textarea>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => onConfirm(reason)} // Kirim reason saat konfirmasi
                        disabled={!reason} // Disable jika reason kosong
                        className={`px-6 py-2 bg-red-500 text-white rounded-lg transition-colors duration-200 ${
                            !reason
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-red-600"
                        }`}
                    >
                        Tolak
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RejectModal;
