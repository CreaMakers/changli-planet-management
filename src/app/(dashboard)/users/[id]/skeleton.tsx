import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserInfoSkeleton = () => (
  <div className="container mx-auto">
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between p-2 border-b">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))}
            </div>

            <Skeleton className="h-6 w-32 mt-6 mb-4" />
            <div className="space-y-3">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`profile-${i}`}
                    className="flex justify-between p-2 border-b"
                  >
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="w-full border rounded-md p-2 mb-2">
            <div className="flex justify-between p-2 border-b bg-muted/50">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            {Array(11)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`stats-${i}`}
                  className="flex justify-between p-2 border-b"
                >
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
