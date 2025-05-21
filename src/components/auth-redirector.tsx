"use client";

import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const AuthRedirector = () => {
  const { userInfo, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && userInfo) {
      toast.info("您已登录，正在重定向...");
      redirect("/dashboard");
    }
  }, [userInfo, isLoading]);

  return <></>;
};

export { AuthRedirector };
