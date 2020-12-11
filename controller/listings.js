const db = require('../dbPostgres/client');

// single query with for-loop
// module.exports.get = (req, res) => {
//   const id = req.params.listingId;
//   db.client.query(`
//   SELECT * FROM bookings.listings l
//   INNER JOIN bookings.reservations r ON l.id = r.listing_id
//   INNER JOIN bookings.users u ON l.owner=u.id
//   WHERE l.id = ${id}`, (err, data) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       const d = data.rows;
//       const result = {
//         id: d[0].id,
//         owner: d[0].name,
//         name: d[0].listing_name,
//         reserved: [],
//         fees: {
//           pernight: d[0].feepernight,
//           cleaning: d[0].feecleaning,
//           service: d[0].feeservice,
//         },
//       };
//       let dates;
//       for (let i = 0; i < d.length; i += 1) {
//         dates = [d[i].checkindate, d[i].checkoutdate];
//         result.reserved.push(dates);
//       }
//       res.status(200).json(result);
//     }
//   });
// };

// single complex query no loops
module.exports.get = (req, res) => {
  const id = req.params.listingId;
  db.client.query(`
  SELECT l.*, u.name, JSON_agg(json_build_object('checkindate', r.checkindate, 'checkoutdate', r.checkoutdate))
  FROM bookings.listings l
  INNER JOIN bookings.reservations r ON l.id = r.listing_id
  INNER JOIN bookings.users u ON l.owner=u.id
  WHERE l.id = ${id} group by l.id, u.name`, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      const d = data.rows;
      const result = {
        id,
        owner: d[0].name,
        name: d[0].listing_name,
        reserved: d[0].json_agg,
        fees: {
          pernight: d[0].feepernight,
          cleaning: d[0].feecleaning,
          service: d[0].feeservice,
        },
      };
      res.status(200).json(result);
    }
  });
};

module.exports.add = async (req, res) => {
  const json = JSON.stringify(req.body);

  try {
    await db.client.query(`
    INSERT INTO bookings.listings(listing_name,maxstay,maxguests,feepernight,feecleaning,feeservice,owner)
    SELECT listing_name,maxstay,maxguests,feepernight,feecleaning,feeservice,owner
    FROM json_populate_record (NULL::bookings.listings, '${json}')`);
    await db.client.query('COMMIT');
    await res.sendStatus(202);
  } catch (e) {
    await db.client.query('ROLLBACK');
    console.log(e);
    res.sendStatus(404);
  }
};
