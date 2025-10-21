import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router"; // <-- Mengimpor router yang sudah bersih

function App() {
    // AuthProvider membungkus AppRouter agar semua rute
    // bisa mengakses data user.
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
