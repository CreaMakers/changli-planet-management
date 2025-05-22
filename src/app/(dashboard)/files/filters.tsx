"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FileFiltersProps {
  fileTypeFilter: string;
  setFileTypeFilter: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  handleSearch: () => void;
  handleReset: () => void;
  isLoading: boolean;
}

export function FileFilters({
  fileTypeFilter,
  setFileTypeFilter,
  pageSize,
  setPageSize,
  handleSearch,
  handleReset,
  isLoading,
}: FileFiltersProps) {
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="file-type-filter" className="text-sm font-medium">
          文件类型：
        </label>
        <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
          <SelectTrigger id="file-type-filter" className="h-9 w-[120px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="1">图片</SelectItem>
            <SelectItem value="2">文档</SelectItem>
            <SelectItem value="3">视频</SelectItem>
            <SelectItem value="4">音频</SelectItem>
            <SelectItem value="5">其他</SelectItem>
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
