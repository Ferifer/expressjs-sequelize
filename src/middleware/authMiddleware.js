const { StatusCodes } = require("http-status-codes");
const { verifyToken } = require("../common/utils/jwtUtils");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        defaultBaseResponse(StatusCodes.FORBIDDEN, null, "No token provided!")
      );
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id; // Store user ID for later use
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        defaultBaseResponse(StatusCodes.UNAUTHORIZED, null, "Unauthorized!")
      );
  }
};

module.exports = authMiddleware;
