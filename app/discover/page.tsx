import { Suspense } from "react";
import { getTrending, getPopular, getTopRated } from "@/lib/api";
import MediaList from "@/components/media-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const trendingPromise = getTrending();
  const popularPromise = getPopular();
  const topRatedPromise = getTopRated();

  return (
    <div className="container mx-auto px-8">
      <h1 className="my-8 text-6xl text-[#e50914] uppercase">Webflix</h1>
      <Suspense fallback={<MediaListSkeleton />}>
        <SuspenseMediaList promise={trendingPromise} heading="Trending Now" />
        <SuspenseMediaList promise={popularPromise} heading="Popular" />
        <SuspenseMediaList promise={topRatedPromise} heading="Top Rated" />
      </Suspense>
    </div>
  );
}

async function SuspenseMediaList({ promise, heading }) {
  const data = await promise;
  return <MediaList mediaList={data} heading={heading} />;
}

function MediaListSkeleton() {
  return (
    <div className="space-y-4">
      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">
        Loading movies and tv shows from TMDB...
      </h2>
      <div className="grid grid-rows-2 grid-flow-col gap-2 pb-2 mb-16 overflow-x-auto">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[2/3] w-[235px]" />
        ))}
      </div>
    </div>
  );
}
