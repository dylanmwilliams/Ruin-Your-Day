require('dotenv').config();
const axios = require('axios');

const { client_id, client_secret } = process.env;

const getAlbumTracksFromSpotify = (token, albumId) => axios({
  url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
  method: 'get',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    console.log('success getting album tracks');
    return response.data.items;
  })
  .catch((err) => {
    console.error('Error getting album tracks', err);
    throw err;
  });

module.exports = {
  getToken: (req, res) => {
    axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      json: true,
    })
      .then((response) => {
        res.status(201).send({
          access_token: response.data.access_token,
        });
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Error getting token', err);
      });
  },

  getAlbumTracks: (req, res) => {
    const { token, albumId } = req.body;
    getAlbumTracksFromSpotify(token, albumId)
      .then((tracks) => {
        console.log('this is tracks >>>>>>>>>', tracks);
        res.status(200).send(tracks);
      })
      .catch((err) => {
        console.error('Error getting album tracks', err);
        res.sendStatus(500);
      });
  },

  getAlbumTracksFromSpotify,
};
