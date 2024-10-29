const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("./user"); // Import User to establish association

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    timestamps: true,
  }
);

module.exports = Role;
