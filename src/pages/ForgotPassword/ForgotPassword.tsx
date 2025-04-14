import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputPrimary } from "../../components/ui/input";
import { ButtonPrimary } from "../../components/ui/button";

type User = {
  id: number;
  role: string;
  username: string;
  password: string;
};

export default function ResetPasswordPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 0, role: "admin", username: "michael", password: "" },
    { id: 1, role: "Säljare", username: "lisa", password: ""},
    { id: 2, role: "Planerare", username: "kalle", password: ""}
  ]);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      setMessage("Välj en användare.");
      setSuccess(false);
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Lösenord får inte vara tomt.");
      setSuccess(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Lösenorden matchar inte.");
      setSuccess(false);
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === selectedUserId ? { ...user, password: newPassword } : user
    );

    setUsers(updatedUsers);
    setSelectedUserId(null);
    setMessage("Lösenordet har återställts!");
    setSuccess(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  console.log(newPassword);

  return (
    <main className="bg-gradient-primary min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-Branding-textAccent text-center">
          Glömt lösenord
        </h1>
        <p className="text-lg text-center text-Branding-textPrimary">
          Välj användare och ange nytt lösenord.
        </p>

        <select
          value={selectedUserId ?? ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
          className="w-full p-4 border rounded"
        >
          <option value="">-- Välj användare --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <form
          onSubmit={handleResetPassword}
          className="w-full flex flex-col gap-4"
        >
          <InputPrimary
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nytt lösenord"
          />
          <InputPrimary
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Bekräfta lösenord"
          />
          <div className="flex justify-center">
            <ButtonPrimary type="submit">Återställ lösenord</ButtonPrimary>
          </div>
        </form>

        {message && (
          <p className={`text-sm text-center ${success ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

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