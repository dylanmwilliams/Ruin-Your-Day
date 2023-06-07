const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/spotify/token', controller.spotify.getToken);
router.get('/spotify/albumTracks', controller.spotify.getAlbumTracks);

module.exports = router;
