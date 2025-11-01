import React, { useState } from "react";

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M10.584 10.587A3 3 0 0112 9c1.657 0 3 1.343 3 3a3 3 0 01-.587 1.416M9.88 9.879L5.122 5.122M2.458 12C3.732 7.943 7.522 5 12 5c1.662 0 3.218.43 4.573 1.175M17.94 17.94C16.677 18.574 14.908 19 12 19c-4.478 0-8.268-2.943-9.542-7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.5 12C3.12 7.943 7.522 5 12 5s8.88 2.943 10.5 7c-1.62 4.057-6.022 7-10.5 7S3.12 16.057 1.5 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggle = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Kata sandi berhasil diubah!");
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>
      <div className="flex justify-center min-h-screen bg-white font-['Poppins']">
        <div className="w-full max-w-md flex flex-col min-h-screen bg-white relative overflow-hidden">
          {/* Latar gradasi di atas */}
          <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-[#00D1FF] to-white" />

          {/* Header */}
          <header className="relative z-10 flex items-center gap-3 px-4 pt-10">
            <button
              onClick={() => alert("Fungsi kembali tidak dapat digunakan dalam pratinjau ini.")}
              aria-label="Kembali"
            >
              <BackArrowIcon />
            </button>
            <h1 className="text-lg font-bold text-black">Ubah Kata Sandi</h1>
          </header>

          {/* Konten putih full tinggi */}
          <div className="relative z-20 bg-white mt-8 rounded-t-[2.5rem] flex-1 flex flex-col justify-between p-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6 mt-4 flex-1">
              {/* Kata sandi lama */}
              <div>
                <label className="text-sm text-gray-800 font-bold tracking-wide">
                  Masukkan kata sandi lama
                </label>
                <div className="relative mt-2">
                  <input
                    type={show.old ? "text" : "password"}
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggle("old")}
                    className="absolute right-4 top-3 text-gray-600"
                  >
                    <EyeIcon open={show.old} />
                  </button>
                </div>
              </div>

              {/* Kata sandi baru */}
              <div>
                <label className="text-sm text-gray-800 font-bold tracking-wide">
                  Masukkan kata sandi baru
                </label>
                <div className="relative mt-2">
                  <input
                    type={show.new ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggle("new")}
                    className="absolute right-4 top-3 text-gray-600"
                  >
                    <EyeIcon open={show.new} />
                  </button>
                </div>
                <p className="text-xs text-red-500 mt-1">
                  Minimal 12 karakter, kombinasi huruf besar dan angka
                </p>
              </div>

              {/* Konfirmasi ulang */}
              <div>
                <label className="text-sm text-gray-800 font-bold tracking-wide">
                  Masukkan ulang kata sandi
                </label>
                <div className="relative mt-2">
                  <input
                    type={show.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggle("confirm")}
                    className="absolute right-4 top-3 text-gray-600"
                  >
                    <EyeIcon open={show.confirm} />
                  </button>
                </div>
              </div>
            </form>

            {/* Tombol simpan di bawah */}
            <div className="mt-8 mb-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-black text-white py-3 rounded-full text-base font-semibold active:scale-95 transition-transform"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

