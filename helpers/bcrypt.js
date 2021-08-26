const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, salt);
}

function checkPassword(plainPassword, hashPassword) {
  return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = {
  hashPassword,
  checkPassword,
};
