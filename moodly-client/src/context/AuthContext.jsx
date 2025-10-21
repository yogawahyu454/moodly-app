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
            // Rute ini sudah benar karena memiliki prefix /api
            const { data } = await apiClient.get("/api/user");
            setUser(data);
        } catch (e) {
            // Abaikan, berarti user belum login
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Panggil getUser hanya sekali saat komponen dimuat
        getUser();
    }, []);

    const login = async (data) => {
        try {
            // Rute Sanctum CSRF tidak memiliki prefix /api
            await apiClient.get("/sanctum/csrf-cookie");
            // PERBAIKAN: Tambahkan prefix /api pada rute login
            await apiClient.post("/api/login", data);
            // Solusi paling andal: Paksa reload halaman untuk sinkronisasi sesi
            window.location.reload();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                throw e.response.data.errors;
            }
            throw e;
        }
    };

    const register = async (data) => {
        const { address, ...finalData } = data;
        try {
            await apiClient.get("/sanctum/csrf-cookie");
            // PERBAIKAN: Tambahkan prefix /api pada rute register
            await apiClient.post("/api/register", finalData);
            window.location.reload();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                throw e.response.data.errors;
            }
            throw e;
        }
    };

    const logout = async () => {
        // PERBAIKAN: Tambahkan prefix /api pada rute logout
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
