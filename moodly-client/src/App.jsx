import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router";

function App() {
    // App.jsx sekarang menjadi "pusat" di mana kita menyusun semua provider.
    // BrowserRouter membungkus semuanya, menyediakan konteks routing.
    // AuthProvider membungkus AppRouter, menyediakan konteks autentikasi.
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
