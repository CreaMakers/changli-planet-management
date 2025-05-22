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
import { AnnouncementsResponse } from "@/types/announcement";
import Link from "next/link";

interface AnnouncementsTableProps {
  announcements: AnnouncementsResponse["data"];
  currentPage: number;
  totalPages: number;
}

export function AnnouncementsTable({
  announcements,
  currentPage,
  totalPages,
}: AnnouncementsTableProps) {
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
          <TableHead>状态</TableHead>
          <TableHead>发布用户</TableHead>
          <TableHead>发布时间</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center py-6 text-muted-foreground"
            >
              暂无公告数据
            </TableCell>
          </TableRow>
        ) : (
          announcements.map((announcement) => (
            <TableRow key={announcement.announcementId}>
              <TableCell>{announcement.announcementId}</TableCell>
              <TableCell>
                <div
                  className="font-medium truncate max-w-xs"
                  title={announcement.title}
                >
                  {announcement.title}
                </div>
                <div
                  className="text-xs text-muted-foreground truncate max-w-xs"
                  title={announcement.description}
                >
                  {announcement.description}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {announcement.groupId || "系统"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {announcement.isPinned && (
                    <Badge variant="default">置顶</Badge>
                  )}
                  {announcement.isDeleted && (
                    <Badge variant="destructive">已删除</Badge>
                  )}
                  {!announcement.isPinned && !announcement.isDeleted && (
                    <Badge variant="secondary">普通</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{announcement.userId}</div>
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  {new Date(announcement.createTime).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/announcements/detail/${announcement.announcementId}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  查看详情
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
