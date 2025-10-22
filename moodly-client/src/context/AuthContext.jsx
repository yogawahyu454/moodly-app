import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";

// 1. Buat Context itu sendiri
const AuthContext = createContext({});

// 2. Buat Provider Component (dengan 'export')
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            // Panggil /api/user untuk memeriksa sesi yang ada
            const { data } = await apiClient.get("/api/user");
            setUser(data);
        } catch (e) {
            // Abaikan error 401, berarti user belum login
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Panggil getUser hanya sekali saat aplikasi dimuat
        getUser();
    }, []);

    const login = async (credentials) => {
        try {
            await apiClient.get("/sanctum/csrf-cookie");
            // PERBAIKAN: Pastikan endpoint menggunakan /api/login
            await apiClient.post("/api/login", credentials);
            // Solusi paling andal: Paksa reload halaman untuk sinkronisasi sesi
            window.location.reload();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                throw e.response.data.errors;
            } else {
                // Lempar error umum jika bukan 422
                throw new Error(
                    e.response?.data?.message ||
                        "Login gagal, silakan coba lagi."
                );
            }
        }
    };

    const register = async (data) => {
        try {
            await apiClient.get("/sanctum/csrf-cookie");
            // PERBAIKAN: Pastikan endpoint menggunakan /api/register
            await apiClient.post("/api/register", data);
            window.location.reload();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                throw e.response.data.errors;
            }
            throw e;
        }
    };

    const logout = async () => {
        // PERBAIKAN: Pastikan endpoint menggunakan /api/logout
        await apiClient.post("/api/logout");
        window.location.reload();
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 3. Buat Custom Hook (dengan 'export')
export function useAuth() {
    return useContext(AuthContext);
}
