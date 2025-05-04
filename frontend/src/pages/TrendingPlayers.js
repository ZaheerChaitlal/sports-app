import React, { useEffect, useState } from "react";
import axios from "axios";

const TrendingPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/players/trending")
      .then((res) => {
        setPlayers(res.data.player || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching players:", err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="players-page">
      <h2>Trending Players</h2>
      {loading ? (
        <p>Loading trending players...</p>
      ) : (
        <div className="players-grid">
          {players.map((player) => (
            <div className="player-card" key={player.id}>
              <h3>{player.name}</h3>
              <p>Team: {player.teamName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPlayers;
