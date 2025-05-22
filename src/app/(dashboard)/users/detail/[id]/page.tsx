"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { UserInfoResponse } from "@/types/user";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserBasicInfo } from "./basic-info";
import { UserProfile } from "./profile";
import { UserInfoSkeleton } from "./skeleton";
import { UserStats } from "./stats";

const UserInfoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const userId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfoResponse["data"] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token || isNaN(userId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<UserInfoResponse>({
          method: "GET",
          path: `/web/users/${userId}`,
          token,
        });

        if (response.success && response.data) {
          setUserInfo(response.data.data);
        } else {
          toast.error(response.error || "获取用户信息失败");
        }
      } catch (error) {
        console.error("获取用户详情错误:", error);
        toast.error("获取用户详情失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  if (isNaN(userId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">未找到用户信息</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/users">返回用户列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthLoading || isLoading) {
    return <UserInfoSkeleton />;
  }

  if (!userInfo) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">未找到用户信息</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/users">返回用户列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { userResp, userProfileResp, userStatsResp } = userInfo;

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>用户详情</CardTitle>
              <CardDescription className="mt-2">
                用户ID: {userId}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {userResp.isAdmin === 1 && (
                <Badge variant="secondary">运营组</Badge>
              )}
              {userResp.isAdmin === 2 && (
                <Badge variant="outline">开发组</Badge>
              )}
              {userResp.isBanned && <Badge variant="destructive">已封禁</Badge>}
              {userResp.isDeleted && (
                <Badge variant="outline" className="text-muted-foreground">
                  已删除
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <UserBasicInfo
            userResp={userResp}
            userProfileResp={userProfileResp}
            userStatsResp={userStatsResp}
          />
          <UserProfile userProfileResp={userProfileResp} />
          <UserStats userStatsResp={userStatsResp} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfoPage;
