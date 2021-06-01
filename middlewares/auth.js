const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: 'Must provide an authorization header' });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, "lkja89jdfopaw98mudwa3", async (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Invalid token' });
      return;
    }
    req.user = decoded; 
    next();
  });
}
exports.auth = auth;


function isSameUser(req, res, next) {
  if (req.body.userId !== req.params.userId) {
    res.status(403).send({ message: 'Only the same user can access' });
    return;
  }
  next();
}
exports.isSameUser = isSameUser;