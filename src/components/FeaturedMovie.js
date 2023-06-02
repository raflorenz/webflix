import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

function FeaturedMovie({ movies, previewPlaying }) {
    const [index, setIndex] = useState(0)
    const featuredMovie = movies[index]

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * ((movies.length - 1) - 0)) + 0
            setIndex(randomNumber)
        }, 20000);

        return () => clearInterval(interval);
    }, [movies])

    return (
        <section className="featured-movie">
            <ReactPlayer url={featuredMovie && featuredMovie['link'][1]['attributes']['href']} playing={previewPlaying} muted width="100%" height="750px" />
            <div className="featured-movie-content">
                <h1 className="featured-movie-title">{featuredMovie && featuredMovie['im:name']['label']}</h1>
                <ul className="featured-movie-list">
                    <li>{featuredMovie && featuredMovie['category']['attributes']['label']}</li>
                    <li>{featuredMovie && featuredMovie['im:releaseDate']['label'].split('-')[0]}</li>
                </ul>
                <p className="featured-movie-summary">{featuredMovie && featuredMovie['summary']['label']}</p>
                <a href={featuredMovie && featuredMovie['link'][0]['attributes']['href']} className="featured-movie-button" target="_blank">Watch Now</a>
            </div>
        </section>
    );
}

export default FeaturedMovie
