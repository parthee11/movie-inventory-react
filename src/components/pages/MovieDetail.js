import React from 'react'
import GlobeIcon from '../../assets/GlobeIcon';
import StarIcon from '../../assets/StarIcon';

export default function MovieDetail() {

    const movie = JSON.parse(localStorage.getItem('movies'));

    const {
        poster, 
        language,
        overview,
        title,
        vote, 
        voteCount
    } = movie;

    return (
        <div 
            className="movie-detail" 
            style={{
            background: `url(https://image.tmdb.org/t/p/w500/${poster}) repeat`,
            }} 
        >
            <div className="movie-detail-content">
                <div className="left-container">
                    <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title}/>
                </div>
                <div className="right-container">
                    <h2 className="title">{title}</h2>
                    <div className="rating-section">
                        <StarIcon /> <span>{vote} ({voteCount})</span>
                    </div>
                    <p className="overview">{overview}</p>
                    <p className="language">
                        <GlobeIcon /> 
                        {
                            language === 'ko' ? 
                            'Korean' : 
                            (language === 'es' ?
                            'Spanish' : 
                            (language === 'sv') ?
                            'Swedish' :
                            (language === 'fr') ?
                            'French' :
                            (language === 'zh') ?
                            'Chinese, Zhōnghuá' :
                            'English'  )
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
