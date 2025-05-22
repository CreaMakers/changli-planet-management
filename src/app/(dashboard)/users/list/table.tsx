"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { UsersInfoResponse } from "@/types/user";
import Link from "next/link";

interface UsersTableProps {
  users: UsersInfoResponse["data"];
  currentPage: number;
  totalPages: number;
}

export function UsersTable({
  users,
  currentPage,
  totalPages,
}: UsersTableProps) {
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
          <TableHead>用户信息</TableHead>
          <TableHead>角色</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>数据统计</TableHead>
          <TableHead>注册时间</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center py-6 text-muted-foreground"
            >
              暂无用户数据
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.userResp.userId}>
              <TableCell>{user.userResp.userId}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.userProfileResp.avatarUrl} />
                    <AvatarFallback>{user.userResp.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user.userResp.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Lv.{user.userProfileResp.userLevel} ·{" "}
                      {user.userProfileResp.gender === 0
                        ? "男"
                        : user.userProfileResp.gender === 1
                        ? "女"
                        : "其他"}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.userResp.isAdmin === 0 && (
                  <Badge variant="secondary">普通用户</Badge>
                )}
                {user.userResp.isAdmin === 1 && (
                  <Badge variant="default">运营组</Badge>
                )}
                {user.userResp.isAdmin === 2 && (
                  <Badge variant="outline">开发组</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {user.userResp.isBanned && (
                    <Badge variant="destructive">已封禁</Badge>
                  )}
                  {user.userResp.isDeleted && (
                    <Badge variant="outline">已删除</Badge>
                  )}
                  {!user.userResp.isBanned && !user.userResp.isDeleted && (
                    <Badge variant="default">正常</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-xs">
                  <span>文章: {user.userStatsResp?.articleCount || 0}</span>
                  <span>积分: {user.userStatsResp?.coinCount || 0}</span>
                  <span>经验: {user.userStatsResp?.xp || 0}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  {new Date(user.userResp.createTime).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/users/detail/${user.userResp.userId}`}
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
