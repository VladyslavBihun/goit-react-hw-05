import { getTrendingMovies } from "../../tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList fetchMovies={getTrendingMovies} />
    </div>
  );
};

export default HomePage;
