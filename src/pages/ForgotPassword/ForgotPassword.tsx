import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputPrimary } from "../../components/ui/input";
import { forgotPassword } from "../../lib/api";
import { LoginMain, LoginWrapper } from "../../blocks/wrappers";
import { Button } from "../../components/ui/button-shadcn";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState<string>('');

  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSendPassword = async (email: string) => {
    try {
      await forgotPassword(email);
      setSuccess(true);
      setMessage("Mailet skickat. Kontrollera din e-post och följa instruktioner.")
      setEmail('')
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <LoginMain>
      <LoginWrapper className="items-center w-[25rem] px-[1.375rem]">
        <article className="self-start flex flex-col gap-3">
            <h1 className="font-open-sans font-bold text-[1.5rem] leading-[2rem] text-Branding-textAccent">Glömde ditt lösenord?</h1>
            <p className="w-[19.1875rem] font-open-sans font-semibold text-Branding-textPrimary text-[1rem] leading-[1.5rem]">Vi löser det direkt.</p>
        </article>
        <section className="w-full space-y-6">     
          <InputPrimary
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <div className="w-full inline-flex flex-col items-center justify-center gap-4">
            <Button onClick={() => {handleSendPassword(email)}}>Skicka påminnelse</Button>
            <a
              className="font-inter font-bold text-[1rem] leading-[1.375rem] cursor-pointer"
              onClick={() => navigate("/")}>
              Gå tillbaka
            </a>
          </div>
        </section>
        {message && success ? (
            <p className={`text-sm text-center font-inter text-green-600`}>
              {message}
            </p>
            ) : 
            <p className={`text-sm text-center font-inter text-red-500`}>
              {message}
            </p>}
          
      </LoginWrapper>
  </LoginMain>
  );
}