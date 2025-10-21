import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";

// 1. Buat Context
const AuthContext = createContext({});

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Mulai dengan loading = true

    // --- PERBAIKAN 1: getUser HANYA mengambil data ---
    const getUser = async () => {
        const { data } = await apiClient.get("/api/user");
        setUser(data);
    };

    // --- PERBAIKAN 2: useEffect MENANGANI loading ---
    // Ini adalah perbaikan KUNCI untuk masalah "kembali ke homepage".
    useEffect(() => {
        const fetchInitialUser = async () => {
            try {
                await getUser();
            } catch (e) {
                console.log("No user logged in on initial load.");
            } finally {
                // setLoading(false) HANYA dipanggil SETELAH
                // getUser (baik sukses atau gagal) selesai.
                setLoading(false);
            }
        };
        fetchInitialUser();
    }, []); // <-- Dependensi kosong sudah benar

    // --- PERBAIKAN 3: Logika login/register/logout yang benar ---
    const login = async (data) => {
        try {
            await apiClient.get("/sanctum/csrf-cookie");
            await apiClient.post("/login", data);
            await getUser(); // Ambil user baru setelah login
        } catch (e) {
            if (e.response && e.response.status === 422) {
                throw e.response.data.errors;
            }
            throw e;
        }
    };

    // --- INI ADALAH PERBAIKAN TYPO ---
    const register = async (data) => {
        const { address, ...finalData } = data;
        try {
            await apiClient.get("/sanctum/csrf-cookie");
            await apiClient.post("/register", finalData);
            await getUser(); // Ambil user baru setelah register
        } catch (e) { // <-- Kurung kurawal { } sudah ditambahkan
            if (e.response && e.response.status === 422) {
                throw e.response.data.errors;
            }
            throw e;
        }
    };

    const logout = async () => {
        await apiClient.post("/logout");
        setUser(null); // Langsung set user ke null
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, getUser, login, register, logout }}
        >
            {/* Di file AppRouter.jsx Anda sudah ada 'if (loading) return ...',
              jadi 'children' di sini bisa langsung dirender.
            */}
            {children}
        </AuthContext.Provider>
    );
};

// 3. Buat Custom Hook
export function useAuth() {
    return useContext(AuthContext);
}