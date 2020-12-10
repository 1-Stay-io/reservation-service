const { Client } = require('pg');

const client = new Client({
  database: 'stayio',
});

client.connect()
  .then(console.log('Connected to postgres client.'))
  .catch((e) => console.log(e));

module.exports.client = client;
