const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const { generateJWT } = require('../helpers');

const login = async (req, res) => {

    try {
        
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ response: `Incorrect credentials` });
        }

        if(user.isDeleted) {
            return res.status(401).json({ response: `Incorrect credentials` });
        }

        const isEqual = bcryptjs.compareSync(password, user.password);

        if(!isEqual) {
            return res.status(401).json({ response: `Incorrect credentials` });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({ response: {
            token,
            user
        } });


    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

};

const refreshToken = async (req, res) => {

    try {
        
        const { user } = req;
        const token = await generateJWT(user.id);
    
        res.status(200).json({ 
            response: {
                token,
                user
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }

};

module.exports = {
    login,
    refreshToken
};