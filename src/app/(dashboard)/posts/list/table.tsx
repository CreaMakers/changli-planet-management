"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostResp } from "@/types/post";
import Link from "next/link";

interface PostsTableProps {
  posts: PostResp[];
  currentPage: number;
  totalPages: number;
}

// 帖子类别映射
const categoryMap: Record<number, string> = {
  0: "普通",
  1: "教程",
  2: "文章",
  3: "经验",
};

export function PostsTable({
  posts,
  currentPage,
  totalPages,
}: PostsTableProps) {
  return (
    <Table>
      <TableCaption>
        <div className="flex items-center gap-2 text-sm text-muted-foreground w-full justify-center">
          第 {currentPage} 页，共 {totalPages} 页
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>标题</TableHead>
          <TableHead>所属群组</TableHead>
          <TableHead>类别</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>数据</TableHead>
          <TableHead>发布时间</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={8}
              className="text-center py-6 text-muted-foreground"
            >
              暂无帖子数据
            </TableCell>
          </TableRow>
        ) : (
          posts.map((post) => (
            <TableRow key={post.postId}>
              <TableCell>{post.postId}</TableCell>
              <TableCell>
                <div
                  className="font-medium truncate max-w-xs"
                  title={post.title}
                >
                  {post.title}
                </div>
                <div
                  className="text-xs text-muted-foreground truncate max-w-xs"
                  title={post.description}
                >
                  {post.description}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{post.groupId || "系统"}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {categoryMap[post.category] || "未知"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {post.isPinned && <Badge variant="default">精选</Badge>}
                  {post.isDeleted && (
                    <Badge variant="destructive">已删除</Badge>
                  )}
                  {!post.isPinned && !post.isDeleted && (
                    <Badge variant="outline">普通</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs space-y-1">
                  <div>浏览: {post.viewCount}</div>
                  <div>投币: {post.coinCount}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  {new Date(post.createTime).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/posts/detail/${post.postId}`}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    查看详情
                  </Link>
                  <Link
                    href={`/posts/detail/${post.postId}/comments`}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    查看评论
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
