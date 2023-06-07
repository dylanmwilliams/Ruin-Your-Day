const spotify = require('./spotify.js');

const filters = {
  'Thinkin bout death': ['5p64XgvFREt1P6mC7Xl6XN', '6fFp2F91noBeodV88bRwTD', '0KBdfMTMxi0oD1oVqApTjr', '6yskFQZNlLYhkchAxELHi6', '64xtjfsPHNHch0CZ7fPTjS'],
};

const pickTwoRandomTracks = (tracks) => [
  tracks[Math.floor(Math.random() * tracks.length)],
  tracks[Math.floor(Math.random() * tracks.length)],
];

module.exports = {

  applyFilter: (token, filterName) => {
    const albumIds = filters[filterName];

    const trackPromises = albumIds.map((albumId) => spotify.getAlbumTracks(token, albumId)
      .then(pickTwoRandomTracks)
      .catch((err) => {
        console.error('Error mapping album tracks', err);
      }));

    return Promise.all(trackPromises)
      .then((trackArrays) => [].concat(...trackArrays))
      .catch((err) => {
        console.error('Error returning track promises', err);
      });
  },
};
