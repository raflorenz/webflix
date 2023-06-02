import { useState, useEffect } from 'react'
import Movie from './Movie'
import ReactPlayer from 'react-player'

function Movies({ movies, togglePreview }) {
    const [active, setActive] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null)

    const showMovieDetails = (index, movie) => {
        if (active) return setActive(null)
        setActive(index)
        setSelectedMovie(movie)
        togglePreview()
    }

    const closePopup = () => {
        setActive(null)
        togglePreview()
    }

    useEffect(() => {
        const closePopupOnEscape = e => {
          if (e.key === "Escape") {
            setActive(null)
          }
        }
    
        document.addEventListener("keydown", closePopupOnEscape)
    
        return () => {
          document.removeEventListener("keydown", closePopupOnEscape)
        }
    }, [active])
    
    return (
        <>
            <section className="movies">
                {movies.map((movie, index) => (
                    <Movie 
                        key={movie['id']['attributes']['im:id']} 
                        movie={movie} 
                        clickHandler={() => showMovieDetails(index+1, movie)}
                        activeMovie={active === index+1}
                    />
                ))}
            </section>
            {active && (
                <div className="movie-details">
                    <ReactPlayer url={selectedMovie && selectedMovie['link'][1]['attributes']['href']} playing muted controls width="100%" height="100%" />
                    <h2>{selectedMovie['im:name']['label']}</h2>
                    <ul>
                        <li>{selectedMovie && selectedMovie['category']['attributes']['label']}</li>
                        <li>{selectedMovie && selectedMovie['im:releaseDate']['label'].split('-')[0]}</li>
                    </ul>
                    <p>{selectedMovie['summary'] && selectedMovie['summary']['label']}</p>
                    <a href={selectedMovie && selectedMovie['link'][0]['attributes']['href']} target="_blank">Watch Now</a>
                    <button onClick={closePopup}>Close</button>
                </div>
            )}
        </>
    );
}

export default Movies;
