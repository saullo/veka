"use client";

import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { Token, TokenCreateResponse } from "./token.type";
import { User } from "./user.type";

interface AccountContext {
  user: User | undefined;
  token: Token | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

export const useAccount = () => useContext(AccountContext);

export const AccountContext = createContext<AccountContext>({
  user: undefined,
  token: undefined,
  login: async () => false,
  logout: async () => false,
  register: async () => false,
});

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<Token | undefined>(undefined);

  const getLocalToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return undefined;
    }
    return JSON.parse(token) as Token;
  };

  const setLocalToken = (token: Token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  };

  useEffect(() => {
    const localToken = getLocalToken();
    if (!localToken) {
      return;
    }

    const fetchUser = async () => {
      const request = await fetch("/api/user", {
        mode: "same-origin",
        credentials: "same-origin",
        cache: "default",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localToken.access_token,
        },
      });

      return request.json();
    };

    fetchUser().then((response) => {
      setUser(response);
      setToken(localToken);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const data = { email, password };
    const request = await fetch("/api/token", {
      mode: "same-origin",
      credentials: "same-origin",
      cache: "default",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response: TokenCreateResponse = await request.json();

      setUser(response.user);
      setLocalToken(response.token);
    }

    return request.ok;
  };

  const logout = async () => {
    const request = await fetch("/api/token", {
      mode: "same-origin",
      credentials: "same-origin",
      cache: "default",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return request.ok;
  };

  const register = async (name: string, email: string, password: string) => {
    const data = { name, email, password };
    const request = await fetch("/api/user", {
      mode: "same-origin",
      credentials: "same-origin",
      cache: "default",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return request.ok ? await login(email, password) : false;
  };

  return (
    <AccountContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AccountContext.Provider>
  );
};
