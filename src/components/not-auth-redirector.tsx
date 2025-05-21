"use client";

import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const NotAuthRedirector = () => {
  const { userInfo, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !userInfo) {
      toast.info("您未登录，正在重定向...");
      redirect("/login");
    }
  }, [userInfo, isLoading]);

  return <></>;
};

export { NotAuthRedirector };
