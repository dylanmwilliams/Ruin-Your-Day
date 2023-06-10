import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const SongListEntry = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const audioRef = useRef(null);

  const convertDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const playAudio = async () => {
      setIsPlaying(false);
      if (audioRef.current) {
        await audioRef.current.load();
        if (isPlaying) {
          await audioRef.current.play();
        }
      }
    };
    playAudio();
  }, [song]);

  const handleFavoriteClick = () => {
    const newFavoritedStatus = !favorited;
    setFavorited(newFavoritedStatus);

    axios.post('classes/favorite', {
      song,
      isFavorited: newFavoritedStatus,
    })
      .then((response) => {
        console.log(song)
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='song-entry'>
      <div
        className='album-art'
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => setShowPlayButton(false)}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <span className="material-icons" style={{ fontSize: 50, color: 'grey', backgroundColor: 'black' }}>music_note</span>
        {showPlayButton
          && <span className="material-icons" style={{ position: 'absolute', fontSize: 50, color: isPlaying ? 'red' : 'white' }}>{isPlaying ? 'pause' : 'play_arrow'}</span>
        }
      </div>
      <div className='song-details'>
      <div className='song-title'>
      <a className="song-link" href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">{song.name}</a>
      </div>
        <div className='song-artist'>{song.artists[0].name}</div>
      </div>
      <div className='song-actions'>
        <span className="material-icons" style={{ fontSize: 30 }} onClick={handleFavoriteClick}>{favorited ? 'favorite' : 'favorite_border'}</span>
        <div className='song-duration'>{convertDuration(song.duration_ms)}</div>
      </div>
      {song.preview_url
        && <audio ref={audioRef} key={song.uri} style={{ display: 'none' }}>
          <source src={song.preview_url} type="audio/mpeg"/>
        </audio>
      }
    </div>
  );
};

export default SongListEntry;
