import { useState, useEffect, useRef } from 'react'
import Movie from './Movie'
import ReactPlayer from 'react-player'

function Movies({ movies }) {
    const [active, setActive] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null)

    const showMovieDetails = (index, movie) => {
        if (active) return setActive(null)
        setActive(index)
        setSelectedMovie(movie)
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // if the popup is open and the clicked target is not within the popup, then close the popup
          if (active && ref.current && !ref.current.contains(e.target)) {
            setActive(null)
          }
        }
    
        document.addEventListener("click", checkIfClickedOutside)
    
        return () => {
          // cleanup the event listener
          document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [active])
    
    return (
        <>
            <section className="movies" ref={ref}>
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
                    <ReactPlayer url={selectedMovie && selectedMovie['link'][1]['attributes']['href']} playing muted width="100%" height="100%" />
                    <h2>{selectedMovie['im:name']['label']}</h2>
                    <ul>
                        <li>{selectedMovie && selectedMovie['category']['attributes']['label']}</li>
                        <li>{selectedMovie && selectedMovie['im:releaseDate']['label'].split('-')[0]}</li>
                    </ul>
                    <p>{selectedMovie['summary'] && selectedMovie['summary']['label']}</p>
                    <a href={selectedMovie && selectedMovie['link'][0]['attributes']['href']} target="_blank">Watch Now</a>
                </div>
            )}
        </>
    );
}

export default Movies;
