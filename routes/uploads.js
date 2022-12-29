const { Router } = require('express');
const { updateFileCloudinary } = require('../controllers');
const { validateFile, validateFields } = require('../middlewares');
const { check } = require('express-validator');
const { validateCollections } = require('../helpers');

const router = Router();

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom(collection => validateCollections(collection, ['users', 'gifts'])),
    validateFields,
], updateFileCloudinary);

module.exports = router;