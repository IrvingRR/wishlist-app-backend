const { model, Schema } = require('mongoose');

const GiftSchema = Schema({

    title: {
        type: String,
        require: [true, 'Title is required']
    },

    url: {
        type: String,
        default: 'No url'
    },

    price: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/gift-icon.png'
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        require: true
    }, 

    wishlist: {
        type: Schema.Types.ObjectId,
        ref: 'Wishlist', 
        require: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

});

GiftSchema.methods.toJSON = function() {
    const { __v, _id, ...gift } = this.toObject();
    gift.id = _id;
    return gift;
}

module.exports = model('Gift', GiftSchema);