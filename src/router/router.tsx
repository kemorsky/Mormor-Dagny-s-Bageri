import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing-page/landing-page';
import LoginPage from '../pages/login-page/login-page';
import SignUpPage from '../pages/sign-up-page/sign-up-page';
import Dashboard from '../pages/dashboard/dashboard';
import OrderPage from '../pages/order-page/order-page';

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
        path: '/signup',
        element: <SignUpPage />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/order',
        element: <OrderPage />,
    },

])

export default router;