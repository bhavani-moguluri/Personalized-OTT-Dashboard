const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema({
  userId: String,
  movieId: Number,
  movieTitle: String,
  movieImage: String,
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "WatchHistory",
  watchHistorySchema
);