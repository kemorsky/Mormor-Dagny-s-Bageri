import { useState } from "react"
import { addUser } from "../../../lib/api"
import { RegisterUser } from "../../../types/types"
import Menu from "../../../elements/menu/menu";
import { defaultUser } from "../../../constants/prefab-consts";

export default function AddUser() {
    const [newUser, setNewUser] = useState<RegisterUser>(() => ({ ...defaultUser }))
    
    const handleAddUser = async (user: RegisterUser) => {
        try {
            await addUser(user)
            setNewUser({ ...defaultUser })
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
                value={newUser.Lösenord}
                onChange={(e) => {setNewUser({...newUser, Lösenord: e.target.value})}} />
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
                    checked={newUser.Låst}
                    onChange={(e) => setNewUser({...newUser, Låst: e.target.checked})}
                />
                {newUser.Låst ? "Locked" : "Unlocked"}
            </label>        
            <button onClick={() => {handleAddUser(newUser)}}>Lägg till</button>
        </main>
    )
};