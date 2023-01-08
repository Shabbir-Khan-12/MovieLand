import React from 'react';
import {useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


//d2d69c3
const API_URL = 'https://www.omdbapi.com?apikey=d2d69c3';
// const movie1 = {
//     "Title": "Italian Spiderman",
//     "Year": "2007",
//     "imdbID": "tt2705436",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
// }


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('SpiderMan')
    }, []);
    return (
        <div className = "app">
            <h1>Movieland</h1>

            <div className = "search">
                <input
                    placeholder= 'Search For Movies'
                    value = {searchTerm}
                    onChange= {(e) => setSearchTerm(e.target.value)}
                />

                <img 
                    src={SearchIcon}
                    alt='Search'
                    onClick= {() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 
                ? 
                (
                    <div className='container'>
                        {movies.map((movie) => (<MovieCard movie = {movie} />))}
                    </div>
                ):
                (
                    <div>
                        <h2>No movies found!</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;