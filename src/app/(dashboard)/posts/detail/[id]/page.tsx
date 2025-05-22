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
import { PostResponse } from "@/types/post";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { PostBasicInfo } from "./basic-info";
import { PostInfoSkeleton } from "./skeleton";

const PostInfoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const postId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [post, setPost] = useState<PostResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostInfo = async () => {
      if (!token || isNaN(postId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<PostResponse>({
          method: "GET",
          path: `/web/posts/${postId}`,
          token,
        });

        if (response.success && response.data) {
          setPost(response.data.data);
        } else {
          toast.error(response.error || "获取帖子信息失败");
        }
      } catch (error) {
        console.error("获取帖子详情错误:", error);
        toast.error("获取帖子详情失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostInfo();
  }, [postId, token]);

  if (isNaN(postId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">未找到帖子信息</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/posts">返回帖子列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthLoading || isLoading) {
    return <PostInfoSkeleton />;
  }

  if (!post) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">未找到帖子信息</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/posts">返回帖子列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCategoryText = (category: number) => {
    const categories: Record<number, string> = {
      0: "普通",
      1: "教程",
      2: "文章",
      3: "经验分享",
    };
    return categories[category] || "未知类型";
  };

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="mt-2">
                帖子ID: {postId}
              </CardDescription>
              <div className="mt-2 flex gap-2">
                <Badge>{getCategoryText(post.category)}</Badge>
                {post.isPinned && <Badge variant="secondary">加精</Badge>}
                {post.isDeleted && (
                  <Badge variant="outline" className="text-muted-foreground">
                    已删除
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/posts/detail/${postId}/comments`}>查看评论</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/posts/detail/${postId}/edit`}>编辑</Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <PostBasicInfo post={post} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PostInfoPage;
