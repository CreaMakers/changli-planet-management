"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileResp } from "@/types/file";
import { Trash2 } from "lucide-react";

interface FilesTableProps {
  files: FileResp[];
  currentPage: number;
  totalPages: number;
  onDeleteFile: (fileId: number) => void;
}

export function FilesTable({
  files,
  currentPage,
  totalPages,
  onDeleteFile,
}: FilesTableProps) {
  const getFileTypeText = (type: number) => {
    switch (type) {
      case 1:
        return "图片";
      case 2:
        return "文档";
      case 3:
        return "视频";
      case 4:
        return "音频";
      case 5:
        return "其他";
      default:
        return "未知";
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

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
          <TableHead>文件名</TableHead>
          <TableHead>文件类型</TableHead>
          <TableHead>文件大小</TableHead>
          <TableHead>上传者ID</TableHead>
          <TableHead>分组ID</TableHead>
          <TableHead>创建时间</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={9}
              className="text-center py-6 text-muted-foreground"
            >
              暂无文件数据
            </TableCell>
          </TableRow>
        ) : (
          files.map((file) => (
            <TableRow key={file.fileId}>
              <TableCell>{file.fileId}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{file.fileName}</span>
                  {file.description && (
                    <span className="text-xs text-muted-foreground">
                      {file.description}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getFileTypeText(file.fileType)}
                </Badge>
              </TableCell>
              <TableCell>{formatFileSize(file.fileSize)}</TableCell>
              <TableCell>{file.userId}</TableCell>
              <TableCell>{file.groupId}</TableCell>
              <TableCell>
                <div className="text-xs">
                  {new Date(file.createTime).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={file.isDeleted ? "destructive" : "default"}>
                  {file.isDeleted ? "已删除" : "正常"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteFile(file.fileId)}
                  disabled={file.isDeleted}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">删除</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
