import { useState, useEffect } from "react";
import './Charts.css';

function Charts() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shazam.p.rapidapi.com/charts/track", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b9740fa6c8mshcfbe379cc0c834ep189a63jsnb5a97a362bb7",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.tracks || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h2>Top Charts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="songs-list">
          {songs.map((song) => (
            <div key={song.key} className="song-card">
              <img src={song.images?.coverart} alt={song.title} />
              <h4>{song.title}</h4>
              <p>{song.subtitle}</p>
              {song.hub?.actions?.[1]?.uri ? (
                <audio controls src={song.hub.actions[1].uri}></audio>
              ) : (
                <p>Preview not available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Charts;
