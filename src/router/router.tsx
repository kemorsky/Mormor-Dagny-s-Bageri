import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AccessDenied from '../pages/access-denied/access-denied';
import LoginPage from '../pages/login-page/login-page';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
/* import Dashboard from '../pages/dashboard/dashboard'; */
import AdminDashboard from '../pages/admin-dashboard/admin-dashboard';
import AddUser from '../pages/admin/add-user/add-user';
import EditUser from '../pages/admin/edit-user/edit-user';
import RemoveUser from '../pages/admin/remove-user/remove-user';
import SellerDashboard from '../pages/seller-dashboard/seller-dashboard';
import OrderPage from '../pages/order-page/order-page';
import OrderDetailsPage from '../pages/order-details/order-details';
import OrdersPage from '../pages/orders/orders';
import Stores from '../pages/admin/stores/stores';
import Products from '../pages/admin/products/products';
import StoreProvider from '../components/auth/StoreProvider';
import ProductProvider from '../components/auth/ProductProvider';
import UserProvider from '../components/auth/UserProvider';
import ConfirmationPage from '../pages/confirmation-page/confirmation-page';


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
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    /*     {
            path: '/dashboard',
            element: <Dashboard />,
        }, */

    {
        path: '/seller-dashboard',
        element: (
            <StoreProvider>
                <ProtectedRoute
                    path="/seller-dashboard"
                    element={<SellerDashboard />}
                    roles={[0, "Admin", 1, "Säljare"]}
                />
            </StoreProvider>
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
        path: '/admin-add-user',
        element: (
            <ProtectedRoute
                path='/admin-add-user'
                element={<AddUser />}
                roles={[0, 'Admin']}
            />
        )
    },
    {
        path: '/admin-edit-user',
        element: (
            <UserProvider>
                <ProtectedRoute
                    path='/admin-edit-user'
                    element={<EditUser />}
                    roles={[0, 'Admin']}
                />
            </UserProvider>
        )
    },
    {
        path: '/admin-remove-user',
        element: (
            <UserProvider>
                <ProtectedRoute
                    path='/admin-remove-user'
                    element={<RemoveUser />}
                    roles={[0, 'Admin']}
                />
            </UserProvider>
        )
    },
    {
        path: '/admin-stores',
        element: (
            <StoreProvider>
                <ProtectedRoute
                    path='/admin-stores'
                    element={<Stores />}
                    roles={[0, 'Admin']}
                />
            </StoreProvider>
        )
    },
    {
        path: '/admin-products',
        element: (
            <ProductProvider>
                <ProtectedRoute
                    path='/admin-products'
                    element={<Products />}
                    roles={[0, 'Admin']}
                />
            </ProductProvider>
        )
    },
    {
        path: '/order',
        element: (
            <StoreProvider>
                <ProductProvider>
                    <ProtectedRoute
                        path="/order"
                        element={<OrderPage />}
                        roles={[0, "Admin", 1, "Säljare"]}
                    />
                </ProductProvider>
            </StoreProvider>
        )
    },
    {
        path: '/confirm-order',
        element: (
            <StoreProvider>
                <ProductProvider>
                    <ProtectedRoute
                        path="/order"
                        element={<OrderDetailsPage />}
                        roles={[0, "Admin", 1, "Säljare"]}
                    />
                </ProductProvider>
            </StoreProvider>
        )
    },
    {
        path: '/confirmation-page/:orderId',
        element: (
            <StoreProvider>
                <ProductProvider>
                    <ProtectedRoute
                        path="/order"
                        element={<ConfirmationPage/>}
                        roles={[0, "Admin", 1, "Säljare"]}
                    />
                </ProductProvider>
            </StoreProvider>
        )
    },
    {
        path: '/orders',
        element: <OrdersPage />,
    },
])

export default router;