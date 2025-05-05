import { useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../../components/auth/AuthContext";
import { CircleUserRound } from 'lucide-react'
export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, handleLogOut } = useAuth();

    const navigate = useNavigate();
    
    const userName = currentUser?.Användarnamn;
    const userType = currentUser?.Roll;

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigateHome = () => {
        if (userType === "Admin") {
            navigate("/admin-dashboard");
        } else if (userType === "Säljare") {
            navigate("/seller-dashboard");
        } else {
            navigate("/planerare-dashboard")
        }
    };

    return (
        <header className="max-w-[60rem] w-full inline-flex items-start justify-between">
            <nav onClick={handleClick} className=" inline-flex flex-col items-start justify-center relative transition-all cursor-pointer ">
                <div className="group w-full inline-flex items-center justify-start gap-2 hover:bg-Branding-cardPrimary rounded-xl sm:px-2 sm:py-1">
                    <section className="h-10 w-10 rounded-full bg-sky-700 inline-flex items-center justify-center overflow-hidden">
                        <CircleUserRound className="object-fill w-10 h-10 stroke-white stroke-1"/>
                        {/* <img src={"/profile-picture.jpg"} alt="profile picture" className="w-full h-full" /> */}
                    </section>
                    <article className="inline-flex flex-col gap-1 font-DMSans">
                        <p className="text-[1rem] leading-[1.1875rem] text-Branding-textPrimary group-hover:text-Branding-textAccent font-semibold">
                            {userName}
                        </p>
                        <p className="text-[1rem] leading-[1.1875rem] text-Branding-textSecondary">
                            {userType}
                        </p>
                    </article>
                </div>
                {isOpen ? 
                    <ul className="w-full z-50 absolute top-[3.175rem] font-DMSans font-semibold text-[1rem] leading-[1.1875rem] bg-Branding-cardPrimary rounded-lg">
                        <a href="/me" className="w-full rounded-lg text-Branding-textPrimary hover:text-Branding-textAccent">
                            <span className="h-[2.625rem] flex items-center p-2">
                                Profil
                            </span>
                        </a>
                        <hr className="border-gray-500"/>
                        <a className="w-full text-Branding-textPrimary hover:text-Branding-textAccent "
                            onClick={async () => {
                                await handleLogOut();
                                navigate('/')}}>
                            <span className="flex items-center p-2 h-[2.625rem]">Logga ut</span>
                        </a>
                    </ul>
                    : null}
            </nav>
            <section className="inline-flex items-center justify-center gap-3">
                <a className="text-Branding-textPrimary hover:text-Branding-textAccent text-[1rem] leading-[1.1875rem] sm:px-2 sm:py-1 px-1 rounded-lg font-DMSans font-semibold hover:bg-Branding-cardPrimary cursor-pointer" onClick={handleNavigateHome}>Hem</a>
                <a className="text-Branding-textPrimary hover:text-Branding-textAccent text-[1rem] leading-[1.1875rem] sm:px-2 sm:py-1 px-1 rounded-lg font-DMSans font-semibold hover:bg-Branding-cardPrimary" href="/orders" >Leverans</a>
                {userType !== "Planerare" && (
                    <a className="text-Branding-textPrimary hover:text-Branding-textAccent text-[1rem] leading-[1.1875rem] sm:px-2 sm:py-1 px-1 rounded-lg  font-DMSans font-semibold hover:bg-Branding-cardPrimary" href="/order">Ny Beställning</a>
                )}
            </section>
        </header> 
    )
}