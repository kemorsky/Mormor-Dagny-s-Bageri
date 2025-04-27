import { useState, useEffect } from "react"
import { User } from "../../types/types"
import { getUser } from "../../lib/api"
import Menu from "../../elements/menu/menu"
import { AdminUserCard, AdminUserCardContent } from "../../blocks/admin-cards"

export default function Profile() {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const user = await getUser();
                setUser(user)
            } catch (error) {
                console.log("Error fetching user info", error)
            }
        }
        getUserInfo();
    }, [])

    if (!user) {return <div>Loading</div>}

    return (
         <main className="w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4">
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <AdminUserCard>
                    <AdminUserCardContent className="">
                        <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
                            <p className="w-24 h-3.5 justify-start text-white text-sm font-semibold font-inter">Användarnamn</p>
                            <p className="self-stretch justify-start text-Branding-textSecondary text-lg font-inter">{user.Användarnamn}</p>
                        </div>
                        <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
                            <p className="w-24 h-3.5 justify-start text-white text-sm font-semibold font-inter">Email</p>
                            <p className="self-stretch justify-start text-Branding-textSecondary text-lg font-inter">{user.Email}</p>
                        </div>
                        <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
                            <p className="w-24 h-3.5 justify-start text-white text-sm font-semibold font-inter">Roll</p>
                            <p className="self-stretch justify-start text-Branding-textSecondary text-lg font-inter">{user.Roll}</p>
                        </div>
                    </AdminUserCardContent>
                </AdminUserCard>
                
            </div>
         </main>
    )
};