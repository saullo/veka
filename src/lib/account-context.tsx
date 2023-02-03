"use client";

import { useState, useContext, createContext, ReactNode } from "react";

export const useAccount = () => useContext(AccountContext);

export const AccountContext = createContext({
  user: null,
  login: async (email: string, password: string) => false,
  logout: async () => false,
  register: async (name: string, email: string, password: string) => false,
});

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

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
    <AccountContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AccountContext.Provider>
  );
};
