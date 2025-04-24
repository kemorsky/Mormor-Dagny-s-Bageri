import { useState } from "react"
import { addUser } from "../../../lib/api"
import { RegisterUser } from "../../../types/types"
import Menu from "../../../elements/menu/menu";
import { defaultUser } from "../../../constants/prefab-consts";

export default function AddUser() {
    const [newUser, setNewUser] = useState<RegisterUser>(() => ({ ...defaultUser }))
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addUser(newUser)
            if (response) {
                setNewUser({ ...defaultUser })
                console.log("added user", newUser)
            }
        } catch (error) {
            console.log("failed to add user",error)
        }
    };

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <form onSubmit={handleSubmit} className="inline-flex flex-col gap-4">
                    <input type="text"
                        placeholder="Användarnamn"
                        value={newUser.Användarnamn}
                        onChange={(e) => {setNewUser({...newUser, Användarnamn: e.target.value})}} />
                    <input type="text" // Dev note: only admin can create accounts, making this section okay to leave as text
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
                    <button type="submit">Lägg till</button>
                </form>
            </div>
        </main>
    )
};