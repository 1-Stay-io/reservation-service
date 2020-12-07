/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Listings = require('./controller/listings');
const Reservations = require('./controller/reservations');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/listings/:listingId/reservations/', Listings.getAll);
app.get('/listings/:listingId/', Reservations.get);
app.post('/listings/:listingId/reservation/', Listings.add);
app.post('/listings/', Reservations.add);
app.patch('/listings/:listingId/', Listings.update);
app.delete('/reservation/:id', Reservations.delete);
app.delete('/listing/:listingId', Listings.delete);
