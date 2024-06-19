const jwt = require('jsonwebtoken');
const accessToken = process.env.ACCESS_TOKEN_SECRET 

const authMiddleware = (req, res, next) => {
    if (req.header('Authorization')){
        const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, accessToken);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
    }
    else{
        res.status(401).send({ error: 'Unauthorized token' });
    }
};

module.exports = authMiddleware;