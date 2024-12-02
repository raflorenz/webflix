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
  const data = await fetchMedia("/movie/popular?language=en-US&page=1");

  return data.results;
}

export async function getTopRated() {
  const data = await fetchMedia("/movie/top_rated?language=en-US&page=1");

  return data.results;
}
