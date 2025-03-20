const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid, deny access
    res.status(400).json({ error: "Invalid token." });
  }
};