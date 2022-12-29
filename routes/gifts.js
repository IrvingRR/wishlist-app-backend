const { Router } = require('express');
const { check } = require('express-validator');
const { createGift, updateGift, deleteGift, getGifts, getGift } = require('../controllers');
const { validateFields, validateJWT, validateOwnerWishlist } = require('../middlewares');
const { validateCategoryExistsWithID, validateCategoryIsNotDeleted, validateWishlistExistWithID, validateWishlistIsNotDeleted, validateGiftExistWithID, validateGiftIsNotDeleted } = require('../helpers');

const router = Router();

// Creating a new gift in a wishlist (id is the id of the wishlist)
router.post('/:id', [
    validateJWT,
    check('id', 'Invalid wishlist').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Invalid category').isMongoId(),
    check('category').custom(validateCategoryExistsWithID),
    check('category').custom(validateCategoryIsNotDeleted),
    validateFields
], createGift);

router.put('/:id/:gift_id', [
    validateJWT,
    check('id', 'Invalid wishlist').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    check('gift_id', 'Invalid ID').isMongoId(),
    check('gift_id').custom(validateGiftExistWithID),
    check('gift_id').custom(validateGiftIsNotDeleted),
    validateFields
], updateGift);

router.delete('/:id/:gift_id', [
    validateJWT,
    check('id', 'Invalid wishlist').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    check('gift_id', 'Invalid ID').isMongoId(),
    check('gift_id').custom(validateGiftExistWithID),
    check('gift_id').custom(validateGiftIsNotDeleted),
    validateFields
], deleteGift);

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid wishlist').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    validateFields
], getGifts);

router.get('/:id/:gift_id', [
    validateJWT,
    check('id', 'Invalid wishlist').isMongoId(),
    check('id').custom(validateWishlistExistWithID),
    check('id').custom(validateWishlistIsNotDeleted),
    validateOwnerWishlist,
    check('gift_id', 'Invalid ID').isMongoId(),
    check('gift_id').custom(validateGiftExistWithID),
    check('gift_id').custom(validateGiftIsNotDeleted),
    validateFields
], getGift);


module.exports = router;