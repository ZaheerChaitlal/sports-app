// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// Initialize the Express app
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Set the server port
const PORT = process.env.PORT || 5000;

// Axios headers
const apiHeaders = {
  "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  "x-rapidapi-host": process.env.RAPIDAPI_HOST
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * Route: GET /api/matches/:type
 * Description: Fetches matches of the given type (live, recent, upcoming)
 */
app.get("/api/matches/:type", async (req, res) => {
  const type = req.params.type || "recent";

  try {
    const response = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/matches/v1/${type}`, {
      headers: apiHeaders
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${type} matches:`, error.message);
    res.status(500).json({ error: `Failed to fetch ${type} matches` });
  }
});

/**
 * Route: GET /api/series/:type
 * Description: Fetches series of the given type (international, league, domestic, women)
 */
app.get("/api/series/:type", async (req, res) => {
  const type = req.params.type || "international";

  try {
    const response = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/series/v1/${type}`, {
      headers: apiHeaders
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${type} series:`, error.message);
    res.status(500).json({ error: `Failed to fetch ${type} series` });
  }
});

/**
 * Route: GET /api/teams/:type
 * Description: Fetches teams of the given type (international, league, domestic, women)
 */
app.get("/api/teams/:type", async (req, res) => {
  const type = req.params.type || "international";

  try {
    const response = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${type}`, {
      headers: apiHeaders
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${type} teams:`, error.message);
    res.status(500).json({ error: `Failed to fetch ${type} teams` });
  }
});

/**
 * Route: GET /api/players/trending
 * Description: Fetches trending players
 */
app.get("/api/players/trending", async (req, res) => {
  try {
    const response = await axios.get("https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending", {
      headers: apiHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching trending players:", error.message);
    res.status(500).json({ error: "Failed to fetch trending players" });
  }
});

/**
 * Route: GET /api/schedule
 * Description: Fetches schedule
 */
app.get("/api/schedule", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international",
      { headers: apiHeaders }
    );

    // Filter out adDetail entries and keep only scheduleAdWrapper with matchScheduleList
    const scheduleData = response.data.matchScheduleMap.filter(
      (entry) =>
        entry.scheduleAdWrapper &&
        entry.scheduleAdWrapper.matchScheduleList &&
        entry.scheduleAdWrapper.matchScheduleList.length > 0
    );

    res.json(scheduleData);
  } catch (error) {
    console.error("Error fetching schedule:", error.message);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});

/**
 * Route: GET /api/standings
 * Description: Fetches standings
 */
app.get("/api/standings", async (req, res) => {
  try {
    // Get the match type (1 for World Test Championship, 2 for World Cup Super League)
    const matchType = req.query.matchType || 1;  // Default to 1 (World Test Championship)

    const response = await axios.get(
      `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/iccstanding/team/matchtype/${matchType}`,
      { headers: apiHeaders }
    );

    // Extract and structure the data to only return relevant standings
    const standingsData = response.data.headers.map((header, index) => {
      return {
        rank: response.data.values[index]?.value[0],
        teamId: response.data.values[index]?.value[1],
        teamName: response.data.values[index]?.value[2],
        pct: response.data.values[index]?.value[3],
      };
    });

    res.json(standingsData);
  } catch (error) {
    console.error("Error fetching standings:", error.message);
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});