const db = require('../src/config/db');

const sql = `SELECT student_id, registration_number, has_voted, voted_at FROM students WHERE has_voted = 1`;

db.query(sql, (err, results) => {
  if (err) {
    console.error('DB error:', err.message || err);
    process.exit(1);
  }

  if (!results.length) {
    console.log('No students with has_voted = 1 found');
    process.exit(0);
  }

  results.forEach((r) => {
    console.log(`student_id=${r.student_id} reg=${r.registration_number} has_voted=${r.has_voted} voted_at=${r.voted_at}`);
  });

  process.exit(0);
});
