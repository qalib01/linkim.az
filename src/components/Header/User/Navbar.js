import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import useSideNav from "../../../hooks/useSideNav";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import Breadcrumb from "./Breadcrumb";
library.add(faSignOut)

function Navbar() {
  const { isSideNavOpen, setIsSideNavOpen } = useSideNav();

  function toggleSideNav() {
    setIsSideNavOpen(!isSideNavOpen);
  }

  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky">
      <div className="container-fluid py-1 px-3">
        <Breadcrumb />
        <ul className="navbar-nav justify-content-end ms-md-auto flex-row">
          <li className="nav-item d-flex align-items-center d-xl-block">
            <Link to="/p/logout" className="nav-link text-body font-weight-bold px-0">
              <FontAwesomeIcon icon={faSignOut} size="lg" />
              <span className="d-sm-inline d-none" style={{ marginLeft: "10px" }}>Çıxış</span>
            </Link>
          </li>
          <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
            <Button classList='bg-transparent border-0' asButton={true} onClick={toggleSideNav}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;