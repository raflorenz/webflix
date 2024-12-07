import { Suspense, use } from "react";
import { fetchMediaDetails } from "@/lib/api";
import { formatDate, formatRuntime } from "@/lib/utils";
import { Star, Film, TvMinimal } from "lucide-react";

export default function Media({ media }) {
  return (
    <div className="media relative w-[200px] select-none">
      <div className="pointer-events-none">
        <img src={`https://image.tmdb.org/t/p/w200${media.poster_path}`} />
      </div>
      <div className="info top-2 left-2">
        {media.release_date ? <Film size={15} /> : <TvMinimal size={15} />}
      </div>
      <div className="info flex items-center gap-[3px] top-2 right-2">
        <Star size={15} />
        <span>
          {media.vote_average ? media.vote_average.toFixed(1) : "N/A"}
        </span>
      </div>
      <Suspense fallback={<div>...</div>}>
        <AdditionalInfo media={media} />
      </Suspense>
    </div>
  );
}

function AdditionalInfo({ media }) {
  const data = use(fetchMediaDetails(media));

  return (
    <>
      <div className="info top-2 left-[2.2rem]">
        {data.release_date
          ? formatRuntime(data.runtime)
          : `${data.number_of_episodes}ep`}
      </div>
      <div className="info bottom-2 left-2">
        {formatDate(data.release_date || data.first_air_date)}
        {data.first_air_date &&
          (data.status === "Ended" ? " (Ended)" : " (Ongoing)")}
      </div>
    </>
  );
}
