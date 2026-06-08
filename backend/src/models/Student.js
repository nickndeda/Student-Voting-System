const db = require("../config/db");

const findStudentByRegNo = (registrationNumber) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM students WHERE registration_number = ?",
      [registrationNumber],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

module.exports = {
  findStudentByRegNo,
};