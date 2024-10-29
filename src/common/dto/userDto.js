class UserDto {
  constructor({ name, email, password, roleId }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
  }
}

module.exports = UserDto;
