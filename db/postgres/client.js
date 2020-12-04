const { Client } = require('pg');

const client = new Client({
  user: 'victor',
  host: 'localhost',
  database: 'stayio',
  port: 5432,
})

client.connect()
  .then(() => console.log('Connected to Postgres!'))
  .catch(e => console.log(e))
