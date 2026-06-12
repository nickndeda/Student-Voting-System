const db = require('../src/config/db');

const sql = `
CREATE TABLE IF NOT EXISTS otps (
  otp_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  otp_value VARCHAR(10) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (student_id),
  INDEX (otp_value)
);
`;

db.query(sql, (err, res) => {
  if (err) {
    console.error('Failed to create otps table:', err);
    process.exit(1);
  }
  console.log('otps table ensured');
  process.exit(0);
});
