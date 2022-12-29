const { Router } = require('express');
const { check } = require('express-validator');
const { createWishlist, updateWishlist, deleteWishlist, getWishlists, getWishlist } = require('../controllers'); 
const { validateFields, validateJWT, validateOwnerWishlist } = require('../middlewares');
const { validateCategoryExistsWithID, validateCategoryIsNotDeleted, validateWishlistExistWithID, validateWishlistIsNotDeleted } = require('../helpers');

const router = Router();

router.post('/', [
    validateJWT,
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Category is required'),
    check('category', 'Invalid category').isMongoId(),
    check('category').custom(validateCategoryExistsWithID),
    check('category').custom(validateCategoryIsNotDeleted),
    validateFields
], createWishlist);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    validateFields
], updateWishlist);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    validateFields
], deleteWishlist);

router.get('/', [validateJWT], getWishlists);

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    validateFields
], getWishlist);

module.exports = router;