import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.scss';
import LogoSvg from '../../Icons/LogoSvg';

function Header() {
   return (
      <nav id="primary-navbar" className={`${ classes.primaryNav } navbar navbar-expand-lg navbar-light bg-white font-nunito`}>
         <div className="container px-4 px-sm-0">
            <Link to='/' className={ classes.navbarBrand }>
               <LogoSvg />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className={`${ classes.navbarNav } ms-auto d-flex`}>
                  <li className="nav-item">
                     <NavLink className={({ isActive }) => isActive ? `${classes.navLink} ${classes.active}` : classes.navLink } to="/" end> Əsas səhifə </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className={({ isActive }) => isActive ? `${classes.navLink} ${classes.active}` : classes.navLink } to="/p/about" end> Haqqımızda </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className={({ isActive }) => isActive ? `${classes.navLink} ${classes.active}` : classes.navLink } to="/p/contact" end> Əlaqə </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default Header;