import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieBySearchWord } from "../../tmdbApi";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setQuery("");
    const fetchMovies = async () => {
      const query = searchParams.get("query");
      if (query) {
        try {
          const movieResults = await getMovieBySearchWord(query);
          setMovies(movieResults);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSubmit = (e) => {
    setMovies([]);
    e.preventDefault();
    const form = e.target;
    if (query !== "") {
      setSearchParams({ query });
    }
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList moviesProp={movies} />}
    </div>
  );
};

export default MoviesPage;
