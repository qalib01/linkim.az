import { Link, NavLink, useLocation } from "react-router-dom";
import LogoSvg from "../../Icons/LogoSvg";
import ShopIconSvg from "../../Icons/ShopIconSvg";
import OfficeIconSvg from "../../Icons/OfficeIconSvg";
import useSideNav from "../../../hooks/useSideNav";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHouse, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import useIsSmallScreen from "../../../hooks/useIsSmallScreen";
import useAuth from "../../../hooks/useAuth";
import ProtectedNavLink from "../../ProtectedRoute/ProtectedNavLink";

function SideNav() {
    const location = useLocation();
    const { isSideNavOpen, setIsSideNavOpen } = useSideNav();
    const isSmallScreen = useIsSmallScreen();
    const { user } = useAuth();

    function toggleSideNav() {
        setIsSideNavOpen(!isSideNavOpen);
    }

    return (
        <aside className={`sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y ${isSmallScreen
            ? isSideNavOpen
                ? 'show'
                : 'hide'
            : 'show'}`}>
            {isSmallScreen && (
                <li className="nav-item d-flex align-items-center justify-content-center py-4">
                    <Button
                        classList="bg-transparent border-0"
                        asButton={true}
                        onClick={toggleSideNav}
                    >
                        <div className="sidenav-toggler-inner">
                            <FontAwesomeIcon icon={faXmark} className="h3" />
                        </div>
                    </Button>
                </li>
            )}
            <Link to='/' className="navbar-brand m-0">
                <LogoSvg />
            </Link>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => location.pathname === '/u/' || isActive ? `nav-link mb-2 active` : `nav-link mb-2`} onClick={() => isSmallScreen && setIsSideNavOpen(false)} to='/u/dashboard'>
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <ShopIconSvg />
                                <FontAwesomeIcon icon={faHouse} />
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => isActive ? `nav-link mb-2 active` : `nav-link mb-2`} onClick={() => isSmallScreen && setIsSideNavOpen(false)} to='/u/profile'>
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faAddressCard} />
                            </div>
                            <span className="nav-link-text ms-1">Profil</span>
                        </NavLink>
                    </li>
                    <ProtectedNavLink to='/u/users' allowedRoles={['Admin']} onClick={() => isSmallScreen && setIsSideNavOpen(false)}>
                        <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <span className="nav-link-text ms-1">İstifadəçilər</span>
                    </ProtectedNavLink>
                </ul>
            </div>
        </aside>
    )
}

export default SideNav;