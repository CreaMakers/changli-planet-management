"use client";

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
import { ViolationsResponse } from "@/types/violation";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserViolationsSkeleton } from "./skeleton";
import { UserViolationsTable } from "./table";

const UserViolationsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const userId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [violations, setViolations] = useState<ViolationsResponse["data"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserViolations = async () => {
      if (!token || isNaN(userId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<ViolationsResponse>({
          method: "GET",
          path: `/web/users/${userId}/violations`,
          token,
        });

        if (response.success && response.data) {
          setViolations(response.data.data);
        } else {
          toast.error(response.error || "获取用户违规记录失败");
        }
      } catch (error) {
        console.error("获取用户违规记录错误:", error);
        toast.error("获取用户违规记录失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserViolations();
  }, [userId, token]);

  if (isNaN(userId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">无效的用户ID</div>
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
    return <UserViolationsSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>用户违规记录</CardTitle>
              <CardDescription className="mt-2">
                用户ID: {userId}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/users/detail/${userId}`}>返回用户详情</Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {violations.length > 0 ? (
            <UserViolationsTable violations={violations} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              该用户暂无违规记录
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserViolationsPage;
