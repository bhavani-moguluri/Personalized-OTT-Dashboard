const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Get Watchlist
router.get("/:user_id", async (req, res) => {
  try {
    const { data, error } = await supabase
     .from("watchlist")
      .select("*")
      .eq("user_id", req.params.user_id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.log("WATCHLIST FETCH ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// Add Movie to Watchlist

router.post("/add", async (req, res) => {
  try {
    const { userId, movieTitle, movieImage } = req.body;

    const { data, error } = await supabase
  .from("watchlist")
  .insert([
    {
      user_id: userId,
      movie_title: movieTitle,
      movie_image: movieImage,
    },
  ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
   console.log("HISTORY ADD ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;