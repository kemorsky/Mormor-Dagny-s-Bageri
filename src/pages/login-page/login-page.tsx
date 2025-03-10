import { useState } from "react";
import { useNavigate } from "react-router";
import ButtonLogin from "../../components/ui/button";
import InputLogin from "../../components/ui/login-input";

import { PiEye, PiEyeSlash } from "react-icons/pi";

type User = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData = User = {username, password}
        navigate('/dashboard')
    };

    return (
        <main className="bg-gradient-primary h-[956px] relative">
            <div className="absolute inset-0 top-[8.125rem] flex flex-col items-start justify-start gap-6">
                <div className="px-[1.375rem]">
                    <article className="flex flex-col gap-3">
                        <h1 className="font-open-sans font-bold text-[2rem] leading-[2.75rem] text-Branding-textAccent">Välkommen!</h1>
                        <p className="w-[19.1875rem] font-open-sans font-semibold text-[1.375rem] leading-[1.875rem]">Logga in för att beställa eller följa dina leveranser</p>
                    </article>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-[392px] flex flex-col items-center justify-center gap-6">
                        <form className="w-full py-2.5 flex flex-col items-center justify-center gap-2.5" onSubmit={handleSubmit} action="submit">
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[14px] leading-[14px] font-inter font-semibold">Användarenamn</span>
                                <InputLogin type="text" 
                                            value={username}
                                            onChange={(e) => {setUsername(e.target.value)}} 
                                />
                            </label>
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2 text-[14px] leading-[14px] font-semibold">
                                <span className="text-[14px] leading-[14px] font-inter font-semibold">Lösenord</span>
                                <PiEye className="absolute w-6 h-6 inset-0 top-[9.5px] left-[340px]"/>
                                <InputLogin type="password"
                                            value={password}
                                            onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </label>
                        </form>
                        <section className="w-full flex flex-col items-center justify-center gap-4">
                            <ButtonLogin type="submit">Logga In</ButtonLogin>
                            <p className="font-inter font-semibold text-[1rem] leading-[1.375rem]">Glömde lösenordet?</p>
                            <a className="font-inter font-bold text-[1.125rem] leading-[1.375rem] cursor-pointer" onClick={() => navigate('/recover-password')}>Skicka påmminelse</a>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
};