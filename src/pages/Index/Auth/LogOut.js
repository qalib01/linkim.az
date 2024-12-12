import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { apiRequest } from "../../../utils/apiRequest";


function Logout() {
    const { user, setUser } = useAuth();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    async function logoutUser(refreshToken) {
        const response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/logout`,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });

        return response.data;
    }

    useEffect(() => {
        setUser(null);
        setIsAuthenticated(false);
        logoutUser(localStorage.getItem('refreshToken'));
        localStorage.removeItem('accessToken');
        navigate('/');
    }, [user, setUser, isAuthenticated, setIsAuthenticated, navigate]);

    return null;
}

export default Logout;