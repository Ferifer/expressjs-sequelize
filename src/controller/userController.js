const express = require("express");
const router = express.Router();
const userRepository = require("../repository/userRepository");
const UserDto = require("../common/dto/userDto");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");
const authMiddleware = require("../middleware/authMiddleware");
const transporter = require("../config/nodeMailerConfig.js");
const renderTemplate = require("../email/render/renderTemplate.js"); // Utility function to render React components to HTML
const WelcomeEmail = require("../email/emailTemplates/WelcomeEmail.jsx"); // Import the .jsx file

require("dotenv").config(); // Load environment variables

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

  async sendEmailToUser(req, res) {
    const {
      name,
      email,
      ticket_type,
      ticket_name,
      address,
      open_gate,
      close_gate,
      total_payment,
    } = req.body;

    const htmlContent = renderTemplate(WelcomeEmail, {
      name,
      ticket_type,
      ticket_name,
      address,
      open_gate,
      close_gate,
      total_payment,
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Our Service!",
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Welcome email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send welcome email." });
    }
  }
}

const userController = new UserController();

// routes
router.get("/profile/", authMiddleware, (req, res) =>
  userController.getProfileUser(req, res)
);
router.post("/send/", (req, res) => userController.sendEmailToUser(req, res));

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
