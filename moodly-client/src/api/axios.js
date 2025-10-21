import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,

    // TAMBAHAN PENTING:
    // Header ini memberitahu Laravel bahwa kita HANYA mau menerima respons JSON.
    // Ini akan mencegah Laravel melakukan 'redirect' saat terjadi error.
    headers: {
        Accept: "application/json",
    },
});

export default apiClient;
