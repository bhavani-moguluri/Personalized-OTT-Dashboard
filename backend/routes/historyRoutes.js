const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Add to History
router.post("/add", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
   const {
  userId,
  movieTitle,
  movieImage,
} = req.body;

    const { data, error } = await supabase
      .from("history")
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

// Get User History
router.get("/:user_id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", req.params.user_id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.log("HISTORY FETCH ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete History Item
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("history")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.log("SUPABASE HISTORY ERROR:", error);
      throw error;
    }

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.log("HISTORY DELETE ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;