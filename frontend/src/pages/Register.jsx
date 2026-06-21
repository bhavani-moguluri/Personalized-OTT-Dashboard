import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <header className="navbar">
        <h1 className="logo">CineVerse</h1>
        <button
          className="top-signin"
          onClick={() => navigate("/")}
        >
          Sign In
        </button>
      </header>

      <div className="hero-content">
        <p className="tagline">Discover. Stream. Belong.</p>

        <h1 className="hero-title">
          Create Your CineVerse Account
        </h1>

        <p className="hero-subtitle">
          Track subscriptions. Build watchlists. Stream smarter.
        </p>

        <div className="login-card">
          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
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

            <button type="submit">
              Create Account
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;