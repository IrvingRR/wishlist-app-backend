const { ObjectId } = require('mongoose').Types;
const { User, Category, Gift, Wishlist } = require('../models');

const searchUsers = async (term, res) => {
    
    try {

        const isMongoId = ObjectId.isValid(term);

        if(isMongoId) {
            const user = await User.findById(term);

            return res.status(200).json({
                response: user ? [user] : []
            });
        }

        const regex = new RegExp(term, 'i');

        const query = {
            $or: [{ name: regex }, { email: regex }],
            $and: [{ isDeleted: false }]
        };

        const requests = await Promise.all([
            User.find(query),
            User.countDocuments(query)
        ]);

        const [ users, total ] = requests;
        
        res.status(200).json({ response: { total, users } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
};

const searchCategories = async (term, req, res) => {
    
    try {

        const isMongoId = ObjectId.isValid(term);

        if(isMongoId) {
            const category = await Category.findById(term).populate('user', 'name');
            return res.status(200).json({
                response: category ? [category] : []
            });
        }

        const regex = new RegExp(term, 'i');

        const query = {
            $or: [{ category: regex }],
            $and: [{ isDeleted: false }, { user: req.user.id }]
        }

        const requests = await Promise.all([
            Category.find(query).populate('user', 'name'),
            Category.countDocuments(query)
        ]);

        const [categories, total] = requests;

        res.status(200).json({ response: {
            total, categories
        } });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
}

const searchGifts = async (term, res, wishlist) => {
    
    try {

        const isMongoId = ObjectId.isValid(term);

        if(isMongoId) {
            const gift = await Gift.findById(term).populate('category', 'category').populate('wishlist', 'title');
            return res.status(200).json({
                response: gift ? [gift] : []
            });
        }

        const regex = new RegExp(term, 'i');

        const query = {
            $or: [{ title: regex }],
            $and: [{ isDeleted: false }, { wishlist: wishlist }]
        };

        const requests = await Promise.all([
            Gift.find(query).populate('category', 'category').populate('wishlist', 'title'),
            Gift.countDocuments(query)
        ]);

        const [ gifts, total ] = requests;

        res.status(200).json({
            response: { total, gifts }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }

};

const searchWishlists = async (term, req, res) => {
    
    try {

        const isMongoId = ObjectId.isValid(term);

        if(isMongoId) {
            const wishlist = await Wishlist.findById(term).populate('category', 'category').populate('user', 'name');
            return res.status(200).json({
                response: wishlist ? [wishlist] : []
            });
        }

        const regex = new RegExp(term, 'i');

        const query = {
            $or: [{ title: regex }],
            $and: [{ isDeleted: false }, { user: req.user.id }]
        }

        const requests = await Promise.all([
            Wishlist.find(query).populate('category', 'category').populate('user', 'name'),
            Wishlist.countDocuments(query)
        ]);

        const [wishlists, total] = requests;

        res.status(200).json({ response: {
            total, wishlists
        } });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }

};

module.exports = {
    searchUsers,
    searchCategories,
    searchGifts,
    searchWishlists
};