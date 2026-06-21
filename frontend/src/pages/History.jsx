import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:5000/api/history/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
  console.log("History API FULL:", JSON.stringify(data));
  setHistory(Array.isArray(data) ? data : []);
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
      <h1>🎥 Watch History</h1>

      {history.length === 0 ? (
        <h2>No History Found</h2>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {history.map((movie) => (
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
      )}
    </div>
  );
}

export default History;