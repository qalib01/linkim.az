import { useEffect } from "react";
import Error from "../../../sections/Error/Error";

function IndexErrorPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Error />
        </>
    )
}

export default IndexErrorPage;