import { Form, Link, NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './Header.module.scss';
import LogoSvg from '../../Icons/LogoSvg';
import MenuBarIconSvg from '../../Icons/MenuBarIconSvg';
import { useState } from 'react';
import CloseIconSvg from '../../Icons/CloseIconSvg';

function Header() {
   const [isOpen, setIsOpen] = useState(false);
   const token = useRouteLoaderData('pageRoot');

   function toggleMenu() {
      setIsOpen(!isOpen);
   }

   const closeMenu = () => {
      setIsOpen(false);
   }

   return (
      <nav id="primary-navbar" className={`${classes.primaryNav} navbar navbar-expand-lg navbar-light bg-white font-nunito`}>
         <div className="container px-4 px-sm-0">
            <Link to='/' className={classes.navbarBrand}>
               <LogoSvg />
            </Link>
            <ul className={`${classes.navbarNav} ${isOpen && classes.active} ms-auto`}>
               <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? `${classes.navLink} ${classes.active}` : classes.navLink} to="/" end onClick={closeMenu}> Əsas səhifə </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? `${classes.navLink} ${classes.active}` : classes.navLink} to="/p/about" end onClick={closeMenu}> Haqqımızda </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? `${classes.navLink} ${classes.active}` : classes.navLink} to="/p/contact" end onClick={closeMenu}> Əlaqə </NavLink>
               </li>
               {
                  token && <li className="nav-item">
                     <Form action='/p/logout' method='post'>
                        <button style={{ border: 'none', backgroundColor: 'transparent' }} className={classes.navLink}> Çıxış </button>
                     </Form>
                  </li>
               }
            </ul>
            <div className={classes.menuIcon} onClick={toggleMenu}>
               {isOpen ? <CloseIconSvg /> : <MenuBarIconSvg />}
            </div>
         </div>

      </nav>
   )
}

export default Header;