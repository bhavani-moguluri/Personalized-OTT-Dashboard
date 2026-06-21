import { useEffect, useState } from "react";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("Logged User:", user);

    if (!user || !user.id) {
      console.log("User ID not found");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/watchlist/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Movies from API:", data);

        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching watchlist:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        background: "#141414",
        minHeight: "100vh",
        color: "#ffffff",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "#ffffff", marginBottom: "20px" }}>🎬 My List</h1>

      {loading ? (
        <h2 style={{ color: "#ffffff" }}>Loading...</h2>
      ) : movies.length === 0 ? (
        <h2 style={{ color: "#ffffff" }}>No movies found in watchlist</h2>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {movies.map((movie, index) => {
            // Fixes the unique key warning by combining the item ID with its array index
            const uniqueKey = movie.id ? `movie-${movie.id}` : `movie-idx-${index}`;
            
            return (
              <div
                key={uniqueKey}
                style={{
                  background: "#222222",
                  color: "#ffffff",
                  borderRadius: "8px",
                  width: "200px",
                  minHeight: "350px", // Ensures the card has a physical size even if styles conflict
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                  zIndex: 10,
                }}
              >
                {/* Movie Poster Image Element */}
                {movie.movie_image ? (
                  <img
                    src={movie.movie_image}
                    alt={movie.movie_title || "Poster"}
                    style={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "260px",
                      background: "#333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#aaa",
                    }}
                  >
                    No Image Found
                  </div>
                )}

                {/* Movie Information Footer */}
                <div style={{ marginTop: "12px" }}>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#ffffff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={movie.movie_title || "Untitled Movie"}
                  >
                    {movie.movie_title || "Untitled Movie"}
                  </h3>
                  <p style={{ margin: 0, fontSize: "11px", color: "#888" }}>
                    User ID: {movie.user_id || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyList;