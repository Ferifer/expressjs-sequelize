const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRED,
  }); // Set the expiration time as needed
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Token verification error:", err);
    throw err; // Rethrow the error so it can be handled by the calling function
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
