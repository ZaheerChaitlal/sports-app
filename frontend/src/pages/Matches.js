import React, { useEffect, useState } from "react";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [matchType, setMatchType] = useState("recent");
  const [loading, setLoading] = useState(true);

  const fetchMatches = async (type) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/matches/${type}`);
      const cleanedMatches = res.data.typeMatches
        .flatMap((typeMatch) =>
          typeMatch.seriesMatches
            .map((seriesMatch) => seriesMatch.seriesAdWrapper?.matches || [])
            .flat()
        )
        .filter(
          (match) =>
            match.matchInfo &&
            match.matchInfo.team1 &&
            match.matchInfo.team2
        );

      setMatches(cleanedMatches);
    } catch (err) {
      console.error(`Error fetching ${type} matches:`, err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches(matchType);
  }, [matchType]);

  return (
    <div className="matches-page">
      <h2>{matchType.charAt(0).toUpperCase() + matchType.slice(1)} Matches</h2>

      <div className="dropdown-container">
        <label htmlFor="matchType">Select Match Type: </label>
        <select
          id="matchType"
          value={matchType}
          onChange={(e) => setMatchType(e.target.value)}
        >
          <option value="live">Live</option>
          <option value="recent">Recent</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {loading ? (
        <p>Loading matches...</p>
      ) : (
        <div className="matches-grid">
          {matches.map((match, index) => {
            const info = match.matchInfo;
            return (
              <div className="match-card" key={index}>
                <h3>{info.matchDesc} - {info.matchFormat}</h3>
                <p><strong>Series:</strong> {info.seriesName}</p>
                <p><strong>Teams:</strong> {info.team1.teamName} vs {info.team2.teamName}</p>
                <p><strong>Status:</strong> {info.status}</p>
                <p><strong>Venue:</strong> {info.venueInfo.ground}, {info.venueInfo.city}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Matches;
