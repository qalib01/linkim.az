import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Error from "../../sections/Error/Error";

function ErrorPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <Error />
            <Footer />
        </>
    )
}

export default ErrorPage;