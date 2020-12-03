DROP SCHEMA IF EXISTS bookings CASCADE;

CREATE SCHEMA bookings;
  CREATE TABLE bookings.listings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    owner VARCHAR(70),
    name VARCHAR(70),
    fees json
  );

  CREATE TABLE bookings.users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(70)
  );

  CREATE TABLE bookings.reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    listing_id uuid references bookings.listings(id),
    user_id uuid references bookings.users(id),
    checkInDate date,
    checkOutDate date,
    guests json,
    totalCost NUMERIC(8, 2)
  );
