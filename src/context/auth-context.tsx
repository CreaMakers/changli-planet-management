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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getToken = useCallback(() => {
    if (token) {
      return token;
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      return storedToken;
    }
    return null;
  }, [token]);

  const saveToken = useCallback((token: string) => {
    localStorage.setItem("token", token);
  }, []);

  const fetchUser = useCallback(async () => {
    const currentToken = getToken();
    if (!currentToken) {
      setIsLoading(false);
      return;
    }

    const result = await apiRequest<UserInfoResponse>({
      method: "GET",
      path: "/web/users/me",
      token: currentToken,
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
        saveToken(result.data.data.access_token);
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
