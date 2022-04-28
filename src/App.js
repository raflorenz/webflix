import { useState, useEffect } from 'react'
import Movies from './components/Movies'
import FeaturedMovie from './components/FeaturedMovie'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    // fetch('https://itunes.apple.com/us/rss/topmovies/limit=100/json').then(response => response.json()).then(data => console.log(data.feed.entry))
    (async function fetchMovies() {
      const response = await fetch(`https://itunes.apple.com/us/rss/topmovies/limit=${limit}/json`);
      const data = await response.json();

      setMovies(data.feed.entry);
    })();
  }, [limit]);

  return (
    <div className="app">
      <h1 className="heading">Webflix</h1>
      <FeaturedMovie movies={movies} />
      <h2>Popular Movies {limit === 20 && <span onClick={() => setLimit(100)}>See All</span>}</h2>
      <Movies movies={movies} />
    </div>
  );
}

export default App;
