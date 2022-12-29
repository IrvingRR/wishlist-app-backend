const { Category } = require('../models');

const validateCategoryAlreadyExists = async (category) => {

    if(category) {
        const regex = new RegExp(category, 'i');
    
        const categoryDB = await Category.findOne({ category: regex });
        
        if(categoryDB) {
            throw new Error(`The category ${ category } is already exists`);
        }
    }

};

const validateCategoryExistsWithID = async (id) => {

    const categoryDB = await Category.findById(id);

    if(!categoryDB) {
        throw new Error(`Doesn't exist the category with the ID ${id}`);
    }

};

const validateCategoryIsNotDeleted = async (id) => {

    const categoryDB = await Category.findById(id);

    if(categoryDB?.isDeleted) {
        throw new Error(`Doesn't exist the category with the ID ${id} [Is deleted]`);
    }

};

module.exports = {
    validateCategoryAlreadyExists,
    validateCategoryExistsWithID,
    validateCategoryIsNotDeleted,
};