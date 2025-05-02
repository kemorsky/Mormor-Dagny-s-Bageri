import { useState } from "react";
import { resetPassword } from "../../lib/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { InputPrimary } from "../../components/ui/input";
import { Button } from "../../components/ui/button-shadcn";
import { LoginMain, LoginWrapper } from "../../blocks/wrappers";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const token = searchParams.get('token')
    const username = searchParams.get('username')

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== newPassword) {
            setMessage('Fel vid bekfräftning av lösenordet. Kontrollera att de matchar och prova igen.');
            return;
        }
        if (!token || !username) {
            setMessage("Ogiltig eller saknad token eller användarnamn.");
            return;
          }
        try {
            const response = await resetPassword(username, newPassword, token)
            if (response) {
                setSuccess(true)
                setMessage("Lösenordet har återställts.");
                setTimeout(() => navigate("/"), 3000);
            } else {
                setMessage("Ogiltig eller saknande token.");
            }

        } catch (error) {
            if (error instanceof Error) {
              setMessage(error.message);
            }
        }
    }

    return (
      <LoginMain>
        <LoginWrapper>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 max-w-md w-full">
              <h1 className="self-start font-open-sans font-bold text-[1.5rem] leading-[2rem] text-Branding-textAccent">Återställ ditt lösenord</h1>      
              <InputPrimary
                type="password"
                placeholder="Nytt lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputPrimary
                type="password"
                placeholder="Bekräfta lösenord"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
      
              <Button type="submit">Uppdatera lösenord</Button>
      
              {message && (
                <p className={`text-left text-sm ${success ? "text-green-600" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </form>
          </LoginWrapper>
        </LoginMain>
      );
};