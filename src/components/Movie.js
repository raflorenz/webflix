function Movie({ movie }) {
    return (
        <div className="movie">
            <img src={movie['im:image'][2]['label']} />
            <p>{movie['im:name']['label']}</p>
        </div>
    );
}

export default Movie;
