const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("test", authorization);

  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      } else {
        req.token = payload;
        next();
      }
    });
  } else {
    res.status(403).json({ success: false, message: "Forbidden" });
  }
};

module.exports = authentication;
