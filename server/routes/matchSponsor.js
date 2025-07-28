const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received a request to /api/match-sponsor");

  try {
    const { matchId, partnerName, contactEmail } = req.body;
    console.log("Request Body:", req.body);

    if (!matchId || !partnerName || !contactEmail) {
      // Send a 400 Bad Request error if data is missing
      return res.status(400).json({ message: "Missing required fields." });
    }

    console.log(`SUCCESS: Sponsorship recorded for Match ID: ${matchId}`);

    res.status(201).json({
      success: true,
      message: "Sponsorship request received and processed.",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});

module.exports = router;
