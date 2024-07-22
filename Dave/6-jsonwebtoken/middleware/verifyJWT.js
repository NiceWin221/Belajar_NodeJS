const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStaus(401); // Unauthorized
  // bearer token
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStaus(403); // Forbidden invalid token
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
