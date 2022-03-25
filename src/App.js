import { useState, useEffect } from 'react'
import Movies from './components/Movies'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // fetch('https://itunes.apple.com/us/rss/topmovies/limit=100/json').then(response => response.json()).then(data => console.log(data.feed.entry))
    (async function fetchMovies() {
      const response = await fetch('https://itunes.apple.com/us/rss/topmovies/limit=100/json');
      const data = await response.json();

      setMovies(data.feed.entry);
    })();
  }, []);

  return (
    <div className="app">
      <h1>Topflix</h1>
      <Movies movies={movies} />
    </div>
  );
}

export default App;
