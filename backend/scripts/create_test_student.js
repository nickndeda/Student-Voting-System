const bcrypt = require('bcrypt');
const db = require('../src/config/db');

const registrationNumber = 'KNP/CS/001/25';
const password = 'password';
const firstName = 'Test';
const lastName = 'Student';

const query = (sql, params) => new Promise((resolve, reject) => {
  db.query(sql, params, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

(async () => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const existing = await query('SELECT * FROM students WHERE registration_number = ?', [registrationNumber]);

    if (existing && existing.length > 0) {
      await query('UPDATE students SET password_hash = ?, first_name = ?, last_name = ? WHERE registration_number = ?', [passwordHash, firstName, lastName, registrationNumber]);
      console.log('Updated existing student', registrationNumber);
    } else {
      await query('INSERT INTO students (registration_number, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)', [registrationNumber, passwordHash, firstName, lastName]);
      console.log('Inserted new student', registrationNumber);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error creating test student:', err);
    process.exit(1);
  }
})();
