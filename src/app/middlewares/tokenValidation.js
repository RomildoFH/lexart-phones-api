const { verifyToken } = require('../utils/jwtFunctions');
class TokenValidation {
  validateToken(
    req,
    res,
    next,
  ) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Você precisa estar logado' });
      }
      const decoded = verifyToken(authorization);
      req.body.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    };
  };
};

module.exports = new TokenValidation();
