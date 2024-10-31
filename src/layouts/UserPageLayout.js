import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/User/Footer";
import MetaUser from "../helmet/UserPageHelmet";
import SideNav from "../components/Header/User/SideNav";
import Navbar from "../components/Header/User/Navbar";
import CustomizePlugin from "../components/Header/User/CustomizePlugin";

function UserPageLayout() {
    return (
        <>
            <MetaUser />
            <SideNav />
            <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
            <CustomizePlugin />
        </>
    )
}

export default UserPageLayout;