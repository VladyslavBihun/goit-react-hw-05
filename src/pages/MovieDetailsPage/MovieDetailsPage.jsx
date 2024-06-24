// MovieDetailsPage.jsx

import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getMovieDetails } from "../../tmdbApi";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <hr />
      <div>
        <h4>Additional information</h4>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>
      <hr />
      <Routes>
        <Route path="cast" element={<MovieCast movieId={movieId} />} />
        <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
