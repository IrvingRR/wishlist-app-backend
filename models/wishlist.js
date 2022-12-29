const { model, Schema } = require('mongoose');

const WishlistSchema = Schema({
    title: {
        type: String,
        require: [true, 'Titlte is required']
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        require: true
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

WishlistSchema.methods.toJSON = function() {
    const { __v, _id, ...wishlist } = this.toObject();
    wishlist.id = _id;
    return wishlist;
}

module.exports = model('Wishlist', WishlistSchema);