import { Suspense } from "react";
import MediaDetails from "@/components/media-details";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({ params }) {
  return (
    <Suspense fallback={<MediaDetailsSkeleton />}>
      <MediaDetails params={params} />
    </Suspense>
  );
}

function MediaDetailsSkeleton() {
  return (
    <div className="container mx-auto px-8">
      <Skeleton className="h-10 w-[50%] my-8" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
