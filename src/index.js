const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("../src/config/databaseConfig");
const userRoutes = require("../src/controller/userController");
const productRoutes = require("../src/controller/productController");
const authRoutes = require("../src/controller/authController");
const User = require("./models/user");
const Role = require("./models/role");
require("@babel/register")({
  extensions: [".js", ".jsx"], // This allows Babel to transpile .js and .jsx files
});

const app = express();
app.use(bodyParser.json());

// Use the routes from the controllers
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

const syncDb = process.env.DB_SYNC === "true";

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      if (syncDb) {
        console.log("Database synchronized.");
      } else {
        console.log("Database sync is disabled.");
      }
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
