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
import { ViolationsResponse } from "@/types/violation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ViolationFilters } from "./filters";
import { ViolationsPageSkeleton } from "./skeleton";
import { ViolationsTable } from "./table";

const ViolationsListPage = () => {
  const [violations, setViolations] = useState<ViolationsResponse["data"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, isLoading: authLoading } = useAuth();
  const [violationCount] = useState<number>(20);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(2);

  const [violationTypeFilter, setViolationTypeFilter] = useState<string>("all");

  const [activeFilters, setActiveFilters] = useState({
    violationType: "all",
    pageSize: 10,
  });

  useEffect(() => {
    setTotalPages(Math.ceil(violationCount / activeFilters.pageSize));
  }, [violationCount, activeFilters.pageSize]);

  useEffect(() => {
    const fetchViolations = async () => {
      if (!token) return;

      setIsLoading(true);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage.toString());
        queryParams.append("pageSize", activeFilters.pageSize.toString());

        let path = "/web/violations";

        if (activeFilters.violationType !== "all") {
          path = "/web/violation/search";
          queryParams.append("violation_type", activeFilters.violationType);
        }

        const result = await apiRequest<ViolationsResponse>({
          method: "GET",
          path: `${path}?${queryParams.toString()}`,
          token,
        });

        if (result.success && result.data) {
          setViolations(result.data.data);
        } else {
          toast.error("获取违规列表失败");
        }
      } catch (err) {
        toast.error("请求失败，请重试");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViolations();
  }, [currentPage, activeFilters, token]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setActiveFilters({
      violationType: violationTypeFilter,
      pageSize: pageSize,
    });
  };

  const handleReset = () => {
    setViolationTypeFilter("all");
    setPageSize(10);
    setCurrentPage(1);
    setActiveFilters({
      violationType: "all",
      pageSize: 10,
    });
  };

  if (authLoading || isLoading) {
    return <ViolationsPageSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>违规管理</CardTitle>
          <CardDescription>
            系统总共有 {violationCount} 条违规记录
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-2">
          <ViolationFilters
            violationTypeFilter={violationTypeFilter}
            setViolationTypeFilter={setViolationTypeFilter}
            pageSize={pageSize}
            setPageSize={handlePageSizeChange}
            handleSearch={handleSearch}
            handleReset={handleReset}
            isLoading={isLoading}
          />
        </div>

        <CardContent>
          <ViolationsTable
            violations={violations}
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

export default ViolationsListPage;
