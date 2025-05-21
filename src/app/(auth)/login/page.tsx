"use client";

import { AuthRedirector } from "@/components/auth-redirector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, fetchUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("请填写用户名和密码");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({ username, password });

      if (result.success) {
        // 登录成功后立即获取用户信息
        await fetchUser();
        toast.success("登录成功！");
        router.push("/dashboard");
      } else {
        toast.error(result.error || "登录失败，请检查用户名和密码");
      }
    } catch (error) {
      toast.error("登录失败，请稍后再试");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AuthRedirector />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="absolute right-4 top-4">
            <ModeToggle />
          </div>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="relative flex flex-col items-center gap-4">
                <Image
                  src="/changli-planet.png"
                  alt="长理星球Logo"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div className="text-center">
                  <CardTitle className="text-2xl">
                    长理星球后台管理系统
                  </CardTitle>
                  <CardDescription>登录</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="username">用户名</Label>
                      <Input
                        id="username"
                        placeholder="请输入用户名"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">密码</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="请输入密码"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "登录中..." : "登录"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
