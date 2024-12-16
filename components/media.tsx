import { formatDate, formatRuntime } from "@/lib/utils";
import { Star, Film, TvMinimal } from "lucide-react";

export default function Media({ media }) {
  return (
    <div
      className={`media relative w-[235px] select-none${
        media.poster_path ? "" : " bg-gray-300"
      }`}
    >
      <div className="pointer-events-none">
        {media.poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w300${media.poster_path}`} />
        ) : (
          <h3 className="absolute flex justify-center items-center w-full h-full text-[2rem] text-[#e50914] uppercase text-center">
            {media.title || media.name}
          </h3>
        )}
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
      <div className="info top-2 left-[2.2rem]">
        {media.release_date
          ? formatRuntime(media.runtime)
          : `${media.number_of_episodes}ep`}
      </div>
      <div className="info bottom-2 left-2">
        {formatDate(media.release_date || media.first_air_date)}
        {media.first_air_date &&
          (media.status === "Ended" ? " (Ended)" : " (Ongoing)")}
      </div>
    </div>
  );
}
