"use client";

import { CommonPagination } from "@/components/common-pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { FilesResponse } from "@/types/file";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileFilters } from "./filters";
import FilesPageSkeleton from "./skeleton";
import { FilesTable } from "./table";

const FilesPage = () => {
  const [files, setFiles] = useState<FilesResponse["data"]>([]);
  const [isFilesLoading, setIsFilesLoading] = useState<boolean>(true);
  const { token, isLoading } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [fileCount] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all");

  const [activeFilters, setActiveFilters] = useState({
    fileType: "all",
    pageSize: 10,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTotalPages(Math.ceil(fileCount / activeFilters.pageSize));
  }, [fileCount, activeFilters.pageSize]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!token) return;

      setIsFilesLoading(true);

      try {
        const filesQueryParams = new URLSearchParams();
        filesQueryParams.append("page", currentPage.toString());
        filesQueryParams.append("pageSize", activeFilters.pageSize.toString());

        if (activeFilters.fileType !== "all")
          filesQueryParams.append("fileType", activeFilters.fileType);

        const filesResult = await apiRequest<FilesResponse>({
          method: "GET",
          path: `/web/files?${filesQueryParams.toString()}`,
          token,
        });

        if (filesResult.success && filesResult.data) {
          setFiles(filesResult.data.data);
        } else {
          toast.error("获取文件列表失败");
        }
      } catch (err) {
        toast.error("请求失败，请重试");
        console.error(err);
      } finally {
        setIsFilesLoading(false);
      }
    };

    fetchFiles();
  }, [currentPage, activeFilters, token]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setActiveFilters({
      fileType: fileTypeFilter,
      pageSize: pageSize,
    });
  };

  const handleReset = () => {
    setFileTypeFilter("all");
    setPageSize(10);
    setCurrentPage(1);
    setActiveFilters({
      fileType: "all",
      pageSize: 10,
    });
  };

  const handleDeleteFile = (fileId: number) => {
    setFileToDelete(fileId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteFile = async () => {
    if (!fileToDelete || !token) return;

    setIsDeleting(true);
    try {
      const result = await apiRequest({
        method: "DELETE",
        path: `/web/files/${fileToDelete}`,
        token,
      });

      if (result.success) {
        toast.success("文件删除成功");
        const updatedFiles = files.map((file) =>
          file.fileId === fileToDelete ? { ...file, isDeleted: true } : file
        );
        setFiles(updatedFiles);
      } else {
        toast.error(result.error || "删除文件失败");
      }
    } catch (err) {
      toast.error("删除请求失败，请重试");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  if (isLoading || isFilesLoading || !token) {
    return <FilesPageSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>文件管理</CardTitle>
          <CardDescription>管理系统中的各类文件</CardDescription>
        </CardHeader>

        <div className="px-6 pb-2">
          <FileFilters
            fileTypeFilter={fileTypeFilter}
            setFileTypeFilter={setFileTypeFilter}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={handleSearch}
            handleReset={handleReset}
            isLoading={isFilesLoading}
          />
        </div>

        <CardContent>
          <FilesTable
            files={files}
            currentPage={currentPage}
            totalPages={totalPages}
            onDeleteFile={handleDeleteFile}
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除文件</DialogTitle>
            <DialogDescription>
              您确定要删除此文件吗？此操作不可逆。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteFile}
              disabled={isDeleting}
            >
              {isDeleting ? "删除中..." : "确认删除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilesPage;
