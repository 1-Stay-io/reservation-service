const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const usersWriter = csvWriter();
const listingsWriter = csvWriter();
const reservationsWriter = csvWriter();

const random = (num, skew = 1) => (
  Math.floor(Math.random() ** skew * num)
);

const dataGenUser = () => {
  usersWriter.pipe(fs.createWriteStream('./csv/users.csv'));
  for (let i = 1; i <= 1000; i += 1) {
    usersWriter.write({
      id: i,
      name: faker.name.findName(),
    });
  }
  usersWriter.end();
  console.log('done user');
};

const dataGenListings = () => {
  listingsWriter.pipe(fs.createWriteStream('./csv/listings.csv'));
  let reservationId = 1;
  let reviewAmount;
  let listingInfo;
  const startDate = new Date();
  for (let i = 1; i <= 1000; i += 1) {
    listingInfo = {
      id: i,
      name: faker.lorem.words(random(2) + 1),
      maxStay: random(30) + 2,
      maxGuests: random(12) + 4,
      feePerNight: random(250) + 50,
      feeCleaning: random(3) ? random(50) + 5 : 0,
      feeService: random(20) + 5,
      owner: random(1000000) + 1,
    }
    listingsWriter.write(listingInfo);
    reviewAmount = random(21);
    dataGenReservations(reservationId, reviewAmount, startDate, listingInfo);
    reservationId += reviewAmount;
  }
  listingsWriter.end();
  console.log('done listings');
};

// listingInfo = {id, name, maxStay, maxGuests, feePerNight, feeCleaning, feeService, owner}
const dataGenReservations = (startingId, reviewAmount, startDate, listingInfo) => {
  reservationsWriter.pipe(fs.createWriteStream('./csv/reservations.csv'));
  let checkin = startDate;
  let maxGuests;
  let adults;
  let children;
  let infants;
  let guestId;
  let stayLength;
  let totalCost;

  for (let i = 0; i <= reviewAmount; i += 1) {
    checkin += random(7);
    maxGuests = listingInfo.maxGuests;
    adults = random(maxGuests) + 1;
    maxGuests -= adults;
    children = maxGuests ? random(maxGuests) : 0;
    maxGuests -= children;
    infants = maxGuests ? random(maxGuests) : 0;
    stayLength = random(listingInfo.maxStay) + 1;
    totalCost = (listingInfo.feePerNight * stayLength) + listingInfo.feeCleaning + listingInfo.feeService;
    totalCost *= 1.12;
    guestId = random(1000000);

    reservationsWriter.write({
      id: startingId + i,
      checkInDate: checkin,
      checkOutDate: checkin + stayLength,
      adults,
      children,
      infants,
      totalCost,
      listing_id: listingInfo.id,
      user_id: guestId,
    });

    checkin += stayLength;
  }
  reservationsWriter.end();
};

async function dataGen() {
  await dataGenUser();
  await dataGenListings();
  await dataGenReservations();
}

dataGen();
