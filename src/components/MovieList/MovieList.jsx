import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../tmdbApi";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }),
    [];

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
