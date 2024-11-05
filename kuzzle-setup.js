const {
    Kuzzle,
    WebSocket
  } = require('kuzzle-sdk');
  
  const kuzzle = new Kuzzle(new WebSocket('localhost'));
  
  kuzzle.connect()
    .then(() => {
      console.log('Connected to Kuzzle');
    })
    .catch(error => {
      console.error('Connection error:', error);
    });
  
  module.exports = kuzzle;
  