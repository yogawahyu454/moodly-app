import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await apiClient.get("/api/user");
            setUser(data);
        } catch (e) {
            // Abaikan, berarti user belum login
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    const login = async (data) => {
        await apiClient.get("/sanctum/csrf-cookie");
        await apiClient.post("/login", data);
        await getUser();
        // Redirect akan diurus oleh GuestGuard di router
    };

    const register = async (data) => {
        // Hapus 'address' singkat karena kita sudah punya detailnya
        const { address, ...finalData } = data;

        await apiClient.get("/sanctum/csrf-cookie");
        await apiClient.post("/register", finalData);
        await getUser(); // Ambil data user yang baru dibuat
        // Redirect akan diurus oleh GuestGuard di router
    };

    const logout = async () => {
        await apiClient.post("/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, getUser, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
