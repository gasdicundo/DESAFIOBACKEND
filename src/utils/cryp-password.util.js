const bcrypt = require('bcrypt');

function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.hashedPassword);
}

module.exports = { hashPassword, isValidPassword };
