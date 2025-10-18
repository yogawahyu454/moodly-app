import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage"; // Import halaman login

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Halaman Beranda (Public)</div>,
    },
    {
        path: "/login",
        element: <LoginPage />, // Gunakan komponen LoginPage di sini
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
