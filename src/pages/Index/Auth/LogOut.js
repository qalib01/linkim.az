import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { apiRequest } from "../../../utils/apiRequest";


function Logout() {
    const { localUser, setLocalUser } = useAuth();
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
        setLocalUser(null);
        setIsAuthenticated(false);
        logoutUser(localStorage.getItem('refreshToken'));
        localStorage.removeItem('accessToken');
        navigate('/');
    }, [localUser, setLocalUser, isAuthenticated, setIsAuthenticated, navigate]);

    return null;
}

export default Logout;