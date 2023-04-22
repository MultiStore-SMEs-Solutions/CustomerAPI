const { generateSecret } = require("../HashFunction/security")
const jwt = require('jsonwebtoken');
const { Token } = require("../../db")


const generateToken = async (user_id) => {
    const payload = {
      user_id
    };
    const secret = generateSecret();
    const options = {
      expiresIn: '5h',
    };
    const expiresAt = new Date(Date.now() + 18000000);
    const token = jwt.sign(payload, secret, options);
    await Token.create({secret, user_id, token, expiresAt})
    return token;
}

  const validateToken = async (user_id, sendedToken ) => {
    try {
        const find = await Token.findAll({ limit: 1, where: {user_id}, order: [["createdAt", "DESC"]]})
        const secret = find[0].dataValues.secret;
        const token = find[0].dataValues.token;
        if (token !== sendedToken ) throw new Error('Token is invalid or expired, Please log in again.');
        const decoded = jwt.verify(token, secret);
        const isExpired = new Date() > new Date(decoded.exp * 1000);
        if (isExpired) throw new Error('Token is invalid or expired, Please log in again.');
            return true;
        } catch (error) {
            return false;
        }
  };

module.exports = {
    validateToken,
    generateToken
}