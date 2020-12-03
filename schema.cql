CREATE KEYSPACE bookings WITH replication =
{'class': 'SimpleStrategy', 'replication_factor': 3};

CREATE TYPE bookings.fees (
  perNight int,
  cleaning int,
  service int );

CREATE TYPE bookings.guests (
  adults int,
  children int,
  infants int );

CREATE TABLE bookings.listings (
  listing_id uuid PRIMARY KEY,
  owner text,
  name text,
  fees frozen<fees> )
WITH comment = 'Q1. Find information about a listing';

CREATE TABLE bookings.reservations (
  reservation_id uuid PRIMARY KEY,
  listing_id uuid,
  user uuid,
  checkInDate date,
  checkOutDate date,
  guests frozen<guests>,
  cost int )
WITH comment = 'Q2. Find reservation by reservation id';

CREATE TABLE bookings.reservations_by_listing (
  listing_id uuid PRIMARY KEY,
  reservation_id uuid,
  user uuid,
  checkInDate date,
  checkOutDate date,
  guests frozen<guests>,
  cost int )
WITH comment = 'Q3. Find all reservations by listing id';