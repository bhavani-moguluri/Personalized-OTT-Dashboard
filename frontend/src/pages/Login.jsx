import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://personalized-ott-dashboard.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();
console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
  console.error("LOGIN ERROR:", error);
  alert(error.message || "Server Error");
}
  };
  

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <header className="navbar">
        <h1 className="logo">CineVerse</h1>

        <button
          className="top-signin"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </header>

      <div className="hero-content">
        <p className="tagline">Discover. Stream. Belong.</p>

        <h1 className="hero-title">
          Unlimited Movies, TV Shows & More
        </h1>

        <p className="hero-subtitle">
          Track subscriptions. Build watchlists. Stream smarter.
        </p>

        <div className="login-card">
          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Sign In</button>
          </form>

          <p>
            New to CineVerse?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register now.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;