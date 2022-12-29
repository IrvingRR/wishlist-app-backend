const categoriesValidations = require('./categories-validations');
const usersValidations = require('./users-validations');
const generateJWT = require('./generate-jwt');
const generateRandomColor = require('./generateRandomColor');
const wishlistValidations = require('./wishlists-validations');
const giftsValidations =  require('./gifts-validations');
const searchs = require('./searchs');
const uploads = require('./uploads');
const validateCollections = require('./validate-collections');

module.exports = {
    ...categoriesValidations,
    ...usersValidations,
    ...generateJWT,
    ...generateRandomColor,
    ...wishlistValidations,
    ...giftsValidations,
    ...searchs,
    ...uploads,
    ...validateCollections
}