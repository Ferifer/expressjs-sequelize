// src/utils/securityUtils.js
const bcrypt = require("bcrypt");

const saltRounds = 10; // Number of salt rounds

// Hashes the password using bcrypt
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// Checks the password against the hash
const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  checkPassword,
};
