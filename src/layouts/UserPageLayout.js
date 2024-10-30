import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Index/Footer";
import MetaUser from "../helmet/UserPageHelmet";
import Header from "../components/Header/User/Header";

function UserPageLayout() {
    return (
        <>
            <MetaUser />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default UserPageLayout;