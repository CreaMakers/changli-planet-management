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

const PostsPage = () => {
  const [postId, setPostId] = useState("");
  const router = useRouter();

  const handleNavigateToList = () => {
    router.push("/posts/list");
  };

  const handleNavigateToDetail = () => {
    if (postId.trim()) {
      router.push(`/posts/detail/${postId}`);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>帖子列表</CardTitle>
            <CardDescription>查看系统中的所有帖子</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleNavigateToList}
              className="w-full"
              variant="outline"
            >
              查看所有帖子
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>帖子详情</CardTitle>
            <CardDescription>查看特定帖子的详细信息</CardDescription>
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
    </div>
  );
};

export default PostsPage;
