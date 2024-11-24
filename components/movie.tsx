export default async function Movie({ movie }) {
  return (
    <div className="movie">
      <div className="movie-front">
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
        />
        <span className="movie-release-date">
          {movie.release_date.split("-")[0]}
        </span>
      </div>
    </div>
  );
}
