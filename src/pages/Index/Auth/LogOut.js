import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";


function Logout() {
    const { user, setUser } = useAuth();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/');
    }, [user, setUser, isAuthenticated, setIsAuthenticated, navigate]);

    return null;
}

export default Logout;