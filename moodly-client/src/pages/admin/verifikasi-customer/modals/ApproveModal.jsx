import React from "react";
// Mirip ApproveModal konselor, ganti teks
const ApproveModal = ({ isOpen, onClose, onConfirm, customerName }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {" "}
            <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
                {" "}
                {/* Icon */}{" "}
                <h2 className="text-xl font-bold mb-4">Setujui Verifikasi?</h2>{" "}
                <p className="text-gray-600 mb-6">
                    {" "}
                    Yakin menyetujui customer{" "}
                    <span className="font-semibold">"{customerName}"</span>?
                    Status akan diubah menjadi 'Terverifikasi'.{" "}
                </p>{" "}
                <div className="flex justify-center gap-4">
                    {" "}
                    <button onClick={onClose}>Batal</button>{" "}
                    <button onClick={onConfirm}>Setujui</button>{" "}
                </div>{" "}
            </div>{" "}
        </div>
    );
};
export default ApproveModal;
