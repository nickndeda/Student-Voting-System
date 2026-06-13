const db = require('../src/config/db');

db.query("SHOW TABLES LIKE 'complaints'", (err, results) => {
  if (err) {
    console.error('SHOW TABLES error', err);
    db.end();
    process.exit(1);
  }

  console.log('complaints table:', results);

  if (!results.length) {
    console.error('complaints table does not exist');
    db.end();
    process.exit(1);
  }

  db.query('SHOW CREATE TABLE complaints', (err2, results2) => {
    if (err2) {
      console.error('SHOW CREATE TABLE error', err2);
      db.end();
      process.exit(1);
    }

    console.log(JSON.stringify(results2, null, 2));
    db.end();
    process.exit(0);
  });
});
