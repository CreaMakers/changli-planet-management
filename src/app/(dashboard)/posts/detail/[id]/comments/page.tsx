"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { CommentResp, CommentsResponse } from "@/types/post";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { CommentItem } from "./comment-item";
import { CommentsListSkeleton } from "./skeleton";

const CommentsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const postId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [comments, setComments] = useState<CommentResp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!token || isNaN(postId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<CommentsResponse>({
          method: "GET",
          path: `/web/posts/${postId}/comments`,
          token,
        });

        if (response.success && response.data) {
          setComments(response.data.data);
        } else {
          toast.error(response.error || "获取评论失败");
        }
      } catch (error) {
        console.error("获取评论错误:", error);
        toast.error("获取评论列表失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId, token]);

  if (isNaN(postId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">无效的帖子ID</div>
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
    return <CommentsListSkeleton />;
  }

  const parentComments: CommentResp[] = [];
  const replyMap: Record<number, CommentResp[]> = {};

  comments.forEach((comment) => {
    if (comment.parentCommentId === null) {
      parentComments.push(comment);
    } else {
      if (!replyMap[comment.parentCommentId]) {
        replyMap[comment.parentCommentId] = [];
      }
      replyMap[comment.parentCommentId].push(comment);
    }
  });

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/posts/detail/${postId}`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回帖子详情
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>帖子评论 ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {parentComments.length > 0 ? (
            <div className="space-y-6">
              {parentComments.map((comment) => (
                <CommentItem
                  key={comment.commentId}
                  comment={comment}
                  replies={replyMap[comment.commentId] || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              该帖子暂无评论
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsPage;
