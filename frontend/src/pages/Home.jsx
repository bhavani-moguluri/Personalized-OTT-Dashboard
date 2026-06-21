import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const addToWatchlist = async () => {
    try {
      const response = await fetch("https://personalized-ott-dashboard.onrender.com/api/watchlist/add",      
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            movieTitle: "Interstellar",
            movieImage:
              "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Added to Watchlist ❤️");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error adding movie");
    }
  };

  const continueWatching = [
    {
      title: "Hi Nanna",
      image:
        "https://i.ytimg.com/vi/EOefGIdp3BU/sddefault.jpg",
    },
    {
      title: "Salaar",
      image:
        "https://c.ndtvimg.com/2023-12/ejah5gmo_salaar_625x300_20_December_23.jpg",
    },
    {
      title: "Virupaksha",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.8vPOvzT8w534JzdKqZ_yggHaEV?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Interstellar",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.z9OAOQdHgwsteAiNzjUlJgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  const recommended = [
    {
      title: "Stranger Things",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.dJV_GVlYuvDEa3C6dT2tawHaEK?r=0&w=1200&h=675&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "When Life Gives You Tangerines",
      image:
        "https://th.bing.com/th/id/OIP._vi0662MPamN16izXaaKOAHaEK?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      title: "Wednesday",
      image:
        "https://m.media-amazon.com/images/S/pv-target-images/29248593e2e2f2b83d9af9cfc65852ff849049b74b9cd9d2c80e1f7a5f1de35a._UR1920,1080_BR-6_SX720_FMjpg_.jpg",
    },
    {
      title: "Dark",
      image:
        "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    },
  ];

  const trending = [
    {
      title: "Kalki 2898 AD",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.Zd93opUgJimTuU31oa2-3AAAAA?r=0&w=474&h=266&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Pushpa 2",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.q4IjK7ughk0IpyT4U0TiigHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Devara",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.KFPoZDIa9dDXhBkLhuxgAgHaEc?r=0&w=1500&h=900&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "The Batman",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.w4JM9GV4esVSIz68oT5HxwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">▶</span>
          <span>CineVerse</span>
        </div>

       <ul className="nav-links">
  <li>Home</li>
  <li>TV Shows</li>
  <li>Movies</li>

  <li onClick={() => navigate("/mylist")}>
    My List
  </li>
<li onClick={() => navigate("/search")}>
  Search Movies
</li>
 <li onClick={() => navigate("/subscription")}>
  📺Subscriptions
</li>

<li onClick={() => navigate("/history")}>
  🎥Watch History
</li>
</ul>
<li onClick={() => navigate("/recommendations")}>
  🎯Recommendations
</li>
        <div className="profile">
          <input
            type="text"
            placeholder="🔍 Search movies..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="search-box"
          />

          <span className="user-name">
            👤 {user?.name}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="hero">
        <div className="overlay">
          <h1>INTERSTELLAR</h1>

          <p>
            A team of explorers travel through a
            wormhole in space in an attempt to ensure
            humanity's survival.
          </p>

          <div className="hero-buttons">
            <button className="play-btn">
              ▶ Play
            </button>
           <button
  className="list-btn"
  onClick={addToWatchlist}
>
  + My List
</button>
            
          </div>
        </div>
      </section>

      {/* Continue Watching */}
      <section className="section">
        <h2>
          Continue Watching For {user?.name}
        </h2>

        <div className="movie-row">
          {continueWatching
            .filter((movie) =>
              movie.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
            )
            .map((movie, index) => (
              <div
                className="movie-card"
                key={index}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="section">
        <h2>Top Picks For You</h2>

        <div className="movie-row">
          {recommended
            .filter((movie) =>
              movie.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
            )
            .map((movie, index) => (
              <div
                className="movie-card"
                key={index}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Trending */}
      <section className="section">
        <h2>🔥 Trending Now</h2>

        <div className="movie-row">
          {trending
            .filter((movie) =>
              movie.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
            )
            .map((movie, index) => (
              <div
                className="movie-card"
                key={index}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
        </div>
      </section>

      {/* OTT Subscriptions */}
      <section className="section">
        <h2>📺 My OTT Subscriptions</h2>

        <div className="ott-row">
          <div className="ott-card">
            🎬 Netflix
          </div>
          <div className="ott-card">
            🎥 Prime Video
          </div>
          <div className="ott-card">
            ⭐ Disney+
          </div>
          <div className="ott-card">
            🔥 JioHotstar
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;