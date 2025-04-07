import { useState, useEffect } from "react";
import Menu from "../../elements/menu/menu"
import { User } from '../../types/types'
import { getUser, editUser, editUserPassword } from "../../lib/api";

export default function EditUser() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<number | string>();
    const [email, setEmail] = useState<string>('');
    const [locked, setLocked] = useState<boolean>(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await getUser()
                setUsers(usersData)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers().catch((error) => {
            console.log(error)
        })
    }, [])

    const handleEditPassword = async () => {
        try {
            const editPassword = await editUserPassword({ AnvändareId: 1, LösenordHash: password })
        } catch (error) {
            
        }
    }

    console.log(users)

    return (
        <main className="flex flex-col items-center justify-center gap-4">
            <Menu />
            {users ? (
                users.map((user) => (
                    <div key={user.AnvändareId}>
                        <p>{user.Användarnamn}</p>
                        <p>{user.Roll}</p>
                        <p>{user.Email}</p>
                        <p>{user.Låst}</p>
                    </div>
                ))
            ) : (
                <div>Error fetching users</div>
            )}
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
        </main>
    )
};