import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Redirect to login if not authenticated and not on auth pages
    if (
        !isAuthenticated &&
        !(
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
        )
    ) {
        return <Navigate to='/auth/login' />;
    }

    // Redirect authenticated users away from login/register pages
    if (
        isAuthenticated &&
        (
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
        )
    ) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />;
        } else {
            return <Navigate to='/shop/home' />;
        }
    }

    // Redirect non-admin users away from admin routes
    if (
        isAuthenticated &&
        user?.role !== 'admin' &&
        location.pathname.includes('admin')
    ) {
        return <Navigate to='/unauth-page' />;
    }

    // Redirect admin users away from shop routes
    if (
        isAuthenticated &&
        user?.role === 'admin' &&
        location.pathname.includes('shop')
    ) {
        return <Navigate to='/admin/dashboard' />;
    }

    // Render children if no redirects are needed
    return <>{children}</>;
}

export default CheckAuth;
