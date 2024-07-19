import { Skeleton } from "@dingify/ui/components/skeleton";

export default function PicturesLoading() {
  return (
    <div className="grid items-start gap-8">
      <div className="grid gap-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-7 w-60" />
      </div>
      <div className="min-lg:flex-col justify-center gap-x-4 max-lg:space-y-4 lg:flex">
        <div className="lg:w-1/2">
          <Skeleton className="h-[25rem]" />
        </div>
        <div className="grid gap-y-3 lg:w-1/2">
          <Skeleton className="h-[7.5rem]" />
          <Skeleton className="h-[7.5rem]" />
          <Skeleton className="h-[7.5rem]" />
        </div>
      </div>
      <div className="min-lg:flex-col justify-center gap-x-4 max-lg:space-y-4 lg:flex">
        <div className="lg:w-1/2">
          <Skeleton className="h-[25rem]" />
        </div>
        <div className="grid gap-y-3 lg:w-1/2">
          <Skeleton className="h-[7.5rem]" />
          <Skeleton className="h-[7.5rem]" />
          <Skeleton className="h-[7.5rem]" />
        </div>
      </div>
    </div>
  );
}
