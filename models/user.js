const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: { 
        type: String,
         require: [ true, 'Name is required' ] 
        },

    email: { 
        type: String, 
        require: [ true, 'Email address is required' ], 
        unique: true 
    },

    password: { 
        type: String, 
        require: [ true, 'Password is required' ] 
    },

    image: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
}

module.exports = model('User', UserSchema);