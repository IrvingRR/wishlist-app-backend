const { Category, Wishlist } = require('../models');

const validateOwnerCategory = async (req, res, next) => {

    try {
        const { id } = req.params;
    
        const categoryDB = await Category.findById(id);

        if(categoryDB){
            if(categoryDB.user != req.user.id) {
                return res.status(401).json("You don't have authorization to do this action");
            }
        }

        next();
    } catch (error) {
        console.log('[Token error]', error);
        res.status(401).json({ response: 'Invalid token' });
    }
};

const validateOwnerWishlist = async (req, res, next) => {

    try {
        const { id } = req.params;
    
        const wishlistDB = await Wishlist.findById(id);

        if(wishlistDB) {

            if(wishlistDB.user != req.user.id) {
                return res.status(401).json("You don't have authorization to do this action");
            }

        }

        next();
    } catch (error) {
        console.log('[Token error]', error);
        res.status(401).json({ response: 'Invalid token' });
    }
};

module.exports = {
    validateOwnerCategory,
    validateOwnerWishlist
};