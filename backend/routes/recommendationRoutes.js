const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Add Recommendation
router.post("/add", async (req, res) => {
  try {
     console.log("BODY:", req.body);
    const { userId, movieTitle, movieImage } = req.body;

    const { data, error } = await supabase
      .from("recommendations")
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
    console.error("ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// Get Recommendations
router.get("/:userId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .eq("user_id", req.params.userId);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});
// ====================
// Delete Recommendation
// ====================
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("recommendations")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Recommendation deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


module.exports = router;