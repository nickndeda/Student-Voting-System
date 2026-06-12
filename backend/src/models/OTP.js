const db = require("../config/db");

const saveOtp = (studentId, otpValue, expiresAt) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO otps (student_id, otp_value, expires_at, used, created_at) VALUES (?, ?, ?, 0, NOW())`;
    db.query(sql, [studentId, otpValue, expiresAt], (err, result) => {
      if (err) return reject(err);
      resolve({ otp_id: result.insertId });
    });
  });
};

const findValidOtp = (studentId, otpValue) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM otps WHERE student_id = ? AND otp_value = ? AND used = 0 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`;
    db.query(sql, [studentId, otpValue], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const markOtpUsed = (otpId) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE otps SET used = 1 WHERE otp_id = ?`;
    db.query(sql, [otpId], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = {
  saveOtp,
  findValidOtp,
  markOtpUsed,
};
 