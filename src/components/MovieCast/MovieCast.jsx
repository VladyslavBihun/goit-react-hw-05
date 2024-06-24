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
      <h4>Cast</h4>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt="Profile photo"
                width={150}
              />
              <p>
                {actor.name} as {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
