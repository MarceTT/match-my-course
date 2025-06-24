import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <Skeleton className="h-96 w-full mb-6" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
