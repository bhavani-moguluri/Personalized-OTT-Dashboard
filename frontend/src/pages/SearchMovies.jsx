import { useState } from "react";

function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const addToRecommendations = async (movie) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
        "https://personalized-ott-dashboard.onrender.com/api/recommendations/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            movieTitle: movie.title,
            movieImage: `https://media.themoviedb.org/t/p/w600_and_h900_face${movie.poster_path}`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${movie.title} added to Recommendations 🎯`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error adding recommendation");
    }
  };

  const searchMovie = async () => {
    if (!query) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
    );

    const data = await res.json();
    setMovies(data.results);
  };

  const addToWatchlist = async (movie) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
        "https://personalized-ott-dashboard.onrender.com/api/watchlist/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            movieTitle: movie.title,
            movieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${movie.title} added to My List ❤️`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error adding movie");
    }
  };

  const saveHistory = async (movie) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        alert("User not logged in");
        return;
      }

      await fetch(
        "https://personalized-ott-dashboard.onrender.com/api/history/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            movie_title: movie.title,
            movie_image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }),
        }
      );

      window.open(
        `https://www.themoviedb.org/movie/${movie.id}`,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // your existing JSX
  );
}

export default SearchMovies;