// MovieCast.jsx

import { useEffect, useState } from "react";
import { getMovieCredits } from "../../tmdbApi";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const movieCast = await getMovieCredits(movieId);
        setCast(movieCast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading cast...</div>;
  }

  if (!cast.length) {
    return <div>No cast information available.</div>;
  }

  return (
    <div>
      <h5>Cast</h5>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
