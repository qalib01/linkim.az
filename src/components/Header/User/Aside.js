import { Link } from "react-router-dom";
import LogoSvg from "../../Icons/LogoSvg";
import ShopIconSvg from "../../Icons/ShopIconSvg";
import OfficeIconSvg from "../../Icons/OfficeIconSvg";

function Aside() {
    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3" id="sidenav-main">
            <div className="sidenav-header">
                <Link to='/' className="navbar-brand m-0">
                    <LogoSvg />
                </Link>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link  active" to='/u/dashboard'>
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <ShopIconSvg />
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../pages/tables.html">
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <OfficeIconSvg />
                            </div>
                            <span className="nav-link-text ms-1">Tables</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link  " href="../pages/billing.html">
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <title>credit-card</title>
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                            <g transform="translate(1716.000000, 291.000000)">
                                                <g transform="translate(453.000000, 454.000000)">
                                                    <path className="color-background opacity-6" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"></path>
                                                    <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <span className="nav-link-text ms-1">Billing</span>
                        </a>
                    </li>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link  " href="../pages/profile.html">
                            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                
                            </div>
                            <span className="nav-link-text ms-1">Profile</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidenav-footer mx-3 ">
                <div className="card card-background shadow-none card-background-mask-secondary" id="sidenavCard">
                    <div className="full-background" style="background-image: url('../assets/img/curved-images/white-curved.jpg')"></div>
                    <div className="card-body text-start p-3 w-100">
                        <div className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                            <i className="ni ni-diamond text-dark text-gradient text-lg top-0" aria-hidden="true" id="sidenavCardIcon"></i>
                        </div>
                        <div className="docs-info">
                            <h6 className="text-white up mb-0">Need help?</h6>
                            <p className="text-xs font-weight-bold">Please check our docs</p>
                            <a href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard" target="_blank" className="btn btn-white btn-sm w-100 mb-0">Documentation</a>
                        </div>
                    </div>
                </div>
                <a className="btn bg-gradient-primary mt-3 w-100" href="https://www.creative-tim.com/product/soft-ui-dashboard-pro?ref=sidebarfree">Upgrade to pro</a>
            </div>
        </aside>
    )
}

export default Aside;