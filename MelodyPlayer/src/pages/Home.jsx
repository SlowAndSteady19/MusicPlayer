import './Home.css';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getSpotifyToken from "../services/spotifyToken";

function Home() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setQuery("");
    setSongs([]);
  }, [location.pathname]);

  const searchSongs = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const token = await getSpotifyToken();
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=25`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setSongs(data.tracks.items || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page home-page">
      <div className="home-content">
        <div className="profile-icon">👤</div>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search for songs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" onClick={searchSongs}>Search</button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            🔍 Searching for results...
          </p>
        ) : songs.length > 0 ? (
          <div className="section">
            <h3>Search Results</h3>
            <div className="songs-list">
              {songs.map((track) => (
                <div
                  key={track.id}
                  className="song-card"
                  onClick={() =>
                    navigate(`/song/${track.id}`, { state: { track } })
                  }
                >
                  <img src={track.album.images[0]?.url} alt={track.name} />
                  <h4>{track.name}</h4>
                  <p>{track.artists[0]?.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="welcome-text">Welcome to MelodyPlayer 🎵</p>

            <div className="section">
              <h3>Recently played</h3>
              <div className="card-row">
                <div className="card">Album1</div>
                <div className="card">Album2</div>
                <div className="card">Album3</div>
              </div>
            </div>

            <div className="section">
              <h3>Your playlist</h3>
              <div className="card-row">
                <div className="card">Playlist1</div>
                <div className="card">Playlist2</div>
                <div className="card">Playlist3</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
