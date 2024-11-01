import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/User/Footer";
import MetaUser from "../helmet/UserPageHelmet";
import SideNav from "../components/Header/User/SideNav";
import Navbar from "../components/Header/User/Navbar";

function UserPageLayout() {
    return (
        <>
            <MetaUser />
            <SideNav />
            <div className="main-content position-relative bg-gray-100 min-vh-100 d-flex flex-column">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default UserPageLayout;