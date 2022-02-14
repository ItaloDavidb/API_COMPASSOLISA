const tok = require('../config/auth.json');
const jwt = require('jsonwebtoken');
function TokenAuth(req,res,next){
  const auth = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];
  if(token === null) return res.status(401).send('Unauthorized Access');

  try {
    jwt.verify(token, tok.secret);
    next();
  } catch(err) {
    if(err) return res.status(401).send('Invalid Token, Unauthorized Acess');
  }
}
module.exports = TokenAuth;
// (data) =>{
//     if(data) return res.status(403);
//     console.log(data);
//     // if(!data) return res.status(401).send('Unauthorized Access');
//     next();
//   } );
// jwt.verify(token, 'wrong-secret', function(err, decoded) {
//     // err
//     // decoded undefined
//   });