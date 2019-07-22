const jwt = require('jsonwebtoken');
const config = require('../util/config');

module.exports = (req, res, next) => {
    try {
        //console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const decodedToken = jwt.verify(token, config.secret);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Authorization failed."
        });
    }
};