import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongListEntry from './SongListEntry.jsx';

const SongList = ({ songs, setSongs }) => {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [displayedSongs, setDisplayedSongs] = useState([]);

  const updateSong = (updatedSong) => {
    setSongs(songs.map((song) => (song.id === updatedSong.id ? updatedSong : song)));
  };

  const showFavorites = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        let response;
        if (showOnlyFavorites) {
          response = await axios.get('classes/favorite');
          if (response.data && response.data.length) {
            setDisplayedSongs(response.data.map((song) => song.song));
          } else {
            setDisplayedSongs([]);
          }
        } else {
          setDisplayedSongs(songs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, [showOnlyFavorites, songs]);

  return (
    <div className='song-list'>
      <button className='favorites-button' onClick={showFavorites}>Show {showOnlyFavorites ? 'All' : 'Favorites'}</button>
      {displayedSongs && displayedSongs.map((song, index) => (
        <SongListEntry key={index} song={song} updateSong={updateSong} />
      ))}
    </div>
  );
};

export default SongList;
