import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useCallback, useEffect } from "react";
import { apiRequest } from "../../../utils/apiRequest";


function Logout() {
    const { setLocalUser } = useAuth();
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogoutUser = useCallback(async (refreshToken) => {
        try {
            await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/logout`,
                headers: { Authorization: `Bearer ${refreshToken}` }
            });
        } catch (error) {
            console.error("Çıxış zamanı xəta baş verdi:", error);
        }
    }, [])

    useEffect(() => {
        setLocalUser(null);
        setIsAuthenticated(false);
        handleLogoutUser();
        localStorage.removeItem('accessToken');
        navigate('/');
    }, [setLocalUser, setIsAuthenticated, navigate, handleLogoutUser]);

    return null;
}

export default Logout;