import { formatDate } from "@/lib/utils";
import { Star, Film, TvMinimal } from "lucide-react";

export default async function Movie({ movie }) {
  return (
    <div className="media relative w-[200px]">
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
      <div className="flex items-center gap-[3px] top-2 left-2">
        <Star size={16} />
        <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}</span>
      </div>
      <div className="top-2 right-2">
        {movie.media_type === "tv" ? (
          <TvMinimal size={16} />
        ) : (
          <Film size={16} />
        )}
      </div>
      <div className="bottom-2 left-2">
        {formatDate(movie.release_date || movie.first_air_date)}
        {movie.first_air_date &&
          ` - ${
            movie.last_air_date ? formatDate(movie.last_air_date) : "Present"
          }`}
      </div>
    </div>
  );
}
