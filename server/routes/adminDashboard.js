const express = require("express");
const {
  storySubmissions,
  sponsorRequests,
} = require("../data/storySubmission");
const router = express.Router();

// GET story submissions
router.get("/story-submissions", (req, res) => {
  res.json(storySubmissions);
});

// GET sponsor requests
router.get("/match-sponsor-requests", (req, res) => {
  res.json(sponsorRequests);
});

// PATCH approve story submission
router.patch("/story-submissions/:id", (req, res) => {
  const item = storySubmissions.find((s) => s.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  item.status = "approved";
  res.json({ message: "Story approved" });
});

// PATCH approve sponsor request
router.patch("/match-sponsor-requests/:id", (req, res) => {
  const item = sponsorRequests.find((s) => s.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  item.status = "approved";
  res.json({ message: "Sponsorship approved" });
});

module.exports = router;
