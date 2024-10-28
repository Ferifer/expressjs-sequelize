const express = require("express");
const router = express.Router();
const userRepository = require("../repository/userRepository");
const UserDto = require("../common/dto/userDto");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");
const authMiddleware = require("../middleware/authMiddleware");

class UserController {
  async createUser(req, res) {
    const userDto = new UserDto(req.body);
    const user = await userRepository.createUser(userDto);
    res
      .status(StatusCodes.CREATED)
      .json(defaultBaseResponse(StatusCodes.CREATED, user, "Success"));
  }

  async getAllUsers(req, res) {
    const { search } = req.query;
    const users = await userRepository.getAllUsers(search);
    res
      .status(StatusCodes.OK)
      .json(defaultBaseResponse(StatusCodes.OK, users, "Success"));
  }

  async getDetailUser(req, res) {
    const user = await userRepository.getUserById(req.params.id);
    if (user === null) {
      // Return a 404 response if the user is not found
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(
          defaultBaseResponse(StatusCodes.NOT_FOUND, null, `Data not found`)
        );
    }
    res
      .status(StatusCodes.OK)
      .json(defaultBaseResponse(StatusCodes.OK, user, "Success"));
  }

  async getProfileUser(req, res) {
    const user = await userRepository.getUserById(req.userId);
    if (user === null) {
      // Return a 404 response if the user is not found
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(
          defaultBaseResponse(StatusCodes.NOT_FOUND, null, `Data not found`)
        );
    }
    res
      .status(StatusCodes.OK)
      .json(defaultBaseResponse(StatusCodes.OK, user, "Success"));
  }

  async updateUser(req, res) {
    const userDto = new UserDto(req.body);
    const user = await userRepository.updateUser(req.params.id, userDto);
    res
      .status(StatusCodes.OK)
      .json(defaultBaseResponse(StatusCodes.OK, user, "Success"));
  }

  async deleteUser(req, res) {
    const user = await userRepository.deleteUser(req.params.id);
    res
      .status(StatusCodes.OK)
      .json(defaultBaseResponse(StatusCodes.OK, user, "Success"));
  }
}

const userController = new UserController();

// routes
router.get("/profile/", authMiddleware, (req, res) =>
  userController.getProfileUser(req, res)
);
router.post("/", authMiddleware, (req, res) =>
  userController.createUser(req, res)
);
router.get("/", authMiddleware, (req, res) =>
  userController.getAllUsers(req, res)
);
router.get("/:id", authMiddleware, (req, res) =>
  userController.getDetailUser(req, res)
);
router.patch("/:id", authMiddleware, (req, res) =>
  userController.updateUser(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  userController.deleteUser(req, res)
);

module.exports = router;
