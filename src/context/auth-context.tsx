"use client";

import { apiRequest } from "@/lib/api";
import { UserInfoResponse, UserLoginResponse } from "@/types/user";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  userInfo: UserInfoResponse | null;
  isLoading: boolean;
  login: (credential: { username: string; password: string }) => Promise<any>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    return token;
  }, []);

  const setToken = useCallback((token: string) => {
    localStorage.setItem("token", token);
  }, []);

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    const result = await apiRequest<UserInfoResponse>({
      method: "GET",
      path: "/web/users/me",
      token,
    });

    if (result.success && result.data) {
      setUserInfo(result.data);
    } else {
      setUserInfo(null);
    }
    setIsLoading(false);
  }, [getToken]);

  const login = useCallback(
    async (credential: { username: string; password: string }) => {
      const result = await apiRequest<UserLoginResponse>({
        method: "POST",
        path: "/web/users/login",
        data: credential,
      });

      if (result.success && result.data) {
        setToken(result.data.data.access_token);
      }

      return result;
    },
    []
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value = {
    userInfo,
    isLoading,
    login,
    fetchUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
