const router = require('express').Router();
const { Song } = require('./db');

const controller = require('./controllers/index.js');

router.get('/spotify/token', controller.spotify.getToken);
router.get('/spotify/albumTracks', controller.spotify.getAlbumTracks);

router.post('/spotify/filter', (req, res) => {
  const { filterName, token } = req.body;
  controller.filters.applyFilter(token, filterName)
    .then((songs) => {
      res.json(songs);
    })
    .catch((err) => {
      console.error('Error getting the songs', err);
    });
});

router.post('/favorite', (req, res) => {
  const { song } = req.body;

  const newSong = new Song({
    song,
    favorited: true,
  });

  newSong.save()
    .then(() => res.json({ message: 'Song successfully added to favorites!' }))
    .catch((err) => {
      console.error('Error posting song', err);
      res.status(400).json(`Error: ${err}`);
    });
});

router.get('/favorite', (req, res) => {
  Song.find({ favorited: true })
    .then((songs) => res.json(songs))
    .catch((err) => {
      console.error('Error getting favorites', err);
      res.status(400).json(`Error: ${err}`);
    });
});

module.exports = router;
