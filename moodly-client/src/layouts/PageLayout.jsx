import React from "react";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    // Ini adalah wrapper utama seukuran HP
    // 'Outlet' akan merender DetailRiwayatPage, GantiJadwalPage, dll.
    <div className="max-w-md mx-auto min-h-screen shadow-lg">
      <Outlet />
    </div>
  );
}