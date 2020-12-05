CREATE KEYSPACE bookings WITH replication =
{'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TYPE bookings.fees (
  perNight decimal,
  cleaning decimal,
  service decimal );

CREATE TYPE bookings.guests (
  adults int,
  children int,
  infants int );

CREATE TABLE bookings.listings (
  listing_id int,
  owner text,
  owner_id int,
  name text,
  maxGuests int,
  maxStay int,
  fees frozen<fees>,
  PRIMARY KEY (listing_id) )
WITH comment = 'Q1. Find information about a listing';

CREATE TABLE bookings.reservations_by_listing (
  listing_id int,
  reservation_id int,
  user text,
  user_id int,
  checkInDate date,
  checkOutDate date,
  guests frozen<guests>,
  cost decimal,
  PRIMARY KEY (listing_id) )
WITH comment = 'Q2. Find all reservations by listing id';

CREATE TABLE bookings.reservations (
  reservation_id int,
  listing_id int,
  user text,
  user_id int,
  checkInDate date,
  checkOutDate date,
  guests frozen<guests>,
  cost decimal,
  PRIMARY KEY (reservation_id) )
WITH comment = 'Q3. Find reservation by reservation id';