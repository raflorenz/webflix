import Movie from "@/components/movie";

export default async function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzYzODc1NzkzNzA4MGJlMTIzYzYyNGNiNmZjMDM1NCIsIm5iZiI6MTczMjM0NTI2OS4zMzU4NDcxLCJzdWIiOiI2NzQxNzZkOWYwZjJlZDhmOTg1MWY1MjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AOsrh3hY_8hKmpVx7u3dfO7cZnqJ3rv0aa2aa2-Dvt4",
    },
  };

  const popularMovies = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const topRatedMovies = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return (
    <div className="container mx-auto px-8">
      <h1 className="brand">Webflix</h1>

      <h2 className="heading">Popular Movies</h2>
      <div className="movies">
        {popularMovies.results.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      <h2 className="heading">Top Rated Movies</h2>
      <div className="movies">
        {topRatedMovies.results.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
