function Movie({ movie, clickHandler, activeMovie }) {
    return (
        <div className="movie">
            <img src={movie['im:image'][2]['label']} onClick={clickHandler} />
            {activeMovie && (
                <div>
                    <p>{activeMovie['im:name']['label']}</p>
                    <p>{activeMovie['summary']['label']}</p>
                </div>
            )}
        </div>
    );
}

export default Movie;
