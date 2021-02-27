import React from 'react'
import { Link } from 'react-router-dom';

import StarIcon from '../assets/StarIcon'
import GlobeIcon from '../assets/GlobeIcon'

export default function MovieCard(props) {

    const {
        id,
        poster,
        title,
        language,
        vote, 
        voteCount, 
    } = props.movieData;

    return (
        <Link to="#" className="movie-card" data-id={id} >
            <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />  
            <div className="hover-display-section">
                <div className="content">
                    <p>Title: <strong>{title}</strong></p>
                    <div className="vote-section">
                        <StarIcon />
                        <p>{vote} ({voteCount})</p>
                    </div>
                    <span className="lang">
                        <GlobeIcon />
                        <span>
                            {language}
                        </span>
                    </span>
                </div>
            </div>          
        </Link>
    )
}
