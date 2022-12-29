const { Router } = require('express');
const { validateJWT, validateFields } = require('../middlewares');
const { searchs } = require('../controllers');

const router = Router();

router.get('/:collection/:term/:wishlist?', [
    validateJWT,
    validateFields
], searchs)

module.exports = router;