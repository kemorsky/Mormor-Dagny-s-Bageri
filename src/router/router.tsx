import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AccessDenied from '../pages/access-denied/access-denied';
import LoginPage from '../pages/login-page/login-page';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import AdminDashboard from '../pages/admin-dashboard/admin-dashboard';
import AddUser from '../pages/admin/add-user/add-user';
import EditUser from '../pages/admin/edit-user/edit-user';
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
import SpecificOrder from '../pages/specific-order/specific-order';
import PlanerareDashboard from '../pages/planerare/planerare-dashboard';
import OrderProvider from '../components/order-provider/OrderProvider';
import ResetPassword from '../pages/reset-password/reset-password';
import Profile from '../pages/profile/profile';

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
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
    {
        path: '/me',
        element: <Profile />
    },
    {
        path: '/planerare-dashboard',
        element: (
            <StoreProvider>
                <OrderProvider>
                    <ProtectedRoute
                        path="/planerare-dashboard"
                        element={<PlanerareDashboard />}
                        roles={[0, "Admin", 2, "Planerare"]}
                    />
                </OrderProvider>
            </StoreProvider>
        )
    },
    {
        path: '/seller-dashboard',
        element: (
            <OrderProvider>
                <StoreProvider>
                    <ProtectedRoute
                        path="/seller-dashboard"
                        element={<SellerDashboard />}
                        roles={[0, "Admin", 1, "Säljare"]}
                    />
                </StoreProvider>
            </OrderProvider>
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
                        path="/confirm-order"
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
                        path="/confirmation-page/:orderId"
                        element={<ConfirmationPage/>}
                        roles={[0, "Admin", 1, "Säljare"]}
                    />
                </ProductProvider>
            </StoreProvider>
        )
    },
    {
        path: '/order/:id',
        element: (
            <ProductProvider>
                <ProtectedRoute
                    path="/order/:id"
                    element={<SpecificOrder/>}
                    roles={[0, "Admin", 1, "Säljare", 2, "Planerare"]}
                />  
            </ProductProvider>
        )
    },
    {
        path: '/orders',
        element: (
            <OrderProvider>
                <StoreProvider>
                    <ProtectedRoute
                        path="/order/:id"
                        element={<OrdersPage/>}
                        roles={[0, "Admin", 1, "Säljare", 2, "Planerare"]}
                    />  
                </StoreProvider>
            </OrderProvider>
        )
    },
])

export default router;