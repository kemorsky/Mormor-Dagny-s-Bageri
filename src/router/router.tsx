import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing-page/landing-page';
import LoginPage from '../pages/login-page/login-page';
import RecoverPassword from '../pages/recover-password/recover-password';
import Dashboard from '../pages/dashboard/dashboard';
import OrderPage from '../pages/order-page/order-page';
import ConfirmationPage from '../pages/confirmation.page/confirmation-page';
import OrdersPage from '../pages/orders/orders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
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