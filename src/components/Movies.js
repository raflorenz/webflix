import { useState, useEffect, useRef } from 'react'
import Movie from './Movie'

function Movies({ movies }) {
    const [active, setActive] = useState(null)

    const showMovieDetails = index => {
        if (active) return setActive(null)
        setActive(index)
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
        <section className="movies" ref={ref}>
            {movies.map((movie, index) => (
                <Movie 
                    key={movie['id']['attributes']['im:id']} 
                    movie={movie} 
                    clickHandler={() => showMovieDetails(index+1)}
                    activeMovie={active === index+1}
                />
            ))}
        </section>
    );
}

export default Movies;
