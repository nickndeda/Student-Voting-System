const db = require('../src/config/db');

const sql = `
  UPDATE students s
  LEFT JOIN (
    SELECT voter_student_id, MIN(created_at) as first_vote
    FROM votes
    GROUP BY voter_student_id
  ) v ON s.student_id = v.voter_student_id
  SET s.voted_at = v.first_vote
  WHERE s.has_voted = 1 AND (s.voted_at IS NULL OR s.voted_at = '0000-00-00 00:00:00')
`;

db.query(sql, (err, result) => {
  if (err) {
    console.error('Failed to populate voted_at from votes:', err.message || err);
    process.exit(1);
  }

  console.log('Populated voted_at for', result.affectedRows, 'students');
  process.exit(0);
});
