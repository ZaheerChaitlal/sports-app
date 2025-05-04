import React, { useEffect, useState } from "react";
import axios from "axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("international");

  const fetchTeams = (selectedCategory) => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/teams/${selectedCategory}`)
      .then((res) => {
        const cleanedTeams = res.data.list.filter((team) => team.teamId);
        setTeams(cleanedTeams);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teams:", err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeams(category);
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="teams-page">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Teams</h2>
      <label htmlFor="matchType">Select Team: </label>
      <select value={category} onChange={handleCategoryChange}>
        <option value="international">International</option>
        <option value="league">League</option>
        <option value="domestic">Domestic</option>
        <option value="women">Women</option>
      </select>

      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <div className="team-card" key={team.teamId}>
              <h3>{team.teamName}</h3>
              <p>Short Name: {team.teamSName || "N/A"}</p>
              {team.countryName && <p>Country: {team.countryName}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
