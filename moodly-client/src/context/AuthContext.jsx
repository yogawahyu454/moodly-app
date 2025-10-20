import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true); // <-- TAMBAHKAN INI
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await apiClient.get("/api/user");
            setUser(data);
        } catch (e) {
            // Abaikan error 401
        } finally {
            setLoading(false); // <-- TAMBAHKAN INI
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const login = async (data) => {
        await apiClient.get("/sanctum/csrf-cookie");
        await apiClient.post("/login", data);
        await getUser(); // State akan update & router akan redirect otomatis
    };

    const register = async (data) => {
        await apiClient.get("/sanctum/csrf-cookie");
        await apiClient.post("/register", data);
        await getUser(); // State akan update & router akan redirect otomatis
    };

    const logout = async () => {
        await apiClient.post("/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, errors, loading, getUser, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
