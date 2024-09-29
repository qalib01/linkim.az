import { useEffect } from "react";
import Login from "../../sections/Login/Login";

function LoginPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Login />
    )
}

export default LoginPage;