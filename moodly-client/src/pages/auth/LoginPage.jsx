import { useState } from "react";
import apiClient from "../../api/axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrors({});
        setStatus("");

        try {
            // 1. Ambil CSRF cookie
            await apiClient.get("/sanctum/csrf-cookie");

            // 2. Kirim request login
            const response = await apiClient.post("/login", {
                email: email,
                password: password,
            });

            setStatus("Login berhasil!");
            console.log(response.data);
            // Nanti di sini kita akan redirect user ke dashboard
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Tangani error validasi dari Laravel
                setErrors(error.response.data.errors);
            } else {
                console.error("Terjadi kesalahan:", error);
                setStatus(
                    "Login gagal. Periksa kembali email dan password Anda."
                );
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Login ke Moodly
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                    {status && (
                        <p className="text-center text-sm text-green-600">
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
