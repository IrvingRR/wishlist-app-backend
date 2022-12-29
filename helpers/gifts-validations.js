const { Gift } = require('../models');

const validateGiftExistWithID = async (id) => {
    const giftDB = await Gift.findById(id);

    if(!giftDB) {
        throw new Error(`Doesn't exist the gift with the id ${id}`);
    }
};

const validateGiftIsNotDeleted = async (id) => {

    const giftDB = await Gift.findById(id);

    if(giftDB?.isDeleted) {
        throw new Error(`Doesn't exist the gift with the id ${id}`);
    }
};

module.exports = {
    validateGiftExistWithID,
    validateGiftIsNotDeleted
};