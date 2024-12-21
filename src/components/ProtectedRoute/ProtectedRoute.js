import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to='/p/login' replace />
    if (allowedRoles && !allowedRoles.includes(user?.role.name)) return <Navigate to='/u/dashboard' replace />
    return <Outlet />
}

export default ProtectedRoute;