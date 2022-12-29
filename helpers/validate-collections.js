const validateCollections = (collection = '', collections = []) => {
    const isCollectionValid = collections.includes(collection);

    if(!isCollectionValid) {
        throw new Error(`Collection ${collection} is not allowed: ${collections}`);
    }

    return true;
};

module.exports = {
    validateCollections
};