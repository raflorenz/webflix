import Movie from './Movie'

function Movies({ movies }) {
    return (
        <section className="movies">
            {movies.map(movie => (
                <Movie key={movie['id']['attributes']['im:id']} movie={movie} />
            ))}
        </section>
    );
}

export default Movies;
