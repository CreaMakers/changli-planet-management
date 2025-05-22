"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnnouncementFiltersProps {
  pageSize: number;
  setPageSize: (value: number) => void;
  isLoading: boolean;
}

export function AnnouncementFilters({
  pageSize,
  setPageSize,
  isLoading,
}: AnnouncementFiltersProps) {
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
  };

  return (
    <div className="flex items-center gap-2 ml-auto justify-end">
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
  );
}
