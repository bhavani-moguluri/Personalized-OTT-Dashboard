const supabase = require("../supabase");

await supabase
  .from("watchlist")
  .insert([
    {
      user_id,
      movie_title,
      movie_image,
    },
  ]);