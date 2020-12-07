DROP SCHEMA IF EXISTS bookings CASCADE;

CREATE SCHEMA bookings;
  CREATE TABLE bookings.users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(70)
  );

  CREATE TABLE bookings.listings (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(70),
    maxStay NUMERIC(3),
    maxGuests NUMERIC(2),
    feePerNight NUMERIC(3),
    feeCleaning NUMERIC(2),
    feeService NUMERIC(2),
    owner INT references bookings.users(id) ON DELETE CASCADE
  );

  CREATE TABLE bookings.reservations (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    checkInDate date,
    checkOutDate date,
    adults NUMERIC(2),
    children NUMERIC(2),
    infants NUMERIC(2),
    totalCost NUMERIC(8, 2),
    listing_id INT references bookings.listings(id) ON DELETE CASCADE,
    user_id INT references bookings.users(id) ON DELETE CASCADE
  );
