const {verifyToken} = require('../service/jwtService.js')

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: 'Not Authenticated'})
    }

    try{
        req.user = verifyToken(token)
        next()
    }catch(err){
        res.status(401).json({message: 'Invalid Token'});
    }
}