import { PropsWithChildren, useState, useEffect } from "react";
import UserContext from "./UserContext";
import { fetchUsers } from "../../lib/api";
import { User } from "../../types/types";

type UsersProviderProps = PropsWithChildren

export default function UserProvider({children}: UsersProviderProps) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect (() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.log(error)
            }
        }
        getUsers().catch((error) => {
            console.log("couldn't fetch users", error)
        })
    }, []);

    return (
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    )
}