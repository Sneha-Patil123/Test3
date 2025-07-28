const express = require("express");
const cors = require("cors");

const featuredStoriesRoute = require("./routes/featuredStory");
const matchSponsorRoute = require("./routes/matchSponsor");
const adminDashboardRoute = require("./routes/adminDashboard");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/featured-stories", featuredStoriesRoute);
app.use("/api/match-sponsor", matchSponsorRoute);
app.use("/api", adminDashboardRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
