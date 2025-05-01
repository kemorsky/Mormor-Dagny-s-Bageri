import { useState } from "react";
import { resetPassword } from "../../lib/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { InputPrimary } from "../../components/ui/input";
import { Button } from "../../components/ui/button-shadcn";

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
            setMessage('Passwords do not match')
            return;
        }
        if (!token || !username) {
            setMessage("Ogiltig eller saknad token eller användarnamn.");
            return;
          }
        try {
            const response = await resetPassword(username, newPassword, token)
            if (response) {
                setMessage("Lösenordet har återställts!");
                setSuccess(true)
                setTimeout(() => navigate("/"), 3000);
            } else {
                setMessage("Ogiltig eller saknad token.");
            }

        } catch (error) {
            setMessage("Något gick fel.");
            console.error("Error resetting password:", error);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-primary px-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center">Återställ lösenord</h2>
    
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
              <p className={`text-center text-sm ${success ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </main>
      );
};