const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');
const validateOwner = require('./validate-owner');
const validateFile = require('./validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateOwner,
    ...validateFile
};