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
import { AnnouncementResponse } from "@/types/announcement";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnnouncementBasicInfo } from "./basic-info";
import { AnnouncementInfoSkeleton } from "./skeleton";

const AnnouncementInfoPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const announcementId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [announcement, setAnnouncement] = useState<
    AnnouncementResponse["data"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncementInfo = async () => {
      if (!token || isNaN(announcementId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<AnnouncementResponse>({
          method: "GET",
          path: `/web/announcements/${announcementId}`,
          token,
        });

        if (response.success && response.data) {
          setAnnouncement(response.data.data);
        } else {
          toast.error(response.error || "获取公告信息失败");
        }
      } catch (error) {
        console.error("获取公告详情错误:", error);
        toast.error("获取公告详情失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncementInfo();
  }, [announcementId, token]);

  if (isNaN(announcementId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">未找到公告信息</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/announcements">返回公告列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthLoading || isLoading) {
    return <AnnouncementInfoSkeleton />;
  }

  if (!announcement) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">未找到公告信息</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/announcements">返回公告列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{announcement.title}</CardTitle>
              <CardDescription className="mt-2">
                公告ID: {announcementId}
              </CardDescription>
              <div className="mt-2 flex gap-2">
                {announcement.isPinned && (
                  <Badge variant="secondary">置顶</Badge>
                )}
                {announcement.isDeleted && (
                  <Badge variant="outline" className="text-muted-foreground">
                    已删除
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/announcements/detail/${announcementId}/edit`}>
                  编辑
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <AnnouncementBasicInfo announcement={announcement} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementInfoPage;
