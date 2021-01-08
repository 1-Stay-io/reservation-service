const db = require('../server/client');

db.pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});
// single complex query no loops
module.exports.get = (req, res) => {
  const id = req.params.listingId;
  db.pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`
      SELECT l.*, u.name, JSON_agg(json_build_object('checkindate', r.checkindate, 'checkoutdate', r.checkoutdate)) AS reserved
      FROM bookings.listings l
      INNER JOIN bookings.reservations r ON l.listing_id = r.listing_id
      INNER JOIN bookings.users u ON l.owner=u.user_id
      WHERE l.listing_id = ${id} group by l.listing_id, u.name`, (err, data) => {
      done();

      if (err) {
        res.sendStatus(404);
      } else {
        const d = data.rows;
        const result = {
          id,
          owner: d[0].name,
          name: d[0].listing_name,
          reserved: d[0].reserved,
          fees: {
            pernight: d[0].feepernight,
            cleaning: d[0].feecleaning,
            service: d[0].feeservice,
          },
        };
        res.status(200).json(result);
      }
    });
  });
};

module.exports.add = async (req, res) => {
  const json = JSON.stringify(req.body);
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`
    INSERT INTO bookings.listings(listing_name,maxstay,maxguests,feepernight,feecleaning,feeservice,owner)
    SELECT listing_name,maxstay,maxguests,feepernight,feecleaning,feeservice,owner
    FROM json_populate_record (NULL::bookings.listings, '${json}')`);
    await client.query('COMMIT');
    await res.sendStatus(202);
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
    res.sendStatus(404);
  } finally {
    client.release();
  }
};

module.exports.update = async (req, res) => {
  const keys = Object.keys(req.body);
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`
    UPDATE bookings.listings SET (${keys}) = (SELECT ${keys} FROM json_populate_record (NULL::bookings.listings, '${JSON.stringify(req.body)}'))
    WHERE listings_id = ${req.params.id}`);
    await client.query('COMMIT');
    await res.sendStatus(202);
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.delete = async (req, res) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`DELETE FROM bookings.listings WHERE listings_id = ${req.params.id}`);
    await client.query('COMMIT');
    await res.sendStatus(202);
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
