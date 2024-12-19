import { unstable_cacheLife as cacheLife } from "next/cache";
import { Suspense } from "react";
import { fetchMediaDetails } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

async function MediaDetails({ params }) {
  "use cache";
  cacheLife("hours");

  const id = (await params).media[1];
  const media_type = (await params).media[0];

  const details = await fetchMediaDetails({ id, media_type });

  return (
    <div className="container mx-auto px-8">
      <h1 className="my-8 text-6xl text-[#e50914] uppercase">
        {details.title || details.name}
      </h1>
      <p>{details.overview}</p>
    </div>
  );
}

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
