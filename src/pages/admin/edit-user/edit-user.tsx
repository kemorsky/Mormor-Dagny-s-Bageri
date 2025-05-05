import Menu from "../../../elements/menu/menu";
import { User } from '../../../types/types'
import { deleteUser, editUser, editUserPassword } from "../../../lib/api";
import { useUser } from "../../../components/auth/UserContext";
import { useState } from "react";
import { AdminUserCard, AdminUserCardContent} from "../../../blocks/admin-cards";
import { InputPrimary } from "../../../components/ui/input";
import { Main, Wrapper } from "../../../blocks/wrappers";
import { Button } from "../../../components/ui/button-shadcn";

export default function EditUser() {
    const {users, setUsers} = useUser();

    const [selectedUser, setSelectedUser] = useState<User | null>();
    const [lockedUser, setLockedUser] = useState<string | null>();
    const [editingPassword, setEditingPassword] = useState<User | null>();
    
    const handleCheckboxChange = async (user: User) => {
        try {
            const userLocked = !user.Låst
            setLockedUser(user.Användarnamn)
            await editUser(userLocked, user.Användarnamn ?? '');
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                  u.Användarnamn === user.Användarnamn
                    ? { ...u, Låst: userLocked }
                    : u
                )
              );
            setLockedUser(null);
            setSelectedUser({...user, Låst: userLocked})
        } catch (error) {
            console.log("Failed to update user:", error);
        } 
    };

    const handleEdit = (user: User) => {
            setEditingPassword({...user})
        }

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingPassword) {
            const success = await editUserPassword(editingPassword)
            if (success) {
                setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                      u.Användarnamn === editingPassword.Användarnamn
                        ? { ...u, LösenordHash: editingPassword.LösenordHash }
                        : u
                    )
                  );
                  setEditingPassword(null)
            }
        } 
    }

    const handleDeleteUser = async (Användarnamn: string) => {
        const confirmDelete = window.confirm("Är du säker på att du vill ta bort den här användaren?");
        if (!confirmDelete) {
            return;
    }
            try {
                await deleteUser(Användarnamn);
                console.log("Deleted user:", Användarnamn);
                setUsers((prev) => prev?.filter(user => user.Användarnamn !== Användarnamn));
                setSelectedUser(null)
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <Main>
            <Wrapper>
                <Menu />
                <select id="users" className="max-w-[25.5rem] w-full bg-Branding-input border border-Branding-textAccent text-Branding-textPrimary font-inter text-[0.875rem] rounded-lg focus:border-white focus:outline-none block p-3">
                    <option value="">Välj användare</option>
                    {users?.map((user) => (
                        <option key={user.AnvändareId} value={user.Användarnamn} onClick={() => {setSelectedUser(user)}}>
                            {user.Användarnamn}, {user.Roll}
                        </option>
                    ))}
                </select>
                {selectedUser ? (
                    <AdminUserCard key={selectedUser.AnvändareId}>
                    <AdminUserCardContent className="">
                        <article className="self-stretch inline-flex flex-col justify-start items-start gap-1">
                            <p className="w-24 h-3.5 justify-start text-white text-sm font-semibold font-inter">Användarnamn</p>
                            <p className="self-stretch justify-start text-Branding-textSecondary text-lg font-inter">{selectedUser.Användarnamn}</p>
                        </article>
                        <article className="self-stretch inline-flex flex-col justify-start items-start gap-1">
                            <p className="w-24 h-3.5 justify-start text-white text-sm font-semibold font-inter">Email</p>
                            <p className="self-stretch justify-start text-Branding-textSecondary text-lg font-inter">{selectedUser.Email}</p>
                        </article>
                        <div className="self-stretch flex justify-between">
                            <article className="self-stretch inline-flex flex-col justify-start items-start gap-1">
                                <p className="w-24 h-3.5 justify-start text-white text-sm font-semibold font-inter">Roll</p>
                                <p className="self-stretch justify-start text-Branding-textSecondary text-lg font-inter">{selectedUser.Roll}</p>
                            </article>
                            <label className="min-h-[40px] w-[4rem] flex items-center justify-between cursor-pointer">
                                <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">
                                    {selectedUser.Låst ? "Låst" : "Olåst"}
                                </span> 
                                <input
                                    className="w-5 h-5 text-blue bg-gray-300 accent-blue-600 cursor-pointer"
                                    type="checkbox"
                                    checked={selectedUser.Låst ?? false}
                                    disabled={lockedUser === selectedUser.Användarnamn}
                                    onChange={() => handleCheckboxChange(selectedUser)}
                                />
                            </label>
                        </div>
                    </AdminUserCardContent>
                        {editingPassword?.Användarnamn === selectedUser.Användarnamn ? (
                            <form className="flex flex-col gap-3 self-center" onSubmit={handlePasswordChange}>
                                <InputPrimary
                                    type="text"
                                    value={editingPassword?.LösenordHash ?? ''}
                                    onChange={(e) => setEditingPassword({ ...editingPassword, LösenordHash: e.target.value })}
                                />
                                <div className="inline-flex items-center justify-center gap-3">
                                    <Button variant='manage' size='admin' type="submit">Spara</Button>
                                    <Button variant='delete' size='admin' onClick={() => {setEditingPassword(null)}}>Avbryt</Button>
                                </div>
                                
                            </form> 
                            ) : (
                                <div className="self-center flex items-center justify-center gap-3">
                                    <Button variant='manage' size='admin' onClick={() => handleEdit(selectedUser)}>Redigera lösenord</Button>
                                    <Button variant='delete' size='admin' onClick={() => {handleDeleteUser(selectedUser.Användarnamn ?? '')}}>Ta bort användare</Button>
                                </div>
                            )}
                </AdminUserCard>
                ) : (
                    <p>Välj en användare</p>
                )}
            </Wrapper>
       </Main>
    )
};