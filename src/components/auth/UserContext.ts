import { createContext, useContext } from "react";
import { User } from "../../types/types";

type UserContext = {
    users: User[],
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
};

const UserContext = createContext<UserContext | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === null || undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return {users: context.users ?? [], setUsers: context.setUsers}
}

export default UserContext