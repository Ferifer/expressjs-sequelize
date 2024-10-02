const { Op } = require("sequelize");
const User = require("../models/user");
const { hashPassword } = require("../common/utils/securityUtils");

class UserRepository {
  async createUser(userDto) {
    const hashedPassword = await hashPassword(userDto.password);
    await User.create({ ...userDto, password: hashedPassword });

    return null;
  }

  async getAllUsers(search) {
    const whereClause = {};

    // If a search term is provided, search in both name and email fields
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }
    const data = await User.findAll({
      attributes: ["id", "name", "email"],
      where: whereClause,
    });

    return data;
  }

  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async getUserById(id) {
    const data = await User.findByPk(id);
    return data;
  }

  async updateUser(id, userData) {
    if (userDto.password) {
      userDto.password = await hashPassword(userDto.password);
    }
    const data = await User.update(userData, { where: { id } });
    return data;
  }

  async deleteUser(id) {
    const data = await User.update(
      { deletedAt: new Date() },
      { where: { id } }
    );
    return data;
  }

  async updateAccessToken(id, accessToken, lastLogin) {
    return await User.update({ accessToken, lastLogin }, { where: { id: id } });
  }
}

module.exports = new UserRepository();
