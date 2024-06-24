// MovieList.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieList = ({ fetchMovies, moviesProp }) => {
  const [movies, setMovies] = useState(moviesProp || []);

  useEffect(() => {
    if (fetchMovies) {
      const fetch = async () => {
        try {
          const moviesData = await fetchMovies();
          setMovies(moviesData);
        } catch (error) {
          console.log(error);
        }
      };

      fetch();
    }
  }, [fetchMovies]);

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
