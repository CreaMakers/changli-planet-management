import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AnnouncementInfoSkeleton = () => {
  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div>
              <Skeleton className="h-6 w-32 mb-4" />
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex py-3 border-b">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-48 ml-auto" />
                </div>
              ))}
            </div>

            <div>
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
