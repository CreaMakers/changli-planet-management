"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UsersPage = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleNavigateToList = () => {
    router.push("/users/list");
  };

  const handleNavigateToDetail = () => {
    if (userId.trim()) {
      router.push(`/users/detail/${userId}`);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
            <CardDescription>查看系统中的所有用户</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleNavigateToList}
              className="w-full"
              variant="outline"
            >
              查看所有用户
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>用户详情</CardTitle>
            <CardDescription>查看特定用户的详细信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="user-id">用户ID</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="user-id"
                placeholder="请输入用户ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="number"
              />
              <Button onClick={handleNavigateToDetail}>查看详情</Button>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            输入ID可直接访问特定用户信息
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;
