const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const usersWriter = csvWriter();
const listingsWriter = csvWriter();
const reservationsWriter = csvWriter();

const random = (num, skew = 1) => (
  Math.floor(Math.random() ** skew * num)
);

const addDays = (date, days) => {
  const day = new Date(date);
  const result = new Date(day.setDate(day.getDate() + days));
  return result.toDateString();
};

const dataGenUser = () => {
  usersWriter.pipe(fs.createWriteStream('./csv/users.csv'));
  for (let i = 1; i <= 100; i += 1) {
    usersWriter.write({
      id: i,
      name: faker.name.findName(),
    });
  }
  usersWriter.end();
  console.log('done user');
};

const dataGenListings = async () => {
  listingsWriter.pipe(fs.createWriteStream('./csv/listings.csv'));
  reservationsWriter.pipe(fs.createWriteStream('./csv/reservations.csv'));
  let reservationId = 0;
  let reviewAmount;
  let listingInfo;
  const startDate = new Date();
  for (let i = 1; i <= 100; i += 1) {
    listingInfo = {
      id: i,
      name: faker.lorem.words(random(2) + 1),
      maxStay: random(30) + 2,
      maxGuests: random(12) + 4,
      feePerNight: random(250) + 50,
      feeCleaning: random(3) ? random(50) + 50 : 0,
      feeService: random(20) + 5,
      owner: random(1000000) + 1,
    }
    listingsWriter.write(listingInfo);
    reviewAmount = random(21);
    dataGenReservations(reservationId + 1, reviewAmount, startDate, listingInfo);
    reservationId += reviewAmount;
  }
  listingsWriter.end();
  reservationsWriter.end();
  console.log('done listings / bookings');
};

// listingInfo = {id, name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner}
const dataGenReservations = (startingId, reviewAmount, startDate, listingInfo) => {
  let checkin = startDate;
  let checkout;
  let maxGuests;
  let adults;
  let children;
  let infants;
  let guestId;
  let stayLength;
  let totalCost;
  for (let i = 0; i < reviewAmount; i += 1) {
    if ((startingId + i) % 50 === 0) {
      console.log('+200000 into reservations');
    }
    checkin = addDays(checkin, random(7) + 1);
    maxGuests = listingInfo.maxGuests;
    adults = random(maxGuests) + 1;
    maxGuests -= adults;
    children = maxGuests ? random(maxGuests) : 0;
    maxGuests -= children;
    infants = maxGuests ? random(maxGuests) : 0;
    stayLength = random(listingInfo.maxStay) + 1;
    checkout = addDays(checkin, stayLength);
    totalCost = (listingInfo.feePerNight * stayLength) + listingInfo.feeCleaning + listingInfo.feeService;
    totalCost = (totalCost * 1.12).toFixed(2);
    guestId = random(1000000) + 1;

    reservationsWriter.write({
      id: startingId + i,
      checkInDate: checkin,
      checkOutDate: checkout,
      adults,
      children,
      infants,
      totalCost,
      listing_id: listingInfo.id,
      user_id: guestId,
    });

    checkin = checkout;
  }
};

function dataGen() {
  dataGenUser();
  dataGenListings();
}

dataGen();
