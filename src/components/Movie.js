function Movie({ movie, clickHandler, activeMovie }) {
    return (
        <div className={`movie ${activeMovie ? 'is-active' : ''}`}>
            <img src={movie['im:image'][2]['label']} onClick={clickHandler} />
            <div className="movie-details">
                <h3>{movie['im:name']['label']}</h3>
                <p>{movie['summary']['label']}</p>
            </div>
        </div>
    );
}

export default Movie;
