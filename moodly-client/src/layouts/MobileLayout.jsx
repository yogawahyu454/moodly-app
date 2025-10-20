import React from "react";
import { Outlet } from "react-router-dom";

// Komponen helper untuk menambahkan style CSS agar scrollbar hilang
const HideScrollbarStyle = () => (
    <style>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const MobileLayout = () => {
    return (
        <>
            <HideScrollbarStyle />
            {/* Wadah Luar: 
        - Defaultnya putih untuk mobile view.
        - Di desktop (md), berubah jadi abu-abu muda dan menjadi flex container.
        - 'justify-center' akan menengahkan "ponsel" secara horizontal.
      */}
            <div className="min-h-screen bg-white md:bg-slate-100 md:flex md:justify-center">
                {/* "Ponsel": 
          - Di mobile, memenuhi layar (min-h-screen).
          - Di desktop, tingginya juga memenuhi layar (md:h-screen) dan lebarnya dibatasi (md:max-w-md).
          - Bayangan (shadow) diaktifkan di desktop untuk memberikan efek 'elevasi'.
          - Sudut melengkung dihilangkan di desktop karena sudah penuh layarnya.
        */}
                <div className="w-full flex flex-col bg-white min-h-screen md:h-screen md:max-w-md md:shadow-2xl">
                    {/* Konten yang bisa di-scroll:
            - 'flex-grow' membuatnya mengambil sisa ruang vertikal.
            - 'overflow-y-auto' memungkinkan scroll.
            - 'no-scrollbar' adalah kelas custom kita untuk menghilangkan scrollbar visual.
          */}
                    <div className="flex-grow overflow-y-auto no-scrollbar">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileLayout;
