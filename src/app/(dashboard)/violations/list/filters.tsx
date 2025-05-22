"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ViolationFiltersProps {
  violationTypeFilter: string;
  setViolationTypeFilter: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  handleSearch: () => void;
  handleReset: () => void;
  isLoading: boolean;
}

export function ViolationFilters({
  violationTypeFilter,
  setViolationTypeFilter,
  pageSize,
  setPageSize,
  handleSearch,
  handleReset,
  isLoading,
}: ViolationFiltersProps) {
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="violation-type-filter" className="text-sm font-medium">
          违规类型：
        </label>
        <Select
          value={violationTypeFilter}
          onValueChange={setViolationTypeFilter}
        >
          <SelectTrigger id="violation-type-filter" className="h-9 w-[100px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="1">言论违规</SelectItem>
            <SelectItem value="2">行为违规</SelectItem>
            <SelectItem value="3">其他</SelectItem>
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
