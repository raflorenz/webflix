import { Suspense } from "react";
import { getTrending, getPopular, getTopRated } from "@/lib/api";
import MediaList from "@/components/media-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
  const trendingPromise = getTrending();
  const popularPromise = getPopular();
  const topRatedPromise = getTopRated();

  return (
    <div className="container mx-auto px-8">
      <h1 className="my-8 text-6xl text-[#e50914] uppercase">Webflix</h1>

      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">Trending Now</h2>
      <Suspense fallback={<MediaListSkeleton />}>
        <TrendingMediaList promise={trendingPromise} />
      </Suspense>

      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">Popular</h2>
      <Suspense fallback={<MediaListSkeleton />}>
        <PopularMediaList promise={popularPromise} />
      </Suspense>

      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">Top Rated</h2>
      <Suspense fallback={<MediaListSkeleton />}>
        <TopRatedMediaList promise={topRatedPromise} />
      </Suspense>
    </div>
  );
}

function MediaListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-rows-2 grid-flow-col gap-2 pb-2 mb-16 overflow-x-auto">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[2/3] w-[235px]" />
        ))}
      </div>
    </div>
  );
}

async function TrendingMediaList({ promise }) {
  const trending = await promise;
  return <MediaList mediaList={trending} />;
}

async function PopularMediaList({ promise }) {
  const popular = await promise;
  return <MediaList mediaList={popular} />;
}

async function TopRatedMediaList({ promise }) {
  const topRated = await promise;
  return <MediaList mediaList={topRated} />;
}
