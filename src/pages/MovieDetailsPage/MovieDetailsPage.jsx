import { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import { getMovieDetails } from "../../tmdbApi";
import css from "./MovieDetailsPage.module.css";
import BackLink from "../../components/BackLink/BackLink";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const locationRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <BackLink to={locationRef.current}></BackLink>
      <div className={css.wrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="poster"
          width={300}
        />
        <div className={css.description}>
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>Use Score: {Math.round(movie.popularity / 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>
                <p>{genre.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <h4>Additional information</h4>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
