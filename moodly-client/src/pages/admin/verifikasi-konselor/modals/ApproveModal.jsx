import React from "react";

const ApproveModal = ({ isOpen, onClose, onConfirm, konselorName }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
                {/* Icon Centang */}
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                        className="text-green-500"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-4">Setujui Verifikasi?</h2>
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin menyetujui verifikasi untuk konselor{" "}
                    <span className="font-semibold">"{konselorName}"</span>?
                    Status akan diubah menjadi 'Terverifikasi'.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 rounded-lg"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Setujui
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ApproveModal;
