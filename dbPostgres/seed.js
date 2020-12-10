/* eslint-disable no-console */
const path = require('path');
const db = require('./client.js');

const usersPath = path.join(__dirname, './csv/users.csv');
const listingsPath = path.join(__dirname, './csv/listings.csv');
const reservationsPath = path.join(__dirname, './csv/reservations.csv');

(async () => {
  try {
    console.time('Postgres seeding');
    // await db.client.query('BEGIN');

    console.time('Postgres user seeding.');
    await db.client.query(`COPY bookings.users(name) FROM '${usersPath}' DELIMITER ',' CSV HEADER`);
    console.timeEnd('Postgres user seeding.');

    console.time('Postgres listings seeding.');
    await db.client.query(`COPY bookings.listings(name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner) FROM '${listingsPath}' DELIMITER ',' CSV HEADER`);
    console.timeEnd('Postgres listings seeding.');

    console.time('Postgres reservations seeding.');
    await db.client.query(`COPY bookings.reservations(checkInDate, checkOutDate, adults, children, infants, totalCost, listing_id, user_id) FROM '${reservationsPath}' DELIMITER ',' CSV HEADER`);
    console.timeEnd('Postgres reservations seeding.');

    await db.client.query('ALTER TABLE bookings.listings ADD CONSTRAINT owner_fk FOREIGN KEY (owner) REFERENCES bookings.users(id) ON DELETE CASCADE NOT VALID');
    await db.client.query('ALTER TABLE bookings.reservations ADD CONSTRAINT listing_id_fk FOREIGN KEY (listing_id) REFERENCES bookings.listings(id) ON DELETE CASCADE NOT VALID');
    await db.client.query('ALTER TABLE bookings.reservations ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES bookings.users(id) ON DELETE CASCADE NOT VALID');

    console.time('indexing');
    await db.client.query('CREATE INDEX owner_idx ON bookings.listings(owner)');
    await db.client.query('CREATE INDEX listing_idx ON bookings.reservations(listing_id)');
    // await db.client.query('COMMIT');
    console.timeEnd('indexing');
  } catch (e) {
    // await db.client.query('ROLLBACK');
    console.log(e);
  } finally {
    console.timeEnd('Postgres seeding');
  }
})().catch((e) => console.error(e.stack));

// console.time('Seeding.');
// console.time('Postgres user seeding.');
// db.client.query(
//   `COPY bookings.users(id, name) FROM '${usersPath}' DELIMITER ',' CSV HEADER`,
//   (err) => {
//     if (err) {
//       console.log('Postgres user seeding error', err);
//     } else {
//       console.timeEnd('Postgres user seeding.');
//       console.log('Postgres user seeding success!');
//     }
//   },
// );

// console.time('Postgres listings seeding.');
// db.client.query(
//   `COPY bookings.listings(id, name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner) FROM '${listingsPath}' DELIMITER ',' CSV HEADER`,
//   (err) => {
//     if (err) {
//       console.log('Postgres listings seeding error', err);
//     } else {
//       console.timeEnd('Postgres listings seeding.');
//       console.log('Postgres listings seeding success!');
//     }
//   },
// );

// console.time('Postgres reservations seeding.');
// db.client.query(
//   `COPY bookings.reservations(checkInDate, checkOutDate, adults, children, infants, totalCost, listing_id, user_id) FROM '${reservationsPath}' DELIMITER ',' CSV HEADER`,
//   (err) => {
//     if (err) {
//       console.log('Postgres reservations seeding error', err);
//     } else {
//       console.timeEnd('Postgres reservations seeding.');
//       console.timeEnd('Seeding.');
//       console.log('Postgres reservation seeding success!');
//     }
//   },
// );
