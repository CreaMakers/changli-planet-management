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

const UsersViolationsPage = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleNavigateToViolations = () => {
    if (userId.trim()) {
      router.push(`/users/violations/${userId}`);
    }
  };

  const handleNavigateToList = () => {
    router.push("/users/list");
  };

  return (
    <div className="container mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>用户违规查询</CardTitle>
          <CardDescription>输入用户ID查看违规记录</CardDescription>
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
            <Button onClick={handleNavigateToViolations}>查看违规记录</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          输入ID可直接访问特定用户的违规记录
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersViolationsPage;
