import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ButtonPrimary } from "../../components/ui/button";
import { InputPrimary } from "../../components/ui/input";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { useAuth } from "../../components/auth/AuthContext";
import UserTypes from "../../lib/userTypes";

export default function LoginPage() {
    const { handleLogin, currentUser } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(username, password);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        if (currentUser) {
          const userType = UserTypes(currentUser);
          if (userType === 'Säljare') {
            navigate('/order');
          } else if (userType === 'Admin') {
            navigate('/admin-dashboard')
          } else {
            console.log("Something broke")
          }
        }
      }, [currentUser, navigate]);

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
                                <InputPrimary type="text"
                                            name="username"
                                            value={username}
                                            onChange={(e) => { setUsername(e.target.value) }} 
                                />
                            </label>
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2 text-[0.875rem] leading-[0.875rem] font-semibold">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold">Lösenord</span>
                                <InputPrimary type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                />
                                {showPassword ? 
                                    <PiEyeSlash 
                                        className="absolute cursor-pointer w-6 h-6 text-gray-500 right-4 top-10"
                                        onClick={() => setShowPassword(false)} 
                                    /> : 
                                    <PiEye 
                                        className="absolute cursor-pointer w-6 h-6 text-gray-500 right-4 top-10"
                                        onClick={() => setShowPassword(true)} 
                                    />
                                }
                            </label>
                            <section className="w-full flex flex-col items-center justify-center gap-4 mt-[1.5rem]">
                                <ButtonPrimary type="submit">Logga In</ButtonPrimary>
                                <p className="font-inter font-semibold text-[1rem] leading-[1.375rem]">Glömde lösenordet?</p>
                                <a className="font-inter font-bold text-[1.125rem] leading-[1.375rem] cursor-pointer" onClick={() => navigate('/recover-password')}>Skicka påmminelse</a>
                        </section>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
};