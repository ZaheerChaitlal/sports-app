import React, { useEffect, useState } from "react";
import axios from "axios";

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("international");

  const fetchSeries = (selectedType) => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/series/${selectedType}`)
      .then((res) => {
        const data = res.data.seriesMapProto || [];
        const flatList = data.flatMap(item =>
          item.series.map(ser => ({
            ...ser,
            month: item.date
          }))
        );
        setSeriesList(flatList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching series:", err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSeries(type);
  }, [type]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="series-page">
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Series</h2>

      <div className="dropdown-container">
        <label htmlFor="type">Select Type: </label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="international">International</option>
          <option value="league">League</option>
          <option value="domestic">Domestic</option>
          <option value="women">Women</option>
        </select>
      </div>

      {loading ? (
        <p>Loading series...</p>
      ) : (
        <div className="series-grid">
          {seriesList.map((series) => (
            <div key={series.id} className="series-card">
              <h3>{series.name}</h3>
              <p>{series.month}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Series;
