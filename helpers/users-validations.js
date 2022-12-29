const { User } = require('../models');

const validateEmailAlreadyExists = async (email = '') => {

    const userDB = await User.findOne({ email });

    if(userDB) {
        throw new Error(`Sorry, the user with the email address ${ email } is already exists`);
    }

};

const validateUserExistsWithID = async (id) => {

    const userDB = await User.findById(id);

    console.log(userDB);

    if(!userDB) {
        throw new Error(`Doesn't exist the user with the ID ${id}`);
    }

};

const validateUserIsNotDeleted = async (id) => {

    const userDB = await User.findById(id);

    if(userDB?.isDeleted) {
        throw new Error(`Doesn't exist the user with the ID ${id}`);
    }

}

module.exports = {
    validateEmailAlreadyExists,
    validateUserExistsWithID,
    validateUserIsNotDeleted
};