const jwt = require('jsonwebtoken');
const tok = require('../config/auth.json');

function TokenAuth(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth && auth.split(' ')[1];
  if (token === null) return res.status(401).send('Invalid Token, Unauthorized Acess');

  try {
    jwt.verify(token, tok.secret);
    next();
  } catch (err) {
    if (err) return res.status(401).send('Invalid Token, Unauthorized Acess');
  }
}
module.exports = TokenAuth;
