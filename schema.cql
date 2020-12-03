CREATE KEYSPACE bookings WITH replication =
{'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TYPE bookings.fees (
  perNight int,
  cleaning int,
  service int );

CREATE TYPE bookings.guests (
  adults int,
  children int,
  infants int );

CREATE TABLE bookings.listings (
  listing_id uuid,
  owner text,
  owner_id uuid,
  name text,
  maxGuests int,
  maxStay int,
  fees frozen<fees>,
  PRIMARY KEY (listing_id) )
WITH comment = 'Q1. Find information about a listing';

CREATE TABLE bookings.reservations_by_listing (
  listing_id uuid,
  reservation_id uuid,
  user text,
  user_id uuid,
  checkInDate date,
  checkOutDate date,
  guests frozen<guests>,
  cost int
  PRIMARY KEY (listing_id) )
WITH comment = 'Q2. Find all reservations by listing id';

CREATE TABLE bookings.reservations (
  reservation_id uuid,
  listing_id uuid,
  user uuid,
  checkInDate date,
  checkOutDate date,
  guests frozen<guests>,
  cost int
  PRIMARY KEY (reservation_id) )
WITH comment = 'Q3. Find reservation by reservation id';