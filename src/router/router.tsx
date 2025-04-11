import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/dashboard/dashboard';
import OrderPage from '../pages/order-page/order-page';
import ConfirmationPage from '../pages/confirmation.page/confirmation-page';
import OrdersPage from '../pages/orders/orders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/order',
        element: <OrderPage />,
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