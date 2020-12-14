const db = require('../dbPostgres/client');

// const listingSchema = new mongoose.Schema({
//   id: Number,
//   owner: String,
//   name: String,
//   reserved: [Date],
//   fees: {
//     pernight: Number,
//     cleaning: Number,
//     service: Number,
//   },
// });

// 1 query with for loop
module.exports.get = (req, res) => {
  const id = req.params.listingId;
  db.client.query(`
  SELECT * FROM bookings.listings l
  INNER JOIN bookings.reservations r ON l.id = r.listing_id
  INNER JOIN bookings.users u ON l.owner=u.id
  WHERE l.id = ${id}`, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      const d = data.rows;
      const result = {
        id,
        owner: d[0].name,
        name: d[0].listing_name,
        reserved: [],
        fees: {
          pernight: d[0].feepernight,
          cleaning: d[0].feecleaning,
          service: d[0].feeservice,
        },
      };
      let dates;
      for (let i = 0; i < d.length; i += 1) {
        dates = [d[i].checkindate, d[i].checkoutdate];
        result.reserved.push(dates);
      }
      console.log(result);
      res.status(200).json(result);
    }
  });
};
