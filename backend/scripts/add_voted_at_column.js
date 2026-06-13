const db = require("../src/config/db");

const sql = `ALTER TABLE students ADD COLUMN voted_at DATETIME NULL`;

db.query(sql, (err, result) => {
  if (err) {
    console.error("Could not add voted_at column:", err.message || err);
    process.exit(1);
  }

  console.log("voted_at column added to students table");
  process.exit(0);
});
