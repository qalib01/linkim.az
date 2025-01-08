import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ allowedRoles }) => {
    const { localUser, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to='/p/login' replace />
    if (allowedRoles && !allowedRoles.includes(localUser?.role)) return <Navigate to='/u/dashboard' replace />
    return <Outlet />
}

export default ProtectedRoute;