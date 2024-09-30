import { useEffect } from "react";
import Login from "../../sections/Login/StateLogin";

function LoginPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Login />
    )
}

export default LoginPage;