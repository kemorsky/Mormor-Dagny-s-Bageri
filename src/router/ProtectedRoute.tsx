import { Navigate } from "react-router";
import { useAuth } from "../components/auth/AuthContext";
import UserTypes from "../lib/userTypes";

type ProtectedRouteProps = {
    element: React.ReactNode;
    roles: (string | number)[];
    path: string;
};

    export const ProtectedRoute = ({element, roles, path}: ProtectedRouteProps) => {
        const { currentUser, isLoading } = useAuth();
        if (isLoading) {
            return <div>Loading data...</div>
        }

        const userType = currentUser && UserTypes(currentUser);
        if (!currentUser || !userType || !roles.includes(userType)) {
            return <Navigate to="/access-denied" />;
        }
        return <>{element}</>;
    }