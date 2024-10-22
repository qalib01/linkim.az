import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

function Logout() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setAuth({});
        navigate('/');
        console.log(auth)
    }, [auth, setAuth, navigate]);

    return null;
}

export default Logout;