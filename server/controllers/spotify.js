require('dotenv').config();
const axios = require('axios');

const { client_id, client_secret } = process.env;

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
    const { access_token, album } = req.body;
    axios({
      url: 'https://api.spotify.com/v1/search',
      method: 'get',
      params: {
        q: 'album',
        type: 'album',
        limit: 1,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        const albumId = response.data.albums.items[0].id;

        return axios({
          url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          method: 'get',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      })
      .then((response) => {
        console.log('success getting album tracks');
        response.send(200).send(response.data);
      })
      .catch((err) => {
        console.error('Error getting album tracks', err);
        res.sendStatus(500);
      });
  },
};
