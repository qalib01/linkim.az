import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "../components/Header/Index/Header";
import Footer from "../components/Footer/Index/Footer";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";

function IndexPageLayout() {
    const token = useLoaderData('pageRoot');
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/p/logout', method: 'POST' });
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
           submit(null, { action: '/p/logout', method: 'POST' });
        }, tokenDuration);
    }, [token, submit])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default IndexPageLayout;