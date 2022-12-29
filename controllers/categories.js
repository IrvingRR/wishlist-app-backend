const { Category } = require('../models');

const createCategory = async (req, res) => {

    try {

        const data = req.body;
        data.user = req.user.id;

        const category = new Category(data);
        await category.save();

        res.status(201).json({ response: category });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

};

const updateCategory = async (req, res) => {

    try {
    
        const { id } = req.params;
        const data = req.body;

        const category = await Category.findByIdAndUpdate(id, data, { new: true });

        res.json({ response: category });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

}

const deleteCategory = async (req, res) => {

    try {
        
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        await category.save();
    
        res.json({ response: category });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

};

const getCategories = async (req, res) => {

    try {
        const { limit=5, start=0 } = req.query;
        const query = { isDeleted: false, user: req.user.id };

        const requests = await Promise.all([
            Category.find(query).skip(start).limit(limit).populate('user', 'name'),
            Category.countDocuments(query)
        ]);

        const  [categories, total] = requests;

        res.status(200).json({ response: {
            total,
            categories
        }});

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

};

const getCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const category = await Category.findById(id).populate('user', 'name');

        res.status(200).json({ response: category });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory
};