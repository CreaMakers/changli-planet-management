"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import {
  ChevronsUpDown,
  KeyRound,
  Laptop,
  LogOut,
  Moon,
  Palette,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const NavUser = () => {
  const { userInfo, isLoading, changePassword } = useAuth();
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { setTheme } = useTheme();

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!userInfo) {
    return null;
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("退出登录成功！");
    router.push("/login");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.new_password !== passwordForm.confirmPassword) {
      toast.error("新密码和确认密码不一致！");
      return;
    }

    if (passwordForm.new_password.length < 6) {
      toast.error("新密码长度至少为6位！");
      return;
    }

    setIsChangingPassword(true);

    try {
      const result = await changePassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password,
      });

      if (result.success) {
        toast.success("密码修改成功！");
        setIsChangePasswordOpen(false);
        setPasswordForm({
          old_password: "",
          new_password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(result.error || "密码修改失败！");
      }
    } catch {
      toast.error("密码修改失败！");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userInfo.data.userProfileResp.avatarUrl || ""}
                  alt={userInfo.data.userResp.username}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInfo.data.userResp.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {userInfo.data.userResp.username}
                </span>
                <span className="truncate text-xs">
                  等级: {userInfo.data.userProfileResp.userLevel}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={userInfo.data.userProfileResp.avatarUrl || ""}
                    alt={userInfo.data.userResp.username}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userInfo.data.userResp.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {userInfo.data.userResp.username}
                  </span>
                  <span className="truncate text-xs">
                    {userInfo.data.userProfileResp.bio || "暂无个人简介"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Dialog
                open={isChangePasswordOpen}
                onOpenChange={setIsChangePasswordOpen}
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <KeyRound />
                    <span>修改密码</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>修改密码</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="old-password">当前密码</Label>
                      <Input
                        id="old-password"
                        type="password"
                        value={passwordForm.old_password}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            old_password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">新密码</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordForm.new_password}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            new_password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">确认新密码</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsChangePasswordOpen(false)}
                      >
                        取消
                      </Button>
                      <Button type="submit" disabled={isChangingPassword}>
                        {isChangingPassword ? "修改中..." : "确认修改"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Palette className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>主题设置</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>浅色模式</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>深色模式</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Laptop className="mr-2 h-4 w-4" />
                      <span>系统模式</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
