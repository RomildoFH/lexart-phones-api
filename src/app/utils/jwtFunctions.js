import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret_token';
const configJWT = { algorithm: 'HS256', expiresIn: '24h' };

export const createJWT = (payload) =>
  jwt.sign(payload, secret, configJWT);

export const verifyToken = (token) => jwt.verify(token, secret);