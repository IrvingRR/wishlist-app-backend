const { model, Schema } = require('mongoose');
const { generateRandomColor } = require('../helpers/generateRandomColor');

const CategorySchema = Schema({

    category: {
        type: String,
        require: [true, 'Category is required']
    },

    description: {
        type: String,
        default: 'No description'
    },

    color: {
        type: String,
        default:  generateRandomColor()
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        require: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.id = _id;
    return category;
}

module.exports = model('Category', CategorySchema);