import { useState } from "react";
import ButtonLogin from "../../components/ui/button";
import InputLogin from "../../components/login-input";

type User = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData = User = {username, password}
    };

    return (
        <main className="flex flex-col items-start justify-start bg-Branding-Primary-primary h-[956px] relative">
            <div className="absolute inset-0 top-[8.125rem]">
                <div className="px-[1.375rem]">
                    <article className="flex flex-col gap-3">
                        <h1 className="font-open-sans font-bold text-[2rem] leading-[2.75rem]">Välkommen!</h1>
                        <p className="w-[19.1875rem] font-open-sans font-semibold text-[1.375rem] leading-[1.875rem]">Logga in för att beställa eller följa dina leveranser</p>
                    </article>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-[392px] flex flex-col items-center justify-center gap-6">
                        <form className="w-full py-2.5 flex flex-col items-center justify-center gap-2.5" onSubmit={handleSubmit} action="submit">
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2 text-[14px] leading-[14px] font-semibold">
                                Användarenamn
                                <InputLogin type="text" 
                                            value={username}
                                            onChange={(e) => {setUsername(e.target.value)}} 
                                />
                            </label>
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2 text-[14px] leading-[14px] font-semibold">
                                Lösenord
                                <InputLogin type="password"
                                            value={password}
                                            onChange={(e) => {setPassword(e.target.value)}} 
                                />
                            </label>
                        </form>
                        <section className="w-full flex flex-col items-center justify-center gap-4">
                            <ButtonLogin type="submit">Logga In</ButtonLogin>
                            <p className="font-semibold text-[1.125rem] leading-[1.375rem]">Glömde lösenordet?</p>
                            <a className="font-bold text-[1.25rem] leading-[1.5rem]"href="">Skicka påmminelse</a>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
};