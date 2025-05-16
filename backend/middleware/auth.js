// middleware/auth.js
function checkRole(roles) {
  return (req, res, next) => {
    const user = req.user; // récupéré depuis un middleware d'auth (JWT, session, etc.)
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

module.exports = { checkRole };
