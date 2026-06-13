const db = require('../src/config/db');

const sql = `ALTER TABLE votes ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`;

db.query(sql, (err, result) => {
  if (err) {
    console.error('Could not add created_at column to votes:', err.message || err);
    process.exit(1);
  }

  console.log('created_at column added to votes table');
  process.exit(0);
});
