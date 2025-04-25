import Menu from "../../../elements/menu/menu";
import { User } from '../../../types/types'
import { deleteUser, editUser, editUserPassword } from "../../../lib/api";
import { useUser } from "../../../components/auth/UserContext";
import { useState } from "react";
import { AdminUserCard, AdminUserCardContent} from "../../../blocks/admin-cards";
import { InputPrimary } from "../../../components/ui/input";
import { ButtonAdminManageUser } from "../../../components/ui/button";

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
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <select id="users" className="max-w-[25.5rem] w-full bg-Branding-input border border-Branding-textAccent text-Branding-textPrimary font-inter text-[0.875rem] rounded-lg focus:border-white focus:outline-none block p-3 ">
                    <option value="">Välj användare</option>
                    {users?.map((user) => (
                        <option key={user.AnvändareId} value={user.Användarnamn} onClick={() => {setSelectedUser(user)}}>
                            {user.Användarnamn}, {user.Roll}
                        </option>
                    ))}
                </select>
                {selectedUser ? (
                    <AdminUserCard key={selectedUser.AnvändareId}>
                        <AdminUserCardContent>
                            <article className="w-full flex items-center justify-start gap-1.5">
                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Användarnamn:</p>
                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selectedUser.Användarnamn}</p>
                            </article>
                            <article className="w-full flex items-center justify-start gap-1.5">
                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Email:</p>
                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selectedUser.Email}</p>
                            </article>
                            <article className="w-full flex items-center justify-start gap-1.5">
                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Roll:</p>
                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selectedUser.Roll}</p>
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
                        </AdminUserCardContent>
                        {editingPassword?.Användarnamn === selectedUser.Användarnamn ? (
                            <form className="flex flex-col gap-3 self-center" onSubmit={handlePasswordChange}>
                                <InputPrimary
                                    type="text"
                                    value={editingPassword?.LösenordHash ?? ''}
                                    onChange={(e) => setEditingPassword({ ...editingPassword, LösenordHash: e.target.value })}
                                />
                                <div className="inline-flex items-center justify-center gap-3">
                                    <button className="bg-green-600 hover:bg-green-700 transition-colors px-3 py-2 rounded-lg font-lato" type="submit">Spara</button>
                                    <button className="bg-red-600 hover:bg-red-700 transition-colors px-3 py-2 rounded-lg font-lato" onClick={() => {setEditingPassword(null)}}>Avbryt</button>
                                </div>
                                
                            </form> 
                            ) : (
                                <div className="self-center flex items-center justify-center gap-3">
                                    <ButtonAdminManageUser onClick={() => handleEdit(selectedUser)}>Redigera lösenord</ButtonAdminManageUser>
                                    <ButtonAdminManageUser onClick={() => {handleDeleteUser(selectedUser.Användarnamn ?? '')}}>Ta bort användare</ButtonAdminManageUser>
                                </div>
                            )}
                    </AdminUserCard>
                ) : (
                    <p>Välj en användare</p>
                )}
            </div>
        </main>
    )
};