"use client";

import { useState, useEffect } from "react";
import Movies from "@/components/Movies";
import FeaturedMovie from "@/components/FeaturedMovie";
import Search from "@/components/Search";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(20);
  const [previewPlaying, setPreviewPlaying] = useState(true);

  useEffect(() => {
    (async function fetchMovies() {
      const response = await fetch(
        `https://itunes.apple.com/us/rss/topmovies/limit=${limit}/json`
      );
      const data = await response.json();

      setMovies(data.feed.entry);

      // scroll to bottom after clicking see all button
      if (limit > 20) {
        document.body.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    })();
  }, [limit]);

  return (
    <div className="app">
      <h1 className="heading">Webflix</h1>
      <Search />
      <FeaturedMovie movies={movies} previewPlaying={previewPlaying} />
      <h2>
        Popular Movies{" "}
        {limit === 20 && <span onClick={() => setLimit(100)}>See All</span>}
      </h2>
      <Movies
        movies={movies}
        togglePreview={() => setPreviewPlaying(!previewPlaying)}
      />
    </div>
  );
}
