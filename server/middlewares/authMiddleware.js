
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    let token
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            next();
        } catch (error) {
            if (!token) {
                res.status(401)
                throw new Error("Not Authorized, no token provided")
            }
        }
    }
}

module.exports = authMiddleware 