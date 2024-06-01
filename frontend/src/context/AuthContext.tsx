import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // fetch if users cookies are still valid then skip login
  }, []);

  const login = async (email: string, password: string) => {
    // fetch to login
    const data = await loginUser(email, password);
    if(data){
      setUser({email: data.email, name: data.name});
      setIsLoggedIn(true);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // fetch to signup
  };

  const logout = async () => {
    // fetch to logout
  };

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
