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
import { ViolationsResponse } from "@/types/violation";
import Link from "next/link";

interface ViolationsTableProps {
  violations: ViolationsResponse["data"];
  currentPage: number;
  totalPages: number;
}

const getViolationTypeName = (type: number): string => {
  const types = {
    1: "言论违规",
    2: "行为违规",
    3: "其他",
  };
  return types[type as keyof typeof types] || "未知";
};

const getPenaltyTypeName = (type: number): string => {
  const types = {
    0: "无",
    1: "警告",
    2: "封禁",
    3: "禁言",
  };
  return types[type as keyof typeof types] || "未知";
};

const getPenaltyStatusInfo = (
  status: number
): {
  name: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} => {
  switch (status) {
    case 0:
      return { name: "未处罚", variant: "outline" };
    case 1:
      return { name: "处罚中", variant: "destructive" };
    case 2:
      return { name: "已完成", variant: "secondary" };
    default:
      return { name: "未知", variant: "outline" };
  }
};

export function ViolationsTable({
  violations,
  currentPage,
  totalPages,
}: ViolationsTableProps) {
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
          <TableHead>用户ID</TableHead>
          <TableHead>违规类型</TableHead>
          <TableHead>处罚类型</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>违规时间</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {violations.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center py-6 text-muted-foreground"
            >
              暂无违规数据
            </TableCell>
          </TableRow>
        ) : (
          violations.map((violation) => {
            const penaltyStatus = getPenaltyStatusInfo(violation.penaltyStatus);

            return (
              <TableRow key={violation.id}>
                <TableCell>{violation.id}</TableCell>
                <TableCell>{violation.userId}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getViolationTypeName(violation.violationType)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getPenaltyTypeName(violation.penaltyType)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={penaltyStatus.variant}>
                    {penaltyStatus.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    {new Date(violation.violationTime).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/violations/detail/${violation.id}`}
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      查看详情
                    </Link>
                    <Link
                      href={`/violations/detail/${violation.id}/edit`}
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      处理
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
