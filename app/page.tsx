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
    <div className="app">
      <h1 className="heading">Webflix</h1>

      <div className="mb-8">
        <h2>Popular Movies</h2>
        {popularMovies.results.map((movie) => (
          <h3 key={movie.id}>{movie.title}</h3>
        ))}
      </div>

      <div>
        <h2>Top Rated Movies</h2>
        {topRatedMovies.results.map((movie) => (
          <h3 key={movie.id}>{movie.title}</h3>
        ))}
      </div>
    </div>
  );
}
