import { db } from "@/db";
import { mediaTable } from "@/db/schema";
import Link from "next/link";
import { Suspense } from "react";
import MediaList from "@/components/media-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-between items-center">
        <h1 className="my-8 text-6xl text-[#e50914] uppercase">Webflix</h1>
        <Link href="/discover">Discover</Link>
      </div>
      <Suspense fallback={<WatchedListSkeleton />}>
        <WatchedList />
      </Suspense>
    </div>
  );
}

async function WatchedList() {
  const data = await db.select().from(mediaTable);

  return (
    <MediaList
      mediaList={data}
      heading="List of movies and tv shows you've already watched"
    />
  );
}

function WatchedListSkeleton() {
  return (
    <div className="space-y-4">
      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">
        Loading movies and tv shows...
      </h2>
      <div className="grid grid-rows-2 grid-flow-col gap-2 pb-2 mb-16 overflow-x-auto">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[2/3] w-[235px]" />
        ))}
      </div>
    </div>
  );
}
