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
import { AnnouncementsResponse } from "@/types/announcement";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnnouncementFilters } from "./filters";
import { AnnouncementsPageSkeleton } from "./skeleton";
import { AnnouncementsTable } from "./table";

const AnnouncementsListPage = () => {
  const [announcements, setAnnouncements] = useState<
    AnnouncementsResponse["data"]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, isLoading: authLoading } = useAuth();
  const [announcementCount, setAnnouncementCount] = useState<number>(20);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(2);

  useEffect(() => {
    setTotalPages(Math.ceil(announcementCount / pageSize));
  }, [announcementCount, pageSize]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      if (!token) return;

      setIsLoading(true);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage.toString());
        queryParams.append("pageSize", pageSize.toString());

        const result = await apiRequest<AnnouncementsResponse>({
          method: "GET",
          path: `/web/announcements?${queryParams.toString()}`,
          token,
        });

        if (result.success && result.data) {
          setAnnouncements(result.data.data);
        } else {
          toast.error("获取公告列表失败");
        }
      } catch (err) {
        toast.error("请求失败，请重试");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
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
    return <AnnouncementsPageSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>公告管理</CardTitle>
          <CardDescription>
            系统总共有 {announcementCount} 条公告
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-2">
          <AnnouncementFilters
            pageSize={pageSize}
            setPageSize={handlePageSizeChange}
            isLoading={isLoading}
          />
        </div>

        <CardContent>
          <AnnouncementsTable
            announcements={announcements}
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

export default AnnouncementsListPage;
