import React, { useEffect, useState } from "react";
import axios from "axios";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/schedule")
      .then((res) => {
        setSchedule(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schedule:", err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="schedule-page">
      <h2>International Match Schedule</h2>
      {loading ? (
        <p>Loading schedule...</p>
      ) : (
        schedule.map((day) => (
          <div key={day.scheduleAdWrapper.date} className="schedule-day">
            <h3>{day.scheduleAdWrapper.date}</h3>
            {day.scheduleAdWrapper.matchScheduleList.map((match, idx) => (
              <div key={idx} className="match-card">
                <h4>{match.seriesName}</h4>
                {match.matchInfo.map((info) => (
                  <div key={info.matchId}>
                    <p><strong>{info.matchDesc}</strong> ({info.matchFormat})</p>
                    <p>{info.team1.teamName} vs {info.team2.teamName}</p>
                    <p>Venue: {info.venueInfo.ground}, {info.venueInfo.city}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;
