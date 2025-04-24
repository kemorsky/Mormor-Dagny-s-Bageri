import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputPrimary } from "../../components/ui/input";
import { ButtonPrimary } from "../../components/ui/button";
import { forgotPassword } from "../../lib/api";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState<string>('');

  const [message, setMessage] = useState("Mailet skickat. Kontrollera din e-post och följa instruktioner.");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSendPassword = async (email: string) => {
    try {
      await forgotPassword(email);
      setSuccess(true);
      setMessage(message)
      setEmail('')
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <main className="bg-gradient-primary min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-Branding-textAccent text-center">
          Glömde ditt lösenord?
        </h1>
        <p className="text-lg text-center text-Branding-textPrimary">
            Vi löser det direkt.
        </p>
          <InputPrimary
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <div className="flex justify-center">
            <ButtonPrimary onClick={() => {handleSendPassword(email)}}>Skicka påminnelse</ButtonPrimary>
          </div>

          {message && success ? (
            <p className={`text-sm text-center text-green-600`}>
              {message}
            </p>
          ) : null}
        <a
          className="font-inter font-bold text-[1.125rem] leading-[1.375rem] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Gå tillbaka
        </a>
      </div>
    </main>
  );
}