ALTER TABLE bookings.listings ADD CONSTRAINT owner_fk FOREIGN KEY (owner) REFERENCES bookings.users(id) ON DELETE CASCADE NOT VALID;
ALTER TABLE bookings.reservations ADD CONSTRAINT listing_id_fk FOREIGN KEY (listing_id) REFERENCES bookings.listings(id) ON DELETE CASCADE NOT VALID;
ALTER TABLE bookings.reservations ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES bookings.users(id) ON DELETE CASCADE NOT VALID;

CREATE INDEX owner_idx ON bookings.listings(owner);
CREATE INDEX listing_idx ON bookings.reservations(listing_id);