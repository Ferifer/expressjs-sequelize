const { Op } = require("sequelize");
const User = require("../models/user");
const { hashPassword } = require("../common/utils/securityUtils");
const Role = require("../models/role");

class UserRepository {
  async createUser(userDto) {
    const hashedPassword = await hashPassword(userDto.password);
    await User.create({ ...userDto, password: hashedPassword });

    return null;
  }

  async getAllUsers(search) {
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const data = await User.findAll({
      attributes: ["id", "name", "email", "roleId"],
      where: whereClause,
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
          required: false,
        },
      ],
    });

    const result = data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.roleId,
      role_name: user.role ? user.role.name : null,
      lastLogin: user.lastLogin,
    }));

    return result;
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
