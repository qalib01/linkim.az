import { useEffect } from "react";
import Register from "../../sections/Register/Register";

function RegisterPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Register />
    )
}

export default RegisterPage;