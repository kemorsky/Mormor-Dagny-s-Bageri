import { useState } from "react"
import { addUser } from "../../../lib/api"
import { RegisterUser } from "../../../types/types"
import Menu from "../../../elements/menu/menu";
import { defaultUser } from "../../../constants/prefab-consts";
import { InputPrimary } from "../../../components/ui/input";
import { Main, Wrapper } from "../../../blocks/wrappers";
import { Button } from "../../../components/ui/button-shadcn";

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
        <Main>
            <Wrapper>
                <Menu />
                <form onSubmit={handleSubmit} className="inline-flex flex-col gap-2.5 bg-Branding-cardPrimary shadow-[0px_0px_8px_4px_rgba(180,180,180,0.12)] rounded-lg p-4">
                    <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                        <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Användarnamn</span>
                        <InputPrimary type="text"
                            placeholder="Användarnamn"
                            value={newUser.Användarnamn}
                            onChange={(e) => {setNewUser({...newUser, Användarnamn: e.target.value})}} />
                    </label>
                    <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                        <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Lösenord</span>
                        <InputPrimary type="text" // Dev note: only admin can create accounts, making this section okay to leave as text
                            placeholder="Lösenord"
                            value={newUser.Lösenord}
                            onChange={(e) => {setNewUser({...newUser, Lösenord: e.target.value})}} />
                    </label>
                    <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                        <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Roll</span>
                        <InputPrimary type="number"
                            placeholder="Roll"
                            value={newUser.Roll}
                            onChange={(e) => {setNewUser({...newUser, Roll: parseFloat(e.target.value)})}} />
                    </label>
                    <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                        <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Email</span>
                        <InputPrimary type="text"
                            placeholder="Email"
                            value={newUser.Email}
                            onChange={(e) => {setNewUser({...newUser, Email: e.target.value})}} />
                    </label>
                    <label className="min-h-[40px] w-[4rem] flex items-center justify-between cursor-pointer">
                        <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">
                            {newUser.Låst ? "Låst" : "Olåst"}
                        </span> 
                        <input
                            className="w-5 h-5 text-blue bg-gray-300 accent-blue-600 cursor-pointer"
                            type="checkbox"
                            checked={newUser.Låst}
                            onChange={(e) => setNewUser({...newUser, Låst: e.target.checked})}
                        />
                    </label>        
                    <Button variant="proceed" type="submit">Lägg till</Button>
                </form>
            </Wrapper>
        </Main>    
    )
};