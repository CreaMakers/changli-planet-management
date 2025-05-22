"use client";

import { CommonPagination } from "@/components/common-pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { PostsResponse } from "@/types/post";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PostFilters } from "./filters";
import { PostsPageSkeleton } from "./skeleton";
import { PostsTable } from "./table";

const PostsListPage = () => {
  const [posts, setPosts] = useState<PostsResponse["data"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, isLoading: authLoading } = useAuth();
  const [postCount, setPostCount] = useState<number>(20); // 暂时固定为20

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(2);

  useEffect(() => {
    setTotalPages(Math.ceil(postCount / pageSize));
  }, [postCount, pageSize]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) return;

      setIsLoading(true);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage.toString());
        queryParams.append("pageSize", pageSize.toString());

        const result = await apiRequest<PostsResponse>({
          method: "GET",
          path: `/web/posts?${queryParams.toString()}`,
          token,
        });

        if (result.success && result.data) {
          setPosts(result.data.data);
        } else {
          toast.error("获取帖子列表失败");
        }
      } catch (err) {
        toast.error("请求失败，请重试");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, pageSize, token]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  if (authLoading || isLoading) {
    return <PostsPageSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>帖子管理</CardTitle>
          <CardDescription>系统总共有 {postCount} 条帖子</CardDescription>
        </CardHeader>

        <div className="px-6 pb-2">
          <PostFilters
            pageSize={pageSize}
            setPageSize={handlePageSizeChange}
            isLoading={isLoading}
          />
        </div>

        <CardContent>
          <PostsTable
            posts={posts}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostsListPage;
