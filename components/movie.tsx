import { formatDate } from "@/lib/utils";
import { Star } from "lucide-react";

export default async function Movie({ movie }) {
  return (
    <div className="movie">
      <div className="movie-front">
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
        />
        <span className="movie-rating">
          <Star size={15} />
          <span>{movie.vote_average.toFixed(1)}</span>
        </span>
        <span className="movie-release-date">
          {formatDate(movie.release_date)}
        </span>
      </div>
    </div>
  );
}
