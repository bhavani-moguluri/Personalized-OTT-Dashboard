const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  service: String,
  plan: String,
  price: Number,
  renewalDate: String,
});


module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);