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

const PostsDetailPage = () => {
  const [postId, setPostId] = useState("");
  const router = useRouter();

  const handleNavigateToDetail = () => {
    if (postId.trim()) {
      router.push(`/posts/detail/${postId}`);
    }
  };

  const handleNavigateToList = () => {
    router.push("/posts/list");
  };

  return (
    <div className="container mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>帖子详情查询</CardTitle>
          <CardDescription>输入帖子ID查看详细信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="post-id">帖子ID</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="post-id"
              placeholder="请输入帖子ID"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              type="number"
            />
            <Button onClick={handleNavigateToDetail}>查看详情</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          输入ID可直接访问特定帖子信息
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostsDetailPage;
