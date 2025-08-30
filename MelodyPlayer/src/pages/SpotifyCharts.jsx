import { useEffect, useState } from "react";
import "./Charts.css";
import getSpotifyToken from "../services/spotifyToken"; // ✅ correctly imported

function SpotifyCharts() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = await getSpotifyToken(); // ✅ safely gets access token

        const response = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=25",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();
        setSongs(data.albums.items || []);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="page">
      <h2>New Releases Worldwide</h2>
      <div className="songs-list">
        {songs.map((song) => (
          <div key={song.id} className="song-card">
            <img src={song.images[0]?.url} alt={song.name} />
            <h4>{song.name}</h4>
            <p>{song.artists[0]?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotifyCharts;
