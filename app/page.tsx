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

  const trendingPage1 = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const trendingPage2 = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US&page=2",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const trending = [...trendingPage1.results, ...trendingPage2.results];

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
      <h1 className="my-8 text-6xl text-[#e50914] uppercase">Webflix</h1>

      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">Trending Now</h2>
      <div className="grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto pb-2">
        {trending.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">Popular Movies</h2>
      <div className="grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto pb-2">
        {popularMovies.results.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">Top Rated Movies</h2>
      <div className="grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto pb-2">
        {topRatedMovies.results.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
