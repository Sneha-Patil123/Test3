const express = require("express");
const FeaturedStories = require("../data/FeaturedStories");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(FeaturedStories.slice(0, 5));
});

module.exports = router;
