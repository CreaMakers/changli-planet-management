import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CommentsListSkeleton = () => {
  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-8 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="ml-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32 mt-1" />
                  </div>
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />

                {i % 2 === 0 && (
                  <div className="ml-12 mt-4 border-l-2 pl-4">
                    <div className="flex items-center mb-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="ml-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-2 w-24 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3 mt-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
