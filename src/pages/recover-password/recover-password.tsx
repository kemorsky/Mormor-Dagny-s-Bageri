import { useState } from "react"
import ButtonPrimary from "../../components/ui/button"
import InputLogin from "../../components/ui/login-input"

export default function RecoverPassword() {

    const [recoverPassword, setRecoverPassword] = useState('');

    return (
            <main className="bg-gradient-primary h-[59.75rem] relative">
                <div className="absolute inset-0 top-[8.125rem] flex flex-col items-start justify-start gap-6">
                    <div className="px-[1.375rem]">
                        <article className="flex flex-col gap-3">
                            <h1 className="font-open-sans font-bold text-[2rem] leading-[2.75rem] text-Branding-textAccent">Glömde ditt lösenord?</h1>
                            <p className="w-[19.1875rem] font-open-sans font-semibold text-Branding-textPrimary text-[1.375rem] leading-[1.875rem]">Vi löser det direkt.</p>
                        </article>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-[24.5rem] flex flex-col items-center justify-center gap-6">
                            <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">E-mail</span>
                                <InputLogin type="text" 
                                            value={recoverPassword}
                                            onChange={(e) => {setRecoverPassword(e.target.value)}} 
                                />
                            </label>
                            <ButtonPrimary type="submit">Skicka påminnelse</ButtonPrimary>
                        </div>
                    </div>
                </div>
            </main>
        )
    };