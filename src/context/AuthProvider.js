import { createContext, useCallback, useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import Loader from "../components/Loader/Loader";
import { ROUTES } from "../utils/routes";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [localUser, setLocalUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    let accessToken = localStorage.getItem('accessToken');

    const validateToken = useCallback(async (accessToken) => {
        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.VALIDATE_LOGIN}`,
                method: 'POST',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const data = response.data;
            if (response.status === 200) return data.user;

            if (response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    return validateToken(newAccessToken);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        return validateToken(newAccessToken);
                    }
                } catch (refreshError) {
                    console.error('RefreshToken doğrulanmadı:', error);
                    return localStorage.removeItem('accessToken');
                }
            }
            console.error('Token doğrulanmadı:', error);
            localStorage.removeItem('accessToken');
            return null;
        }
    }, []);

    async function refreshAccessToken() {
        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.REFRESH_TOKEN}`,
                withCredentials: true,
                method: 'GET',
            });

            let data = response.data;

            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                return null;
            }

            let { accessToken } = data.tokens;

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                return accessToken;
            }
        } catch (error) {
            console.error('AccessToken alınmadı:', error);
            return null;
        }
    }

    useEffect(() => {
        if (accessToken) {
            validateToken(accessToken).then((user) => {
                if (user) {
                    setIsAuthenticated(true);
                    setLocalUser(user);
                } else {
                    setIsAuthenticated(false);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [accessToken, validateToken]);

    if (loading) return <div><Loader /></div>;

    return (
        <AuthContext.Provider value={{ localUser, setLocalUser, isAuthenticated, setIsAuthenticated, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;