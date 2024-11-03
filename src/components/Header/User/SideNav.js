import { Link, NavLink, useLocation } from "react-router-dom";
import LogoSvg from "../../Icons/LogoSvg";
import ShopIconSvg from "../../Icons/ShopIconSvg";
import OfficeIconSvg from "../../Icons/OfficeIconSvg";

function SideNav() {
    const location = useLocation();

    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y">
            <div className="sidenav-header">
                <Link to='/' className="navbar-brand m-0">
                    <LogoSvg />
                </Link>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => location.pathname === '/u/' || isActive ? `nav-link mb-2 active` : `nav-link mb-2`} to='/u/dashboard'>
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <ShopIconSvg />
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => isActive ? `nav-link mb-2 active` : `nav-link mb-2`} to='/u/profile'>
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <OfficeIconSvg />
                            </div>
                            <span className="nav-link-text ms-1">Profil</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideNav;