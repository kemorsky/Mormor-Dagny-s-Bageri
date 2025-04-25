import Menu from "../../../elements/menu/menu";
import { User } from '../../../types/types'
import { deleteUser, editUser, editUserPassword } from "../../../lib/api";
import { useUser } from "../../../components/auth/UserContext";
import { useState } from "react";

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
                <select name="" id="">
                    <option value="">Välj användare</option>
                    {users?.map((user) => (
                        <option key={user.AnvändareId} value={user.Användarnamn} onClick={() => {setSelectedUser(user)}}>
                            {user.Användarnamn}
                        </option>
                    ))}
                </select>
                {selectedUser ? (
                    <div key={selectedUser.AnvändareId} className="flex flex-col gap-4">
                        <div>
                            <p>Användarnamn: {selectedUser.Användarnamn}</p>
                            <p>Email: {selectedUser.Email}</p>
                            <p>Roll: {selectedUser.Roll}</p>
                            <label className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    checked={selectedUser.Låst ?? false}
                                    disabled={lockedUser === selectedUser.Användarnamn}
                                    onChange={() => handleCheckboxChange(selectedUser)}
                                />
                                {selectedUser.Låst ? "Låst" : "Olåst"}
                            </label>
                        </div>
                        {editingPassword?.Användarnamn === selectedUser.Användarnamn ? (
                            <form className="flex flex-col gap-3" onSubmit={handlePasswordChange}>
                                <input
                                    type="password"
                                    value={editingPassword?.LösenordHash ?? ''}
                                    onChange={(e) => setEditingPassword({ ...editingPassword, LösenordHash: e.target.value })}
                                />
                                <div className="inline-flex items-center justify-center gap-3">
                                    <button type="submit">Spara</button>
                                    <button onClick={() => {setEditingPassword(null)}}>Avbryt</button>
                                </div>
                                
                            </form> 
                            ) : (
                                <div>
                                    <button onClick={() => handleEdit(selectedUser)}>Redigera lösenord</button>
                                    <button onClick={() => {handleDeleteUser(selectedUser.Användarnamn ?? '')}}>Ta bort användare</button>
                                </div>
                            )}
                    </div>
                ) : (
                    <p>Välj en användare</p>
                )}
            </div>
        </main>
    )
};