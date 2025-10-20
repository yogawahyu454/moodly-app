import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // ... (fungsi getUser, login, register, logout tetap sama) ...
    const getUser = async () => {
        try {
            const { data } = await apiClient.get("/api/user");
            setUser(data);
        } catch (e) {
            // Abaikan error 401 karena berarti user belum login
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user]);

    const login = async (data) => {
        setErrors(null);
        await apiClient.get("/sanctum/csrf-cookie");
        await apiClient.post("/login", data);
        await getUser();
        navigate("/dashboard");
    };

    const register = async (data) => {
        setErrors(null);
        await apiClient.get("/sanctum/csrf-cookie");
        await apiClient.post("/register", data);
        await getUser();
        navigate("/dashboard");
    };

    const logout = async () => {
        await apiClient.post("/logout");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{ user, errors, getUser, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// PERUBAHAN DI SINI: Ubah dari 'export default' menjadi 'export'
export function useAuth() {
    return useContext(AuthContext);
}
