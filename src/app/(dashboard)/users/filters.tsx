"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersProps {
  usernameFilter: string;
  setUsernameFilter: (value: string) => void;
  adminFilter: string;
  setAdminFilter: (value: string) => void;
  deletedFilter: string;
  setDeletedFilter: (value: string) => void;
  bannedFilter: string;
  setBannedFilter: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  handleSearch: () => void;
  handleReset: () => void;
  isLoading: boolean;
}

export function UserFilters({
  usernameFilter,
  setUsernameFilter,
  adminFilter,
  setAdminFilter,
  deletedFilter,
  setDeletedFilter,
  bannedFilter,
  setBannedFilter,
  pageSize,
  setPageSize,
  handleSearch,
  handleReset,
  isLoading,
}: UserFiltersProps) {
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="username-filter" className="text-sm font-medium">
          用户名：
        </label>
        <input
          id="username-filter"
          type="text"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          placeholder="搜索用户名"
          className="h-9 px-3 rounded-md border border-input bg-background text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="admin-filter" className="text-sm font-medium">
          角色：
        </label>
        <Select value={adminFilter} onValueChange={setAdminFilter}>
          <SelectTrigger id="admin-filter" className="h-9 w-[100px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="0">普通用户</SelectItem>
            <SelectItem value="1">运营组</SelectItem>
            <SelectItem value="2">开发组</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="deleted-filter" className="text-sm font-medium">
          删除状态：
        </label>
        <Select value={deletedFilter} onValueChange={setDeletedFilter}>
          <SelectTrigger id="deleted-filter" className="h-9 w-[100px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="0">未删除</SelectItem>
            <SelectItem value="1">已删除</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="banned-filter" className="text-sm font-medium">
          封禁状态：
        </label>
        <Select value={bannedFilter} onValueChange={setBannedFilter}>
          <SelectTrigger id="banned-filter" className="h-9 w-[100px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="0">未封禁</SelectItem>
            <SelectItem value="1">已封禁</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="text-sm font-medium">每页显示：</div>
        <Select
          value={pageSize.toString()}
          onValueChange={handlePageSizeChange}
          disabled={isLoading}
        >
          <SelectTrigger className="h-9 w-[70px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="default"
        size="sm"
        onClick={handleSearch}
        disabled={isLoading}
      >
        查询
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        disabled={isLoading}
      >
        重置
      </Button>
    </div>
  );
}
