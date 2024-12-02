import MediaList from "@/components/media-list";
import { getTrending, getPopular, getTopRated } from "@/lib/api";

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
  ]);

  return (
    <div className="container mx-auto px-8">
      <h1 className="my-8 text-6xl text-[#e50914] uppercase">Webflix</h1>
      <MediaList heading="Trending Now" mediaList={trending} />
      <MediaList heading="Popular" mediaList={popular} />
      <MediaList heading="Top Rated" mediaList={topRated} />
    </div>
  );
}
