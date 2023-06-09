const spotify = require('./spotify.js');

const filters = {
  'Thinkin bout death': ['5p64XgvFREt1P6mC7Xl6XN', '6fFp2F91noBeodV88bRwTD', '0KBdfMTMxi0oD1oVqApTjr', '6yskFQZNlLYhkchAxELHi6', '64xtjfsPHNHch0CZ7fPTjS'],
  'Chewing on a piece of straw': ['7DNPQByO5bZDo8Kdph5KOC', '5aEtg4dxdBk4pj6SJ3hNsM', '62SqkhUnO18912vRKmOUKy', '1PKjSrF8akT4Kp3L9QPv11', '7CtCXkh08GXDrPHsrxAWKQ'],
};

const pickTwoRandomTracks = (tracks) => [
  tracks[Math.floor(Math.random() * tracks.length)],
  tracks[Math.floor(Math.random() * tracks.length)],
];

module.exports = {

  applyFilter: (token, filterName) => {
    const albumIds = filters[filterName];

    const trackPromises = albumIds
      .map((albumId) => spotify.getAlbumTracksFromSpotify(token, albumId)
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
