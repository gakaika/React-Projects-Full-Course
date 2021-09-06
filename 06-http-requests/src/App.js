import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from "./components/AddMovie";
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // option 1 using the .then syntax for promise returned by fetch versus async/await
  // const fetchMoviesHandler = () => {
  //   fetch("https://swapi.dev/api/films")
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       const transformedMovies = data.results.map(movie => {
  //         return {
  //           id: movie.episode_id,
  //           title: movie.title,
  //           openingText: movie.opening_crawl,
  //           release: movie.release_date
  //         };
  //       });

  //       setMoviesList(transformedMovies);
  //     });
  // };

  // alternative using async/await syntax, try catch used here for error catching. In above, would use .catch().
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data = await fetch("https://react-course-http-practice-default-rtdb.firebaseio.com/movies.json");
      
      if (!data.ok){
        throw new Error("Something Went Wrong");
      }

      data = await data.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key, 
          title: data[key].title, 
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      };

      setMoviesList(loadedMovies);
    } 
    catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    let data = await fetch("https://react-course-http-practice-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });
    // note can also add error handling for above

    // update the new movies
    fetchMoviesHandler();
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && moviesList.length > 0 && <MoviesList movies={moviesList} />}
        {!isLoading && !error && moviesList.length === 0 && <p>Found No Movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
