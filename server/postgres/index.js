/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const Listings = require('../../controller/listings');
// const Reservations = require('../../controller/reservations');

const port = 3002;
const app = express();

// app.use(morgan('dev'));
app.use(express.json());
app.use('/listings/:listingId', express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.get('/api/listings/:listingId/', Listings.get);
// app.get('/api/listings/:listingId/reservations/', Reservations.getAll);
app.post('/api/listings/', Listings.add);
// app.post('/api/listings/:listingId/reservation/', Reservations.add);
// app.patch('/api/listings/:listingId/', Listings.update);
// app.delete('/api/listing/:listingId', Listings.delete);
// app.delete('/api/reservation/:id', Reservations.delete);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
