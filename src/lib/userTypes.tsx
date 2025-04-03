import { Role, User } from "../types/types";

export default function UserTypes(currentUser: User): Role | string {
    const rollValue = currentUser.Roll
    if (typeof rollValue === 'number') {
        return Role[rollValue]
    } else {
        return rollValue
    }
}