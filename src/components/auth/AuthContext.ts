import { createContext, useContext } from "react";
import { User } from "../../types/types";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: (username: string, password: string) => Promise<void>;
    handleLogOut: () => Promise<void>;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};

export default AuthContext