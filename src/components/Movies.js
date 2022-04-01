import { useState } from 'react'
import Movie from './Movie'

function Movies({ movies }) {
    const [active, setActive] = useState(null)
    
    return (
        <section className="movies">
            {movies.map(movie => (
                <Movie 
                    key={movie['id']['attributes']['im:id']} 
                    movie={movie} 
                    clickHandler={() => setActive(movie['id']['attributes']['im:id'])}
                    activeMovie={active === movie['id']['attributes']['im:id'] ? movie : null}
                />
            ))}
        </section>
    );
}

export default Movies;
