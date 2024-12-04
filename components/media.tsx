import { formatDate } from "@/lib/utils";
import { Star, Film, TvMinimal } from "lucide-react";

export default function Media({ media }) {
  return (
    <div className="media relative w-[200px] select-none">
      <div className="pointer-events-none">
        <img src={`https://image.tmdb.org/t/p/w300${media.poster_path}`} />
      </div>
      <div className="info flex items-center gap-[3px] top-2 left-2">
        <Star size={16} />
        <span>{media.vote_average ? media.vote_average.toFixed(1) : "NR"}</span>
      </div>
      <div className="info top-2 right-2">
        {media.release_date ? <Film size={16} /> : <TvMinimal size={16} />}
      </div>
      <div className="info bottom-2 left-2">
        {formatDate(media.release_date || media.first_air_date)}
        {media.first_air_date &&
          (media.status === "Ended" ? " (Ended)" : " (Ongoing)")}
      </div>
    </div>
  );
}
