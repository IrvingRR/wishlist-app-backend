const auth = require('./auth');
const categories = require('./categories');
const users = require('./users');
const wishlists = require('./wishlists');
const gifts = require('./gifts');
const searchs = require('./search');
const uploads = require('./uploads');

module.exports = {
    ...auth,
    ...categories,
    ...users,
    ...wishlists,
    ...gifts,
    ...searchs,
    ...uploads
};