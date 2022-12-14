require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(new NotAuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-code');
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  console.log(req.user);

  next(); // пропускаем запрос дальше
};

module.exports = { auth };
