import { PropsWithChildren, useState, useEffect } from "react";
import AuthContext from './AuthContext'
import { User } from "../../types/types";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const storedToken = localStorage.getItem("token"); // 
      const storedUser = localStorage.getItem("currentUser");
      if (storedToken) {
          setAuthToken(storedToken);
      };
      if (storedUser) {
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      };
      setIsLoading(false)
  }, []);

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
          if (!response.ok) {
            throw new Error('Något gick snett med POST-förfrågan vi gjorde :(((')
          }
          const data = await response.json();
          console.log(data);
          const authToken = data.Token;
          const currentUser = { Användarnamn: userData.användarnamn, Roll: data.Roll } as User;
          localStorage.setItem("token", authToken);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          setAuthToken(authToken);
          setCurrentUser(currentUser);
          console.log("login successful:", authToken, currentUser);
        } catch (error) {
          console.error(error);
        }
      }

    const handleLogOut = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setAuthToken(null)
        setCurrentUser(null)
    };

    const permissions = {
          canEditOrder: currentUser?.Roll === "Admin" || currentUser?.Roll === "Säljare",
          canDeleteOrder: currentUser?.Roll === "Admin" || currentUser?.Roll === "Planerare",
          canEditDeliveryDate: currentUser?.Roll === "Planerare",
      };


    return <AuthContext.Provider value={{authToken, currentUser, handleLogin, handleLogOut, isLoading, permissions}}>
                {children}
            </AuthContext.Provider>
};
