const { Client } = require('pg');

const client = new Client({
  database: 'stayio',
});

module.exports.client = client;
