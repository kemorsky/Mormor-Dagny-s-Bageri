import { useState } from "react";
import { useNavigate } from "react-router";
import ButtonPrimary from "../../components/ui/button";
import InputLogin from "../../components/ui/login-input";

import { PiEye, PiEyeSlash } from "react-icons/pi";

type User = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData: User = {username, password}
        const API_URL = 'http://localhost:5139/api/auth/login'
        try {
            console.log(userData);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Något gick snett med POST-förfrågan vi gjorde :(((')
            }
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.token);
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="bg-gradient-primary min-h-[59.75rem] relative">
            <div className="absolute inset-0 top-[8.125rem] flex flex-col items-start justify-start gap-6">
                <div className="px-[1.375rem]">
                    <article className="flex flex-col gap-3">
                        <h1 className="font-open-sans font-bold text-[2rem] leading-[2.75rem] text-Branding-textAccent">Välkommen!</h1>
                        <p className="w-[19.1875rem] font-open-sans font-semibold text-Branding-textPrimary text-[1.375rem] leading-[1.875rem]">Logga in för att beställa eller följa dina leveranser</p>
                    </article>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-[24.5rem] flex flex-col items-center justify-center gap-6">
                        <form onSubmit={handleSubmit} className="w-full py-2.5 flex flex-col items-center justify-center gap-2.5" action="submit">
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Användarenamn</span>
                                <InputLogin type="text" 
                                            value={username}
                                            onChange={(e) => {setUsername(e.target.value)}} 
                                />
                            </label>
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2 text-[0.875rem] leading-[0.875rem] font-semibold">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold">Lösenord</span>
                                <InputLogin type="password"
                                            value={password}
                                            onChange={(e) => {setPassword(e.target.value)}}
                                            
                                /><PiEye className="absolute fill-white/75 w-6 h-6 inset-0 top-[16.875rem] left-[23.125rem]"/>
                            </label>
                            <ButtonPrimary type="submit">Logga In</ButtonPrimary>

                        </form>
                        <section className="w-full flex flex-col items-center justify-center gap-4">
                            <p className="font-inter font-semibold text-[1rem] leading-[1.375rem]">Glömde lösenordet?</p>
                            <a className="font-inter font-bold text-[1.125rem] leading-[1.375rem] cursor-pointer" onClick={() => navigate('/recover-password')}>Skicka påmminelse</a>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
};