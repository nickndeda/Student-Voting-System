const bcrypt = require("bcrypt");

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

const isValidBcryptHash = (hash) => (
  typeof hash === "string" &&
  hash.length === 60 &&
  BCRYPT_HASH_PATTERN.test(hash)
);

const comparePassword = async (password, passwordHash) => {
  if (!isValidBcryptHash(passwordHash)) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
};

const hashPassword = (password) => bcrypt.hash(password, 10);

module.exports = {
  comparePassword,
  hashPassword,
  isValidBcryptHash,
};
