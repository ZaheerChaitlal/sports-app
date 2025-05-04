import React, { useEffect, useState } from "react";
import axios from "axios";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchType, setMatchType] = useState("1"); // 1 = WTC, 2 = Super League

  const fetchStandings = (selectedType) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/standings?matchType=${selectedType}`)
      .then((res) => {
        setStandings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching standings:", err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStandings(matchType);
  }, [matchType]);

  const handleMatchTypeChange = (e) => {
    setMatchType(e.target.value);
  };

  return (
    <div className="standings-page">
      <h2>
        {
          matchType === "1"
            ? "World Test Championship Standings"
            : "World Cup Super League Standings"
        }
      </h2>

      <div className="dropdown-container">
        <label htmlFor="matchType">Select League: </label>
        <select id="matchType" value={matchType} onChange={handleMatchTypeChange}>
          <option value="1">World Test Championship</option>
          <option value="2">World Cup Super League</option>
        </select>
      </div>

      {loading ? (
        <p>Loading standings...</p>
      ) : (
        <table className="standings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>PCT</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={index}>
                <td>{team.rank}</td>
                <td>{team.teamName}</td>
                <td>{team.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Standings;
