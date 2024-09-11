import { Link, NavLink } from "react-router-dom";
import classes from './Header.module.css';

function Header() {
    return (
        <nav className={ classes.primary_nav + 'navbar navbar-expand-lg navbar-light bg-white fixed-to' }>
            <div className="container px-4 px-sm-0">
                <Link className="navbar-brand" to="/"> Logo </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link' } to="/"> Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link' } to="/about"> About </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;