import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User, Role } from "../../types/types";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: (username: string, password: string) => Promise<void>;
    handleLogOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren

export default function AuthProvider({children}: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<User | null>();

    async function handleLogin(username: string, password: string) {
        const userData = {
          "användarnamn": username,
          "lösenord": password
        };
        const API_URL = 'http://localhost:5139/api/auth/login'
        try {
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
          const authToken = data.Token;
          const currentUser = { Användarnamn: userData.användarnamn, Roll: Role[data.Roll as keyof typeof Role] } as User
          setAuthToken(authToken);
          setCurrentUser(currentUser);
          // fix so that the role can be used as both number and string (for the menu)
          console.log(currentUser);
        } catch (error) {
          console.error(error);
        }
      }

    const handleLogOut = async () => {
        setAuthToken(null)
        setCurrentUser(null)
    }

    return <AuthContext.Provider value={{authToken, currentUser, handleLogin, handleLogOut}}>
                {children}
            </AuthContext.Provider>
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};
