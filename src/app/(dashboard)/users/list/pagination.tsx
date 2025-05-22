"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UserPagination({
  currentPage,
  totalPages,
  onPageChange,
}: UserPaginationProps) {
  return (
    <Pagination className="w-full">
      <PaginationContent className="flex justify-center">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>
        {(() => {
          const maxVisiblePages = 5;
          let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
          );
          let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

          if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
          }

          const pages = [];

          if (startPage > 1) {
            pages.push(
              <PaginationItem key="first">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9"
                  onClick={() => onPageChange(1)}
                >
                  1
                </Button>
              </PaginationItem>
            );

            if (startPage > 2) {
              pages.push(
                <PaginationItem key="ellipsis-start">
                  <div className="px-2">...</div>
                </PaginationItem>
              );
            }
          }

          for (let i = startPage; i <= endPage; i++) {
            pages.push(
              <PaginationItem key={i}>
                <Button
                  variant={currentPage === i ? "outline" : "ghost"}
                  size="icon"
                  className="w-9 h-9"
                  onClick={() => onPageChange(i)}
                  disabled={currentPage === i}
                >
                  {i}
                </Button>
              </PaginationItem>
            );
          }

          if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
              pages.push(
                <PaginationItem key="ellipsis-end">
                  <div className="px-2">...</div>
                </PaginationItem>
              );
            }

            pages.push(
              <PaginationItem key="last">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            );
          }

          return pages;
        })()}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
