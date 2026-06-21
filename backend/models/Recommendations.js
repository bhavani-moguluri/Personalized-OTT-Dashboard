const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  userId: String,
  movieTitle: String,
  movieImage: String,
});

module.exports = mongoose.model(
  "Recommendation",
  recommendationSchema
);