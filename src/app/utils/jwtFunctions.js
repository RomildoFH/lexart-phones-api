const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret_token';
const configJWT = { algorithm: 'HS256', expiresIn: '24h' };

exports.createJWT = (payload) =>
  jwt.sign(payload, secret, configJWT);

exports.verifyToken = (token) => jwt.verify(token, secret);