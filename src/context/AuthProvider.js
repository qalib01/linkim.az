import { createContext, useCallback, useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import Loader from "../components/Loader/Loader";
// import { useNavigate } from "react-router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    let accessToken = localStorage.getItem('accessToken');
    // const navigate = useNavigate();

    const validateToken = useCallback(async (accessToken) => {
        try {
            const { status, data } = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}/validate-login`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    return validateToken(newAccessToken);
                }
                return null;
            } else {
                return data.user;
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    return validateToken(newAccessToken);
                }
            }
            console.error('Token doğrulanmadı:', error);
            return null;
        }
    }, []);

    async function refreshAccessToken() {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            // navigate('/login');
            return null;
        }

        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}/refresh-token`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            let data = response.data;

            if (response.status === 401) {
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
                return null;
            }

            let { accessToken } = data.tokens;

            if (data && accessToken) {
                console.log(data)
                localStorage.setItem('accessToken', accessToken);
                return accessToken;
            }

            return null;
        } catch (error) {
            console.error('Refresh token ilə yeni access token alınmadı:', error);
            // navigate('/login');
            return null;
        }
    }

    useEffect(() => {
        if (accessToken) {
            validateToken(accessToken).then((user) => {
                if (user) {
                    setIsAuthenticated(true);
                    setUser(user);
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
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;