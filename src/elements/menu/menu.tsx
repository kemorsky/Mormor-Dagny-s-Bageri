import { useState } from "react"
export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="w-full inline-flex items-start justify-between">
            <nav onClick={handleClick} className="inline-flex flex-col items-start justify-center relative transition-all cursor-pointer">
                <div className="inline-flex items-center justify-start gap-2">
                    <section className="h-10 w-10 bg-blue-200 rounded-full inline-flex items-center justify-center overflow-hidden">
                        <img src={"/profile-picture.jpg"} alt="profile picture" className="w-full h-full" />
                    </section>
                    <article className="inline-flex flex-col gap-1">
                        <p className="text-[1rem] leading-[1.1875rem] text-Branding-textPrimary font-inter font-semibold">Regina</p>
                        <p className="text-[1rem] leading-[1.1875rem] text-Branding-textSecondary font-inter">Säljare</p>
                    </article>
                </div>
                {isOpen ? 
                    <ul className="z-50 absolute top-[2.875rem] bg-black rounded-[0.375rem] divide-y-2 divide-gray-500 divide-solid">

                        <li className="flex items-center w-[11.875rem] px-1 h-[1.875rem]">
                            <a href="" className="text-[1rem] leading-[1.1875rem] font-inter font-semibold text-Branding-textPrimary">Profil</a>
                        </li>
                        <li className="flex items-center bg-black w-[11.875rem] px-1 h-[1.875rem]">
                            <a href="" className="text-[1rem] leading-[1.1875rem] font-inter font-semibold text-Branding-textPrimary">Byta lösenord</a>
                        </li>
                        <li className="flex items-center bg-black w-[11.875rem] px-1 h-[1.875rem]">
                            <a href="" className="text-[1rem] leading-[1.1875rem] font-inter font-semibold text-Branding-textPrimary">Inställningar</a>
                        </li>
                    </ul>
                    : null}
            </nav>
            <section className="inline-flex items-center justify-between gap-4">
                <a className="text-Branding-textPrimary text-[1rem] leading-[1.1875rem] font-inter font-semibold" href="/dashboard">Hem</a>
                <a className="text-Branding-textPrimary text-[1rem] leading-[1.1875rem] font-inter font-semibold" href="/deliveries">Leverans</a>
                <a className="text-Branding-textPrimary text-[1rem] leading-[1.1875rem] font-inter font-semibold" href="/order">Ny Beställning</a>
            </section>
        </header> 
    )
}