const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, updateCategory, deleteCategory, getCategories, getCategory } = require('../controllers');
const { validateCategoryAlreadyExists, validateCategoryExistsWithID, validateCategoryIsNotDeleted } = require('../helpers');
const { validateFields, validateJWT, validateOwnerCategory } = require('../middlewares');


const router = Router();

router.post('/', [
    validateJWT,
    check('category', 'Category is required').not().isEmpty(),
    check('category').custom(validateCategoryAlreadyExists),
    validateFields
], createCategory);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateCategoryExistsWithID),
    check('id').custom(validateCategoryIsNotDeleted),
    validateOwnerCategory,
    check('category', 'Category is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('color', 'Color is required').not().isEmpty(),  
    validateFields
], updateCategory);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateCategoryExistsWithID),
    check('id').custom(validateCategoryIsNotDeleted),
    validateOwnerCategory,
    validateFields
], deleteCategory);

router.get('/', [validateJWT], getCategories);

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateCategoryExistsWithID),
    check('id').custom(validateCategoryIsNotDeleted),
    validateOwnerCategory,
], getCategory)

module.exports = router;