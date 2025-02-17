import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from "../../utils/routes";


const ProtectedRoute = ({ allowedRoles }) => {
    const { localUser, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to={`/${ROUTES.PUBLIC.HOME}${ROUTES.PUBLIC.LOGIN}`} replace />
    if (allowedRoles && !allowedRoles.includes(localUser?.role)) return <Navigate to={`/${ROUTES.PRIVATE.HOME}${ROUTES.PRIVATE.DASHBOARD}`} replace />
    return <Outlet />
}

export default ProtectedRoute;