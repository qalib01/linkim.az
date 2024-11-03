import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
library.add(faSignOut)

function Navbar() {
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm opacity-5 text-dark"> Səhifələr </li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page"> Dashboard </li>
          </ol>
          <h6 className="font-weight-bolder mb-0"> Dashboard </h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4">
          <ul className="navbar-nav justify-content-end ms-md-auto">
            <li className="nav-item d-flex align-items-center d-xl-block">
              <a href="/" className="nav-link text-body font-weight-bold px-0">
                <FontAwesomeIcon icon={faSignOut} size="lg" />
                <span className="d-sm-inline d-none" style={{marginLeft: "10px"}}>Çıxış</span>
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="/" className="nav-link text-body p-0">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;