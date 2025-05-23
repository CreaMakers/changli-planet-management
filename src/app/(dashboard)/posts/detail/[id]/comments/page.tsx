"use client";

import { CommonPagination } from "@/components/common-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { CommentResp, CommentsResponse } from "@/types/post";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CommentItem } from "./comment-item";
import { CommentsListSkeleton } from "./skeleton";

const CommentsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const postId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [comments, setComments] = useState<CommentResp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAndSetComments = useCallback(
    async (currentPage: number, currentSearchKeyword: string) => {
      if (!token || isNaN(postId)) return;
      setIsLoading(true);

      try {
        let path: string;
        const queryParams = `page=${currentPage}&limit=${limit}`;

        if (currentSearchKeyword) {
          path = `/web/posts/${postId}/comments/search?keyword=${encodeURIComponent(
            currentSearchKeyword
          )}&${queryParams}`;
        } else {
          path = `/web/posts/${postId}/comments?${queryParams}`;
        }

        const response = await apiRequest<CommentsResponse>({
          method: "GET",
          path,
          token,
        });

        if (response.success && response.data) {
          setComments(response.data.data);
          setTotalPages(Math.ceil(totalCount / limit));
        } else {
          toast.error(
            response.error ||
              (currentSearchKeyword ? "搜索评论失败" : "获取评论失败")
          );
          setComments([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error(
          currentSearchKeyword ? "搜索评论错误:" : "获取评论错误:",
          error
        );
        toast.error(currentSearchKeyword ? "搜索评论失败" : "获取评论列表失败");
        setComments([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [token, postId, limit, totalCount]
  );

  useEffect(() => {
    if (token && !isNaN(postId)) {
      fetchAndSetComments(page, searchKeyword);
    }
  }, [postId, token, page, searchKeyword, fetchAndSetComments]);

  const handleSearch = () => {
    setPage(1);
    setSearchKeyword(keyword);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteComment = async (commentIdToDelete: number) => {
    if (!token || isNaN(postId)) {
      toast.error("无法删除评论：认证信息无效");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest({
        method: "DELETE",
        path: `/web/posts/${postId}/comments/${commentIdToDelete}`,
        token,
        expectedStatus: [200],
      });

      if (response.success) {
        toast.success("评论删除成功");

        const newTotalCount = Math.max(0, totalCount - 1);

        const parentCommentsOnPage = comments.filter(
          (c) => c.parentCommentId === null
        );
        const isDeletingLastParentOnCurrentPage =
          parentCommentsOnPage.length === 1 &&
          parentCommentsOnPage[0].commentId === commentIdToDelete &&
          page > 1;

        if (isDeletingLastParentOnCurrentPage) {
          setPage((prevPage) => Math.max(1, prevPage - 1));
        }

        setTotalCount(newTotalCount);
      } else {
        toast.error(response.error || "删除评论失败");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("删除评论错误:", error);
      toast.error("删除评论失败");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>
              帖子评论 ({searchKeyword ? totalCount : comments.length})
            </CardTitle>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="搜索评论内容"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full md:w-64"
              />
              <Button onClick={handleSearch} type="button">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {parentComments.length > 0 ? (
            <div className="space-y-6">
              {parentComments.map((comment) => (
                <CommentItem
                  key={comment.commentId}
                  comment={comment}
                  replies={replyMap[comment.commentId] || []}
                  onDeleteComment={handleDeleteComment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchKeyword ? "没有找到匹配的评论" : "该帖子暂无评论"}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <CommonPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsPage;
