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

export async function getTVShowDetails(id: number) {
  try {
    const data = await fetchMedia(`/tv/${id}`);
    return {
      status: data.status || null,
    };
  } catch (error) {
    console.error(`Error fetching TV show details for ID ${id}:`, error);
    return { status: null };
  }
}

export async function getTrending() {
  const page1Data = await fetchMedia("/trending/all/day?language=en-US&page=1");
  const page2Data = await fetchMedia("/trending/all/day?language=en-US&page=2");

  // Fetch additional details for TV shows
  const updatedResults = await Promise.all(
    [...page1Data.results, ...page2Data.results].map(async (item) => {
      if (item.first_air_date) {
        const { status } = await getTVShowDetails(item.id);

        return { ...item, status };
      }

      return item;
    })
  );

  return updatedResults;
}

export async function getPopular() {
  const movieData = await fetchMedia("/movie/popular?language=en-US&page=1");
  const tvData = await fetchMedia("/tv/popular?language=en-US&page=1");

  // Fetch additional details for TV shows
  const updatedResults = await Promise.all(
    [...movieData.results, ...tvData.results].map(async (item) => {
      if (item.first_air_date) {
        const { status } = await getTVShowDetails(item.id);

        return { ...item, status };
      }

      return item;
    })
  );

  return updatedResults.sort((a, b) => b.popularity - a.popularity);
}

export async function getTopRated() {
  const movieData = await fetchMedia("/movie/top_rated?language=en-US&page=1");
  const tvData = await fetchMedia("/tv/top_rated?language=en-US&page=1");

  // Fetch additional details for TV shows
  const updatedResults = await Promise.all(
    [...movieData.results, ...tvData.results].map(async (item) => {
      if (item.first_air_date) {
        const { status } = await getTVShowDetails(item.id);

        return { ...item, status };
      }

      return item;
    })
  );

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

  return updatedResults.sort(sortMedia);
}
