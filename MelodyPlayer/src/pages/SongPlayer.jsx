import { useLocation } from "react-router-dom";
import "./SongPlayer.css";
import { useState } from "react";

function SongPlayer(){
    const { state } = useLocation();
    const song = state?.track;
    const [liked, setLiked] = useState(false);
    const [playing, setPlaying] = useState(false);

    const toggleLike = () => {
        setLiked (true);
        setTimeout(() => setLiked(false),1500);
    };

    const togglePlay = () => {
  const audio = document.getElementById("audio");
  if (!playing) {
    audio.play();
    setPlaying(true);
  } else {
    audio.pause();
    setPlaying(false);
  }
};

    if(!song) return  <p>Song not found</p>;

    return(
        <div className="player-page">
            <div className={`disk ${playing ? "rotate" : ""}`}>
                <img src={song.album.images[0].url} alt={song.name} />

            </div>
            <button className="like-btn" onClick={toggleLike}>❤️</button>
            {liked && <div className="hearts">❤️❤️❤️</div> }

            <h2>{song.name}</h2>
            <p>{song.artists[0].name}</p>

            <div className="lyrics">
                <p>Lyrics will scroll here...(feature coming soon)</p>
            </div>

            <audio id="audio" src={song.preview_urL}></audio>

            <button className="play-btn" onClick={togglePlay}>
                {playing ? "⏸️" : "▶️"}
            </button>

        </div>
    );

}

export default SongPlayer;