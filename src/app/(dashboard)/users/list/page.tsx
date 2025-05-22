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
import { UsersCountResponse, UsersInfoResponse } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserFilters } from "./filters";
import UsersPageSkeleton from "./skeleton";
import { UsersTable } from "./table";

const UsersListPage = () => {
  const [users, setUsers] = useState<UsersInfoResponse["data"]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const { token, isLoading } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const [adminFilter, setAdminFilter] = useState<string>("all");
  const [deletedFilter, setDeletedFilter] = useState<string>("all");
  const [bannedFilter, setBannedFilter] = useState<string>("all");

  const [activeFilters, setActiveFilters] = useState({
    username: "",
    isAdmin: "all",
    isDeleted: "all",
    isBanned: "all",
    pageSize: 10,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      setIsUsersLoading(true);

      try {
        const countQueryParams = new URLSearchParams();
        if (activeFilters.username)
          countQueryParams.append("username", activeFilters.username);
        if (activeFilters.isAdmin !== "all")
          countQueryParams.append("isAdmin", activeFilters.isAdmin);
        if (activeFilters.isDeleted !== "all")
          countQueryParams.append("isDeleted", activeFilters.isDeleted);
        if (activeFilters.isBanned !== "all")
          countQueryParams.append("isBanned", activeFilters.isBanned);

        const countQueryString = countQueryParams.toString();
        const countPath = `/web/users/count${
          countQueryString ? `?${countQueryString}` : ""
        }`;

        const countResult = await apiRequest<UsersCountResponse>({
          method: "GET",
          path: countPath,
          token,
        });

        if (countResult.success && countResult.data) {
          const totalUsers = countResult.data.data;
          setUserCount(totalUsers);
          setTotalPages(Math.ceil(totalUsers / activeFilters.pageSize));
        }

        const usersQueryParams = new URLSearchParams();
        usersQueryParams.append("page", currentPage.toString());
        usersQueryParams.append("pageSize", activeFilters.pageSize.toString());

        if (activeFilters.username)
          usersQueryParams.append("username", activeFilters.username);
        if (activeFilters.isAdmin !== "all")
          usersQueryParams.append("isAdmin", activeFilters.isAdmin);
        if (activeFilters.isDeleted !== "all")
          usersQueryParams.append("isDeleted", activeFilters.isDeleted);
        if (activeFilters.isBanned !== "all")
          usersQueryParams.append("isBanned", activeFilters.isBanned);

        const usersResult = await apiRequest<UsersInfoResponse>({
          method: "GET",
          path: `/web/users?${usersQueryParams.toString()}`,
          token,
        });

        if (usersResult.success && usersResult.data) {
          setUsers(usersResult.data.data);
        } else {
          toast.error("获取用户列表失败");
        }
      } catch (err) {
        toast.error("请求失败，请重试");
        console.error(err);
      } finally {
        setIsUsersLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, activeFilters, token]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setActiveFilters({
      username: usernameFilter,
      isAdmin: adminFilter,
      isDeleted: deletedFilter,
      isBanned: bannedFilter,
      pageSize: pageSize,
    });
  };

  const handleReset = () => {
    setUsernameFilter("");
    setAdminFilter("all");
    setDeletedFilter("all");
    setBannedFilter("all");
    setPageSize(10);
    setCurrentPage(1);
    setActiveFilters({
      username: "",
      isAdmin: "all",
      isDeleted: "all",
      isBanned: "all",
      pageSize: 10,
    });
  };

  if (isLoading || isUsersLoading || !token) {
    return <UsersPageSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>用户管理</CardTitle>
          <CardDescription>系统总共有 {userCount} 名用户</CardDescription>
        </CardHeader>

        <div className="px-6 pb-2">
          <UserFilters
            usernameFilter={usernameFilter}
            setUsernameFilter={setUsernameFilter}
            adminFilter={adminFilter}
            setAdminFilter={setAdminFilter}
            deletedFilter={deletedFilter}
            setDeletedFilter={setDeletedFilter}
            bannedFilter={bannedFilter}
            setBannedFilter={setBannedFilter}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={handleSearch}
            handleReset={handleReset}
            isLoading={isUsersLoading}
          />
        </div>

        <CardContent>
          <UsersTable
            users={users}
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

export default UsersListPage;
