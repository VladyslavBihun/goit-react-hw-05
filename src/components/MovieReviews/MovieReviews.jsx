// MovieReviews.jsx

import { useEffect, useState } from "react";
import { getMovieReviews } from "../../tmdbApi";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const movieReviews = await getMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <div>No reviews available.</div>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
