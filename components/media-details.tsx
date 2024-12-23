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
      <h1 className="my-8 text-6xl text-[#e50914] uppercase">
        {details.title || details.name}
      </h1>
      <p>{details.overview}</p>
      {!watched && (
        <ButtonAddToWatchedList media={{ ...details, media_type }} />
      )}
    </>
  );
}
