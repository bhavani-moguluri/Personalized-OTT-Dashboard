import { useEffect, useState } from "react";

function Recommendations() {
  const [movies, setMovies] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetch(
        "https://personalized-ott-dashboard.onrender.com/api/recommendations")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        background: "#141414",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🎯 Recommended For You</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              width: "250px",
              background: "#222",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={movie.movie_image}
              alt={movie.movie_title}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "10px" }}>
              <h3>{movie.movie_title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;