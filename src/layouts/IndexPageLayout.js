import { Outlet } from "react-router-dom";
import Header from "../components/Header/Index/Header";
import Footer from "../components/Footer/Index/Footer";
import MetaIndex from "../helmet/IndexPageHelmet";

function IndexPageLayout() {
    return (
        <>
            <MetaIndex />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default IndexPageLayout;