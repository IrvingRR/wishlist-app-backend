const { Wishlist } = require('../models');

const validateWishlistExistWithID = async (id) => {

    const wishlistDB = await Wishlist.findById(id);

    if(!wishlistDB) {
        throw new Error(`Doesn't exist the wishlist with the ID ${id}`);
    }

};

const validateWishlistIsNotDeleted = async (id) => {

    const wishlistDB = await Wishlist.findById(id);

    if(wishlistDB?.isDeleted) {
        throw new Error(`Doesn't exist the wishlist with the ID ${id}`);
    }

};

module.exports = {
    validateWishlistExistWithID,
    validateWishlistIsNotDeleted
};