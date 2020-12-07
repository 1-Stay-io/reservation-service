/* eslint-disable no-console */
const path = require('path');
const db = require('./client.js');

const usersPath = path.join(__dirname, './csv/users.csv');
const listingsPath = path.join(__dirname, './csv/listings.csv');
const reservationsPath = path.join(__dirname, './csv/reservations.csv');

// (async () => {
//   const client = await db.client.connect();

//   try {
//     await client.query('BEGIN');
//     await client.query('')
//   }
// })

console.time('Postgres user seeding.');
db.client.query(
  `COPY bookings.users(id, name) FROM '${usersPath}' DELIMITER ',' CSV HEADER`,
  (err) => {
    if (err) {
      console.log('Postgres user seeding error', err);
    } else {
      console.timeEnd('Postgres user seeding.');
      console.log('Postgres user seeding success!');
    }
  },
);

console.time('Postgres listings seeding.');
db.client.query(
  `COPY bookings.listings(id, name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner) FROM '${listingsPath}' DELIMITER ',' CSV HEADER`,
  (err) => {
    if (err) {
      console.log('Postgres listings seeding error', err);
    } else {
      console.timeEnd('Postgres listings seeding.');
      console.log('Postgres listings seeding success!');
    }
  },
);

console.time('Postgres reservations seeding.');
db.client.query(
  `COPY bookings.reservations(checkInDate, checkOutDate, adults, children, infants, totalCost, listing_id, user_id) FROM '${reservationsPath}' DELIMITER ',' CSV HEADER`,
  (err) => {
    if (err) {
      console.log('Postgres reservations seeding error', err);
    } else {
      console.timeEnd('Postgres reservations seeding.');
      console.log('Postgres reservation seeding success!');
    }
  },
);
