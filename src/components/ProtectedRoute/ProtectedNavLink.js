import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const ProtectedNavLink = ({ to, allowedRoles, children, ...rest }) => {
    const { user } = useAuth();

    if (!allowedRoles.includes(user?.role?.name)) return null;

    return (
        <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? `nav-link mb-2 active` : `nav-link mb-2`} to={to} {...rest}>
                {children}
            </NavLink>
        </li>
    )
}

export default ProtectedNavLink;