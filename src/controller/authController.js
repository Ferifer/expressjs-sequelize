const express = require("express");
const router = express.Router();
const userRepository = require("../repository/userRepository");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");
const { checkPassword } = require("../common/utils/securityUtils");
const { generateToken } = require("../common/utils/jwtUtils");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(StatusCodes.NOT_FOUND, null, "email not found")
          );
      }

      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(StatusCodes.NOT_FOUND, null, "Invalid password")
          );
      }
      // Generate the access token
      const accessToken = generateToken(user.id);
      const lastLogin = new Date();
      await userRepository.updateAccessToken(user.id, accessToken, lastLogin);

      res.status(StatusCodes.OK).json(
        defaultBaseResponse(
          StatusCodes.OK,
          {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
          },
          "Login successful"
        )
      );
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(defaultBaseResponse(false, null, "An error occurred"));
    }
  }
}

const authController = new AuthController();

// Define routes here
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
