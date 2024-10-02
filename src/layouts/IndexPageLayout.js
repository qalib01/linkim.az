import { Outlet } from "react-router-dom";
import Header from "../components/Header/Index/Header";
import Footer from "../components/Footer/Index/Footer";

function IndexPageLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default IndexPageLayout;