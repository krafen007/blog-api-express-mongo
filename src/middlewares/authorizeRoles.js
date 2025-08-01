// Middleware to allow access only for admin

const authorizeRoles = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }
};

export default authorizeRoles;
