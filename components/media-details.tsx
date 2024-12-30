import { unstable_cacheLife as cacheLife } from "next/cache";
import { fetchMediaDetails, getWatchedListIds } from "@/lib/api";
import ButtonAddToWatchedList from "./button-add-to-watched-list";

export default async function MediaDetails({ params }) {
  "use cache";
  cacheLife("hours");

  const id = (await params).media[1];
  const media_type = (await params).media[0];

  const details = await fetchMediaDetails({ id, media_type });
  const watchedListIds = await getWatchedListIds();
  const watched = watchedListIds.includes(Number(id));

  return (
    <>
      <section
        className="relative flex gap-8 min-h-[600px] bg-gray-200 bg-cover"
        style={{
          backgroundImage: details.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path})`
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="mb-4 text-[40px] text-[#e50914] uppercase">
            {details.title || details.name}
          </h1>
          {!watched && (
            <ButtonAddToWatchedList media={{ ...details, media_type }} />
          )}
          {details.tagline && (
            <h3 className="mb-4 text-xl italic">{details.tagline}</h3>
          )}
          <h3 className="mb-2 text-xl">Overview</h3>
          <p className="text-lg">{details.overview}</p>
        </div>
      </section>
    </>
  );
}
