// middleware/role.js
module.exports = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !req.user.role) return res.status(403).json({ error: 'No user role found' });
  if (allowedRoles.includes(req.user.role)) return next();
  return res.status(403).json({ error: 'Access denied: insufficient permissions' });
};
