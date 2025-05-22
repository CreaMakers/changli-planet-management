import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const EditAnnouncementSkeleton = () => {
  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <Skeleton className="h-8 w-[180px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="rounded-md border p-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-[80px]" />
            <Skeleton className="h-10 w-[80px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
