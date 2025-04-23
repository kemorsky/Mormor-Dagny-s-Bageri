import { useState } from "react"
import { addUser } from "../../../lib/api"
import { User } from "../../../types/types"
import Menu from "../../../elements/menu/menu";
import { defaultUser } from "../../../constants/prefab-consts";

export default function AddUser() {
    const [newUser, setNewUser] = useState<User>(() => ({ ...defaultUser }))
    const [locked, setLocked] = useState<boolean>(false);
    
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
                value={newUser.Användarnamn}
                onChange={(e) => {setNewUser({...newUser, Användarnamn: e.target.value})}} />
            <input type="text"
                placeholder="Lösenord"
                value={newUser.LösenordHash}
                onChange={(e) => {setNewUser({...newUser, LösenordHash: e.target.value})}} />
            <input type="number"
                placeholder="Roll"
                value={newUser.Roll}
                onChange={(e) => {setNewUser({...newUser, Roll: parseFloat(e.target.value)})}} />
            <input type="text"
                placeholder="Email"
                value={newUser.Email}
                onChange={(e) => {setNewUser({...newUser, Email: e.target.value})}} />
            <label className="flex items-center gap-2 mt-2">
                Låst: 
                <input
                    type="checkbox"
                    checked={locked ?? false}
                    onChange={(e) => setLocked(e.target.checked)}
                />
                {locked ? "Locked" : "Unlocked"}
            </label>         
            <button onClick={() => {handleAddUser(newUser)}}>Lägg till</button>
        </main>
    )
};