import { useState, useEffect } from 'react'

function Search() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (query === '') return
    fetch('https://itunes.apple.com/us/rss/topmovies/limit=100/json')
        .then(response => response.json())
        .then(data => setSearchResults(data.feed.entry.filter(searchResult => searchResult['im:name']['label'].toLowerCase().includes(query))))
  }, [query])

  const searchMovies = e => {
    const value = e.target.value
    setQuery(value)
    setSearchResults([])
  }

  const searchResultClicked = url => {
    setQuery('')
    setSearchResults([])
    window.open(url, '_blank')
  }

  return (
    <div className="search-wrapper">
        <input type="search" value={query} className="search" placeholder="Search Movie Title" onChange={searchMovies} />
        <div className="search-results">
            {searchResults.map(searchResult => (
                <div key={searchResult['im:name']['label']} onClick={() => searchResultClicked(searchResult['link'][0]['attributes']['href'])}>{searchResult['im:name']['label']}</div>
            ))}
            {(searchResults.length === 0 && query > 0) && <div>No result</div>}
        </div>
    </div>
  );
}

export default Search;
