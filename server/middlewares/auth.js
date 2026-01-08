const {verifyToken} = require('../service/jwtService.js')

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({message: "No token provided"})
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message: 'Malformed Token'})
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: 'Invalid / expired token'})
    }
}