const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, updateUser, getUsers, getUser, deleteUser } = require('../controllers');
const { validateEmailAlreadyExists, validateUserExistsWithID, validateUserIsNotDeleted } = require('../helpers');
const { validateFields } = require('../middlewares');

const router = Router();

// Create a new user
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(validateEmailAlreadyExists),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must to have 8 characters minimum').isLength({ min: 8 }),
    validateFields
], createUser);

// Update a user
router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateUserExistsWithID),
    check('id').custom(validateUserIsNotDeleted),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must to have 8 characters minimum').isLength({ min: 8 }),
    validateFields
], updateUser);

// Get all users (that aren't deleted)
router.get('/', getUsers);

// Get a user by id
router.get('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateUserExistsWithID),
    check('id').custom(validateUserIsNotDeleted),
    validateFields
], getUser);

// Delete a user by id
router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateUserExistsWithID),
    check('id').custom(validateUserIsNotDeleted),
    validateFields
], deleteUser);

module.exports = router;