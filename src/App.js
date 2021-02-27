/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import './sass/styles.scss'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Footer from './components/Footer';
import MovieDetail from './components/pages/MovieDetail';

// react context api
export const MovieContext = React.createContext();

export default function App() {

    let pathName;
    let path;
    let matchMovie;
    
    const [movieData, setMovieData] = useState();
    const [errorData, setErrorData] = useState({message: 'Unable to retrieve data, please try refreshing the page.'});
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        fetch('https://movie-inventory-api.herokuapp.com/movieAPI')
            .then(res => res.json()) //fetching data initally on load
            .then(data => {
                // setting data to local storage
                localStorage.setItem('moviesData', JSON.stringify(data.results))
            })
            .then(() => {
                // setting data to movieData variable
                let data = JSON.parse(localStorage.getItem('moviesData'));
                // destructuring while setting the data, to avoid unnecessary values
                setMovieData(data.map(movie => {
                let poster = movie.poster_path;
                let language = movie.original_language;
                let title = movie.original_title;
                let vote = movie.vote_average;
                let voteCount = movie.vote_count;
                let overview = movie.overview;
                let id = movie.id;    
                return {
                        poster, language, title, vote, voteCount, overview, id
                    }
                }))
            })
            .catch(err => {
                // setting error 
                setErrorData(err);
                // displaying error message on load if retrieval fails
                document.querySelector('.search-results-section').style.display = 'block';
                document.querySelector('.search-results-section h1').innerHTML = errorData.message;
            });
    }, [errorData]);

    // filtering corresponding movie data to click 
    const movieFullDetailHandler = (e) => {
        if(e.target.parentElement.classList.contains('movie-card')) {
            let tempId = parseFloat(e.target.parentElement.dataset.id);
            movieData !== undefined && movieData.forEach(movie => {
                if(movie.id === tempId) {
                    matchMovie = movie;
                };
            });
            localStorage.setItem('movies', JSON.stringify(matchMovie));
            pathName = matchMovie.title.split(' ').join('-').toLowerCase();
            path = `/moviecart/${pathName}/details`;
            window.location.pathname = path;
        }
    }  
    
    // setting searchString value
    const searchValueHandler = (e) => {
        setSearchString(e.target.value);
    }
    
    // search form submit event handler
    const searchMoviesHandler = (e) => {
        e.preventDefault();
        let searchResults = [];
        let searchContainer = document.querySelector('.search-container');
        if(searchString === '') {
            // search string empty, not allowing search and displaying related error
            if(!document.querySelector('.search-error')) {
                let searchErr = document.createElement('span');
                searchErr.className = 'search-error';
                searchErr.appendChild(document.createTextNode('Please enter a movie name!'));
                searchContainer.appendChild(searchErr);
                setTimeout(() => {
                if(document.querySelector('.search-error')) {
                        searchContainer.removeChild(searchErr);
                    }
                }, 2000);
            }
        } else {
            // displaying full details of the selected movie
            if(document.querySelector('.search-error')) {
                document.querySelector('.search-error').remove();
            }
            movieData.forEach(movie => {
                if(movie.title.toLowerCase().includes(searchString)) {
                    searchResults.push(movie);
                }
            });

            // no search match, related error message
            if(searchResults.length === 0) {
                document.querySelector('.search-results-section').style.display = 'block';
                document.querySelector('.search-results-section h1').innerHTML = `No results found for your search: "${searchString}"`;
            } else {
                // search results message
                document.querySelector('.search-results-section').style.display = 'block';
                document.querySelector('.search-results-section h1').innerHTML = `${searchResults.length} result(s) found for your search: "${searchString}"`;
            }

            setMovieData(searchResults);

            // back button to exit search
            let backBtn = document.createElement('a');
            backBtn.setAttribute('href', '/');
            backBtn.className = 'back-home-btn'
            backBtn.appendChild(document.createTextNode('Back To Inventory'));
            searchContainer.appendChild(backBtn);

            // hiding the seach field
            document.querySelector('.search-field').style.display = 'none';
        }
    }

    // context object containing necessary values and functions to be passed dwon to the respective page
    let movieContextValue = { 
        movieData, 
        searchString, 
        movieFullDetailFn: movieFullDetailHandler, 
        searchFn: searchMoviesHandler,
        setSearchValueFn: searchValueHandler,
    }

    // render
    return (
        <Router>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" >
                        <Redirect to="/moviecart" />
                    </Route>
                    <Route path="/moviecart" exact >
                        {/* providing the context values through react context */}
                        <MovieContext.Provider value={movieContextValue}>
                            <Landing />
                        </MovieContext.Provider>
                    </Route>
                    <Route> 
                        <MovieDetail />
                    </Route>
                </Switch>
                <Footer />
            </React.Fragment>
        </Router>
    )
}
