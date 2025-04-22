import Menu from "../../../elements/menu/menu";
import { User } from '../../../types/types'
import { editUser, editUserPassword } from "../../../lib/api";
import { useUser } from "../../../components/auth/UserContext";
import { useState } from "react";

export default function EditUser() {
    const {users, setUsers} = useUser();

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
        } catch (error) {
            console.log("Failed to update user:", error);
        } 
    };

    const handleEdit = (user: User) => {
            console.log(user)
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

    return (
        <main className="flex flex-col items-center justify-center gap-4">
            <Menu />
            {users ? (
                users.map((user) => (
                    <div key={user.AnvändareId}>
                        <p>{user.Användarnamn}</p>
                        <p>{user.Email}</p>
                        <p>{user.Roll}</p>
                        <label className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={user.Låst ?? false}
                                disabled={lockedUser === user.Användarnamn}
                                onChange={() => handleCheckboxChange(user)}
                            />
                            {user.Låst ? "Locked" : "Unlocked"}
                        </label>
                        {editingPassword?.Användarnamn === user.Användarnamn ? (
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
                                <button onClick={() => handleEdit(user)}>Redigera lösenord</button>
                            )}
                    </div>
                ))
            ) : (
                <div>Error fetching users</div>
            )}
        </main>
    )
};