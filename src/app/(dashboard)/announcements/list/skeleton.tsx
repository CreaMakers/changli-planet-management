import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AnnouncementsPageSkeleton = () => {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>公告管理</CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-2">
          <div className="flex items-center gap-2 ml-auto justify-end">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-[70px]" />
          </div>
        </div>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Skeleton className="h-4 w-8" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-6" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full max-w-xs" />
                        <Skeleton className="h-3 w-3/4 max-w-xs" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-14" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4">
          <div className="flex justify-center w-full">
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-8 w-8 rounded-md" />
                ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
