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

    console.log("USER:", user);

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
    <div style={{ background: "#141414", minHeight: "100vh", color: "white", padding: "30px" }}>
      <h1>🔍 Search Movies</h1>

      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchMovie();
        }}
      />

      <button onClick={searchMovie}>
        Search
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "30px" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "260px", background: "#222" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => saveHistory(movie)}
              style={{
                width: "100%",
                height: "380px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />

            <div style={{ padding: "10px" }}>
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
              <p>{movie.release_date}</p>

              <button onClick={() => addToWatchlist(movie)}>
                ❤️ Add to My List
              </button>

              <button
                onClick={() => addToRecommendations(movie)}
                style={{ marginTop: "10px" }}
              >
                🎯 Add Recommendation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMovies;