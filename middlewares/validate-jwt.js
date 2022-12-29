const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({ response: 'Token is required' });
    };

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_TO_PRIVATE_KEY);

        const user = await User.findById(uid);

        if(!user) {
            return res.status(401).json({ response: 'Invalid token - [User does not exist in the DB]' });
        }

        if(user.isDeleted) {
            return res.status(401).json({ response: 'Invalid token - [User is deleted]' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log('[Token error]', error);
        res.status(401).json({ response: 'Invalid token' });
    }

};

module.exports = { validateJWT };