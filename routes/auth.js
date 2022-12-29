const { Router } = require('express');
const { check } = require('express-validator');
const { login, refreshToken } = require('../controllers');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'Email address is required').not().isEmpty(),
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must to have 8 characters minimum').isLength({ min: 8 }),
    validateFields
], login);

router.get('/refresh-token', [
    validateJWT,
    validateFields
], refreshToken);

module.exports = router;