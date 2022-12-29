const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_TO_PRIVATE_KEY, {
            expiresIn: '24'
        }, (err, token) => {
            if(err) {
                reject("Token can't be generated");
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = { generateJWT };