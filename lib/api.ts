const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function fetchMedia(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, { headers });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getTrending() {
  const page1Data = await fetchMedia("/trending/all/day?language=en-US&page=1");
  const page2Data = await fetchMedia("/trending/all/day?language=en-US&page=2");

  return [...page1Data.results, ...page2Data.results];
}

export async function getPopular() {
  const movieData = await fetchMedia("/movie/popular?language=en-US&page=1");
  const tvData = await fetchMedia("/tv/popular?language=en-US&page=1");

  return [...movieData.results, ...tvData.results].sort(
    (a, b) => b.popularity - a.popularity
  );
}

export async function getTopRated() {
  const movieData = await fetchMedia("/movie/top_rated?language=en-US&page=1");
  const tvData = await fetchMedia("/tv/top_rated?language=en-US&page=1");

  // custom sorting function
  const sortMedia = (a, b) => {
    // first, compare by vote average (highest rated first)
    if (b.vote_average.toFixed(1) !== a.vote_average.toFixed(1)) {
      return b.vote_average - a.vote_average;
    }

    // if vote average is the same, compare by date (oldest date first)
    const dateA = a.release_date || a.first_air_date;
    const dateB = b.release_date || b.first_air_date;

    if (dateA && dateB) {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
  };

  return [...movieData.results, ...tvData.results].sort(sortMedia);
}
