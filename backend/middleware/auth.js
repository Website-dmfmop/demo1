const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Malformed token' });

    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.user = decoded;
        
        // Inject super delegate status
        const RolePermission = require('../models/RolePermission');
        if (decoded.role === 'SUPER_ADMIN') {
            req.user.isSuperDelegate = true;
        } else {
            try {
                const perm = await RolePermission.findOne({ role: decoded.role });
                req.user.isSuperDelegate = perm ? perm.canViewAllTasks : false;
            } catch (e) {
                req.user.isSuperDelegate = false;
            }
        }
        
        next();
    });
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        
        const isStrict = roles.includes('SUPER_ADMIN_STRICT');
        if (isStrict) {
            if (req.user.role !== 'SUPER_ADMIN') {
                return res.status(403).json({ error: 'Forbidden: Strict Super Admin privileges required' });
            }
            return next();
        }

        const roleAllowed = roles.includes(req.user.role);
        const delegateAllowed = req.user.isSuperDelegate && roles.includes('SUPER_ADMIN');

        if (!roleAllowed && !delegateAllowed) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

module.exports = { verifyToken, restrictTo };
