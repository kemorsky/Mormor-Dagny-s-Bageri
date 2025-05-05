import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { InputPrimary } from "../../components/ui/input";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { useAuth } from "../../components/auth/AuthContext";
import UserTypes from "../../lib/userTypes";
import { LoginMain, LoginWrapper } from "../../blocks/wrappers";
import { Button } from "../../components/ui/button-shadcn";

export default function LoginPage() {
    const { handleLogin, currentUser } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await handleLogin(username, password);
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            }
        }
    };
    
    useEffect(() => {
        if (currentUser) {
          const userType = UserTypes(currentUser);
          if (userType === 'Säljare') {
            navigate('/seller-dashboard');
          } else if (userType === 'Admin') {
            navigate('/admin-dashboard')
          } else {
            navigate('/planerare-dashboard')
          }
        }
      }, [currentUser, navigate]);

    return (
        <LoginMain>
            <LoginWrapper>
                <div className="w-full">
                    <article className="flex flex-col gap-3">
                        <h1 className="font-open-sans font-bold text-[1.5rem] leading-[2rem] text-Branding-textAccent">Välkommen!</h1>
                        <p className="w-[19.1875rem] font-open-sans font-semibold text-Branding-textPrimary text-[1rem] leading-[1.5rem]">Logga in för att beställa eller följa dina leveranser</p>
                    </article>
                </div>
                <div className="self-center w-[25rem] px-[1.375rem] sm:px-0 flex flex-col items-center justify-center gap-6">
                    <form onSubmit={handleSubmit} className="w-full py-2.5 flex flex-col items-center justify-center gap-2.5" action="submit">
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                            <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Användarnamn</span>
                            <InputPrimary type="text"
                                        placeholder="Användarnamn"
                                        name="username"
                                        value={username}
                                        onChange={(e) => { setUsername(e.target.value) }} 
                            />
                        </label>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2 text-[0.875rem] leading-[0.875rem] font-semibold">
                            <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold">Lösenord</span>
                            <InputPrimary type={showPassword ? "text" : "password"}
                                        placeholder="Lösenord"
                                        name="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                            />
                            {showPassword ? 
                                <PiEyeSlash 
                                    className="absolute cursor-pointer w-7 h-7 text-gray-500 right-10 top-[15.875rem]"
                                    onClick={() => setShowPassword(false)} 
                                /> : 
                                <PiEye 
                                    className="absolute cursor-pointer w-7 h-7 text-gray-500 right-10 top-[15.875rem]"
                                    onClick={() => setShowPassword(true)} 
                                />
                            }
                        </label>
                        {message && (
                            <div className="absolute bottom-[9.55rem] left-3 w-full p-2 text-red-500 rounded text-sm font-medium font-inter">
                                {message}
                            </div>
                        )}
                        <section className="w-full flex flex-col items-center justify-center gap-4 mt-[1.5rem]">
                            <Button type="submit">Logga In</Button>
                            <p className="font-inter font-semibold text-[1rem] leading-[1.375rem]">Glömde lösenordet?</p>
                            <a className="font-inter font-bold text-[1rem] leading-[1.375rem] cursor-pointer" onClick={() => navigate('/forgot-password')}>Återställ lösenord</a>
                        </section>
                    </form>
                </div>
            </LoginWrapper>
        </LoginMain>
    )
};