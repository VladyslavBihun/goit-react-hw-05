import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzBmZmExNDliN2JlZjg1ZWZmYjRkMWNmODliN2VmOCIsInN1YiI6IjY2NzNlMmYzY2U0NzYxZGM3NGFmNGU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tpe5TxRzI9mdR-GaRPu_qbv-BLekgP7D-rxF9VA-FHU`;
axios.defaults.headers.common["Accept"] = "application/json";

export const getTrendingMovies = async () => {
  const response = await axios.get("trending/movie/day", {
    params: {
      language: "en-US",
    },
  });
  return response.data.results;
};

export const getMovieBySearchWord = async (query) => {
  const response = await axios.get("search/movie", {
    params: {
      language: "en-US",
      include_adult: "false",
      page: "1",
      query,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get("movie/${id}", {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get("movie/${id}/credits", {
    params: {
      language: "en-US",
    },
  });
  return response.data.cast;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get("movie/${id}/reviews", {
    params: {
      language: "en-US",
      page: "1",
    },
  });
  return response.data.results;
};
