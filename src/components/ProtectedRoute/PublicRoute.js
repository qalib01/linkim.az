import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
};

export default PublicRoute;
