const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/spotify/token', controller.spotify.getToken);
router.get('/spotify/albumTracks', controller.spotify.getAlbumTracks);

router.post('/spotify/filter', (req, res) => {
  const { filter, token } = req.body;
  controller.filters.applyFilter(token, filter)
    .then((songs) => res.json(songs))
    .catch((err) => {
      console.error('Error getting the songs', err);
    });
});

module.exports = router;
