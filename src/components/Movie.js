function Movie({ movie, clickHandler, activeMovie }) {
    return (
        <div className={`movie ${activeMovie ? 'is-active' : ''}`}>
            <div className="movie-front" onClick={clickHandler}>
                <img src={movie['im:image'][2]['label']} />
                <span className="movie-release-date">{movie['im:releaseDate']['label'].split('-')[0]}</span>
                <span className="movie-category">{movie['category']['attributes']['label']}</span>
            </div>
            <div className="movie-details">
                <h3>{movie['im:name']['label']}</h3>
                <p>{movie['summary'] && movie['summary']['label']}</p>
            </div>
        </div>
    );
}

export default Movie;
