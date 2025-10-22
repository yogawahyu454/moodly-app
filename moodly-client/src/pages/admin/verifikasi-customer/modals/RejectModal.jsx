import React, { useState } from "react";
// Mirip RejectModal konselor, tambahkan input alasan jika perlu
const RejectModal = ({ isOpen, onClose, onConfirm, customerName }) => {
    const [reason, setReason] = useState(""); // State untuk alasan
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {" "}
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
                {" "}
                {/* Icon */}{" "}
                <h2 className="text-xl font-bold mb-4">Tolak Verifikasi?</h2>{" "}
                <p className="text-gray-600 mb-6">
                    {" "}
                    Yakin menolak customer{" "}
                    <span className="font-semibold">"{customerName}"</span>?
                    Status akan diubah menjadi 'Ditolak'.{" "}
                </p>{" "}
                <textarea
                    placeholder="Alasan penolakan (wajib jika menolak)"
                    className="w-full border rounded p-2 mb-4"
                    rows="3"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                ></textarea>{" "}
                <div className="flex justify-center gap-4">
                    {" "}
                    <button onClick={onClose}>Batal</button>{" "}
                    <button
                        onClick={() => onConfirm(reason)}
                        disabled={!reason}
                        className={`px-6 py-2 bg-red-500 text-white rounded-lg ${
                            !reason ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Tolak
                    </button>{" "}
                </div>{" "}
            </div>{" "}
        </div>
    );
};
export default RejectModal;
