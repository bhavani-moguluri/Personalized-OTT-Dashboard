const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const subscriptionRoutes = require("./routes/SubscriptionRoutes");
const historyRoutes = require("./routes/historyRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

// Middleware FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://personalized-ott-dashboard.vercel.app",
      "https://personalized-ott-dashboard-nfoka8x0p-bhavani-moguluris-projects.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/Recommendations", recommendationRoutes);
require("dotenv").config();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
app.get("/", (req, res) => {
  res.send("OTT Dashboard Backend Running");
});
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working" });
});