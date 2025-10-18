import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx"; // 1. Import AuthProvider
import { BrowserRouter } from "react-router-dom"; // 2. Import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* 3. Bungkus App dengan AuthProvider */}
        {/* Kita juga butuh BrowserRouter di sini agar hook useNavigate di context bisa jalan */}
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
