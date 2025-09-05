const jwt = require("jsonwebtoken")

exports.verifyToken =  async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "No token provided"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded //{id, role}
    } catch (error) {
        return res.status(500).json({message: "Token Expired or Invalid"})
    }
}


exports.requireRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(401).json({message: "unauthorized"})
        }

        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message: "You don't and can never have access to this resource"})
        }

        next()
    }
}