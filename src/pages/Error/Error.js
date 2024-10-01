import { useEffect } from "react";
import Error from "../../sections/Error/Error";

function ErrorPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Error />
        </>
    )
}

export default ErrorPage;