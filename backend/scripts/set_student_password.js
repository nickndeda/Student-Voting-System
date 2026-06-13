const db = require("../src/config/db");
const { hashPassword, isValidBcryptHash } = require("../src/utils/password");

const [registrationNumber, password] = process.argv.slice(2);

const query = (sql, params) => new Promise((resolve, reject) => {
  db.query(sql, params, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
});

const closeDb = () => {
  db.end();
};

(async () => {
  try {
    if (!registrationNumber || !password) {
      console.error("Usage: npm run set-student-password -- <registrationNumber> <newPassword>");
      process.exitCode = 1;
      return;
    }

    const passwordHash = await hashPassword(password);

    if (!isValidBcryptHash(passwordHash)) {
      throw new Error("Generated password hash is invalid");
    }

    const result = await query(
      "UPDATE students SET password_hash = ? WHERE registration_number = ?",
      [passwordHash, registrationNumber]
    );

    if (result.affectedRows === 0) {
      console.error(`No student found for registration number ${registrationNumber}`);
      process.exitCode = 1;
      return;
    }

    console.log(`Password reset for ${registrationNumber}`);
  } catch (error) {
    console.error("Failed to reset student password:", error.message);
    process.exitCode = 1;
  } finally {
    closeDb();
  }
})();
