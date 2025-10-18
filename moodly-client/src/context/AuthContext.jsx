import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/axios";
import { useNavigate } from "react-router-dom";

// 1. Membuat Context
const AuthContext = createContext();

// 2. Membuat Provider (Komponen yang akan "membungkus" aplikasi kita)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // State untuk loading awal
    const navigate = useNavigate();

    // 3. Fungsi untuk mengambil data user dari backend
    const getUser = async () => {
        try {
            const response = await apiClient.get("/api/user");
            setUser(response.data);
        } catch (error) {
            // Jika error (misal token tidak valid), set user ke null
            setUser(null);
        } finally {
            setLoading(false); // Selesai loading
        }
    };

    // 4. Cek status login saat aplikasi pertama kali dimuat
    useEffect(() => {
        getUser();
    }, []);

    // 5. Fungsi untuk handle login
    const login = async (data) => {
        try {
            await apiClient.get("/sanctum/csrf-cookie");
            await apiClient.post("/login", data);
            await getUser(); // Setelah login, ambil data user
            navigate("/dashboard"); // Redirect ke dashboard
        } catch (error) {
            // Melempar error agar bisa ditangani di halaman login
            throw error;
        }
    };

    // 6. Fungsi untuk handle logout
    const logout = async () => {
        try {
            await apiClient.post("/logout");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 7. Custom hook untuk mempermudah penggunaan context
export const useAuth = () => {
    return useContext(AuthContext);
};
