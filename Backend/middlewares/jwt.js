const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // first check request has auth or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the jwt token from the request header

  const token = req.headers.authorization.split(" ")[1];
  // console.log("token", token);
  if (!token) return res.status(401).json({ error: "unauthorized" });

  try {
    // Verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user information to the request object
    req.user = decoded; // req.userdata(any)->(usually conatain userID)
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "invalid token" });
  }
};

const genrateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { genrateToken, jwtAuthMiddleware };
