const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Add Subscription
router.post("/add", async (req, res) => {
  const { userId, service, plan, price, renewalDate } = req.body;
  try {
    const {
      user_id,
      service,
      plan,
      price,
      renewalDate,
    } = req.body;

    const { data, error } = await supabase
      .from("subscriptions")
      .insert([
        {
     user_id: userId,
          service,
          plan,
          price,
          renewal_date: renewalDate,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get User Subscriptions
router.get("/:user_id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", req.params.user_id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete Subscription
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;