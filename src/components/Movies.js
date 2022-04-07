import { useState } from 'react'
import Movie from './Movie'

function Movies({ movies }) {
    const [active, setActive] = useState(null)

    const showMovieDetails = index => {
        if (active === index) return setActive(null)
        setActive(index)
    }
    
    return (
        <section className="movies">
            {movies.map((movie, index) => (
                <Movie 
                    key={movie['id']['attributes']['im:id']} 
                    movie={movie} 
                    clickHandler={() => showMovieDetails(index)}
                    activeMovie={active === index}
                />
            ))}
        </section>
    );
}

export default Movies;
