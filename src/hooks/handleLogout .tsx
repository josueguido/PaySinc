import { useAuth } from "@/store/auth";
import { logoutUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { refreshToken, clearAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            if (refreshToken) {
                await logoutUser(refreshToken);
            }
        } catch (err) {
            console.error("Error during logout:", err);
        } finally {
            clearAuth(); // Limpia Zustand
            localStorage.removeItem("auth-storage"); // Limpia persistencia por si acaso
            navigate("/login"); // Redirige
        }
    };

    return handleLogout;
};
