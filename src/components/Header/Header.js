import { Link, NavLink } from "react-router-dom";
import classes from './Header.module.css';

function Header() {
    return (
        <nav id="primary-navbar" class="primary-nav navbar navbar-expand-lg navbar-light bg-white fixed-top font-nunito">
        <div class="container px-4 px-sm-0">
           <a class="navbar-brand" href="#"><img src="assets/images/logo.png" /></a>
           <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav ms-auto">
                 <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                 </li>
                 <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                 </li>
                 <li class="nav-item">
                    <a class="nav-link" href="#">Work</a>
                 </li>
                 <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Services
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                       <li><a class="dropdown-item" href="#">Branding</a></li>
                       <li><a class="dropdown-item" href="#">UI/UX</a></li>
                       <li><a class="dropdown-item" href="#">Hybrid Apps</a></li>
                       <li><a class="dropdown-item" href="#">Digital Marketing</a></li>
                       <li><a class="dropdown-item" href="#">Growth Hacking</a></li>
                    </ul>
                 </li>
                 <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                 </li>
              </ul>
           </div>
           <button id="open-sidenav" class="open-sidenav bg-transparent border-0 ms-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c333a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                 <line x1="3" y1="12" x2="21" y2="12"></line>
                 <line x1="3" y1="6" x2="21" y2="6"></line>
                 <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
           </button>
        </div>
     </nav>
    )
}

export default Header;