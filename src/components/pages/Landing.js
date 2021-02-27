import React, { useContext } from 'react'
import { MovieContext } from '../../App'
import MovieCard from '../MovieCard'


export default function Landing(props) {

    // consuming the contect values
    const movieContext = useContext(MovieContext); 

    return (
        <div className="landing">
            <div className="search-container">
                <form className="search-field" onSubmit={(e) => movieContext.searchFn(e)}>
                    <input type="text" value={movieContext.searchString} placeholder="Movies" onChange={(e) => movieContext.setSearchValueFn(e)} />
                    <button type="submit" className="search-btn">
                        <i className="lni lni-search-alt"></i>
                    </button>
                </form>
            </div>
            <div className="search-results-section">
                <h1>4 results found for your search: "batman"</h1>
            </div>
            <div className="movies-display-section" onClick={(e) => movieContext.movieFullDetailFn(e)}>
                {
                    movieContext.movieData !== undefined && movieContext.movieData.map(movie => (
                        <MovieCard key={movie.id} movieData={movie}  />
                    ))
                }
            </div>
        </div>
    )
}
