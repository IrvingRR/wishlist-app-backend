const { searchUsers, searchCategories, searchGifts, searchWishlists } = require('../helpers');

const validCollections = [
    'users',
    'categories',
    'gifts',
    'wishlists'
];

const searchs = async (req, res) => {

  
    const { collection, term, wishlist } = req.params;

    if(!validCollections.includes(collection)) {
        return res.status(400).json({ response: `Invalid collection, only you can use the next collections: ${ validCollections }` });
    };

    switch (collection) {

        case('users'):
            searchUsers(term, res);
        break;

        case('categories'):
            searchCategories(term, req, res);
        break;

        case('gifts'):
            searchGifts(term, res, wishlist);
        break;

        case('wishlists'):
            searchWishlists(term, req, res);
        break;
    
        default:
            break;
    }

    
};

module.exports = { searchs }