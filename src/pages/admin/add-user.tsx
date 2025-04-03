import { useState } from "react"
import { addUser } from "../../lib/api"
import { User } from "../../types/types"
import Menu from "../../elements/menu/menu";
import UserTypes from "../../lib/userTypes";

export default function AddUser() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<number | string>();
    const [email, setEmail] = useState<string>('');
    const [locked, setLocked] = useState<boolean>();
    
    const user: User = {
        Användarnamn: username,
        LösenordHash: password,
        Roll: role ?? '',
        Email: email,
        Låst: locked
    }

    console.log(user)

    const handleAddUser = async (user: User) => {
        try {
            await addUser(user)
            console.log("added user", user)
        } catch (error) {
            console.log("failed to add user",error)
        }
    };

    return (
        <main className="flex flex-col items-center justify-center gap-4">
            <Menu />
            <input type="text"
                placeholder="Användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <input type="text"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <input type="number"
                placeholder="Roll"
                value={role}
                onChange={(e) => setRole(parseInt(e.target.value))} />
            <input type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input type="checkbox" checked={locked ?? false}
                placeholder="Låst"
                onChange={(e) => setLocked(e.target.checked)} />
            <button onClick={() => {handleAddUser(user)}}>Lägg till</button>
        </main>
    )
};