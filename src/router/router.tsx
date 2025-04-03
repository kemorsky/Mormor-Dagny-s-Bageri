import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AccessDenied from '../pages/access-denied/access-denied';
import LoginPage from '../pages/login-page/login-page';
import RecoverPassword from '../pages/recover-password/recover-password';
import Dashboard from '../pages/dashboard/dashboard';
import AdminDashboard from '../pages/admin-dashboard/admin-dashboard';
import SellerDashboard from '../pages/seller-dashboard/seller-dashboard';
import OrderPage from '../pages/order-page/order-page';
import ConfirmationPage from '../pages/confirmation.page/confirmation-page';
import OrdersPage from '../pages/orders/orders';
import AddUser from '../pages/admin/add-user';

const router = createBrowserRouter([
    {
        path: "access-denied",
        element: <AccessDenied />
    },
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/recover-password',
        element: <RecoverPassword />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/seller-dashboard',
        element: (
            <ProtectedRoute
                path="/seller-dashboard"
                element={<SellerDashboard />}
                roles={[0, "Admin", 1, "Säljare"]}
            />
        )
    },
    {
        path: '/admin-dashboard',
        element: (
            <ProtectedRoute
                path="/admin-dashboard"
                element={<AdminDashboard />}
                roles={[0, "Admin"]}
            />
        )
    },
    {
        path: '/add-user',
        element: (
            <ProtectedRoute
                path='/add-user'
                element= {<AddUser />}
                roles={[0, 'Admin']}
            />
        )
    },
    {
        path: '/order',
        element: (
            <ProtectedRoute
                path="/order"
                element={<OrderPage />}
                roles={[0, "Admin", 1, "Säljare"]}
            />
        )
    },
    {
        path: '/confirm-order',
        element: <ConfirmationPage />,
    },
    {
        path: '/orders',
        element: <OrdersPage />,
    },

])

export default router;