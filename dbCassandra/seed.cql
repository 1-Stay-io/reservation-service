USE bookings;

COPY bookings.listings(listing_id, listing_name, owner, owner_id, maxStay, maxGuests, pernight, cleaning, service) FROM '/Users/victor/Documents/hrsf131/sdc-service/dbCassandra/csv/listings.csv' with HEADER=TRUE and DELIMITER='|';

COPY bookings.reservations_by_listing(reservation_id, listing_id, user_id, checkInDate, checkOutDate, adults, children, infants, totalCost) FROM '/Users/victor/Documents/hrsf131/sdc-service/dbCassandra/csv/reservations.csv' with HEADER=TRUE and delimiter='|';
