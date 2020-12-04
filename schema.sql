DROP SCHEMA IF EXISTS bookings CASCADE;

CREATE SCHEMA bookings;
  CREATE TABLE bookings.users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(70)
  );

  CREATE TABLE bookings.listings (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(70),
    maxStay NUMERIC(3),
    maxGuests NUMERIC(2),
    feePerNight NUMERIC(3),
    feeCleaning NUMERIC(2),
    feeService NUMERIC(2),
    owner INTEGER references bookings.users(id)
  );

  CREATE TABLE bookings.reservations (
    id SERIAL PRIMARY KEY NOT NULL,
    checkInDate date,
    checkOutDate date,
    adults NUMERIC(2),
    children NUMERIC(2),
    infant NUMERIC(2),
    totalCost NUMERIC(8, 2),
    listing_id INTEGER references bookings.listings(id),
    user_id INTEGER references bookings.users(id)
  );
