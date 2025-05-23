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

const AnnouncementsDetailPage = () => {
  const [announcementId, setAnnouncementId] = useState("");
  const router = useRouter();

  const handleNavigateToDetail = () => {
    if (announcementId.trim()) {
      router.push(`/announcements/detail/${announcementId}`);
    }
  };

  return (
    <div className="container mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>公告详情查询</CardTitle>
          <CardDescription>输入公告ID查看详细信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="announcement-id">公告ID</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="announcement-id"
              placeholder="请输入公告ID"
              value={announcementId}
              onChange={(e) => setAnnouncementId(e.target.value)}
              type="number"
            />
            <Button onClick={handleNavigateToDetail}>查看详情</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          输入ID可直接访问特定公告信息
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnnouncementsDetailPage;
