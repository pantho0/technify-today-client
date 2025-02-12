import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const PostSkeleton = () => {
  return (
    <Card className="py-4 px-4 space-y-4">
      <Skeleton className="rounded-lg">
        <div className="h-40 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-6 w-full rounded-lg bg-secondary" />
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-8 w-full rounded-lg bg-secondary-300" />
        </Skeleton>
        <div className="flex items-center justify-between gap-10">
          <Skeleton className="inline-block rounded-full">
            <div className="w-10 h-10  rounded-full bg-secondary-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-secondary-300" />
          </Skeleton>
        </div>
      </div>
    </Card>
  );
};

export default PostSkeleton;
