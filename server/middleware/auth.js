const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization?.split(' ')[1];
  if (!header) return res.status(401).end();
  try {
    const { id } = jwt.verify(header, process.env.JWT_SECRET);
    req.userId = id;
    next();
  } catch {
    res.status(401).end();
  }
};
