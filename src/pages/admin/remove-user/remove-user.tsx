import { useUser } from "../../../components/auth/UserContext";
import Menu from "../../../elements/menu/menu";
import { deleteUser } from "../../../lib/api";

export default function RemoveUser() {
    const {users, setUsers} = useUser();

    const handleDeleteUser = async (Användarnamn: string) => {
        try {
            await deleteUser(Användarnamn);
            setUsers((prev) => prev?.filter(user => user.Användarnamn !== Användarnamn));
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main>
            <Menu />
            {users ? (
                users.map((user) => (
                    <div key={user.AnvändareId}>
                        <p>{user.Användarnamn}</p>
                        <p>{user.Email}</p>
                        <p>{user.Roll}</p>
                        <p>{user.Låst ? "Locked" : "Unlocked"}</p>
                        <button onClick={() => user.Användarnamn !== undefined && handleDeleteUser(user.Användarnamn)}>Delete</button>
                    </div>
                ))
            ) : (
                <div>Error fetching users</div>
            )}
        </main>
    )
};

