const cloudinary = require('cloudinary').v2;
const { User, Gift } = require('../models');

cloudinary.config( process.env.CLOUDINARY_URL );

const updateFileCloudinary = async (req, res) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({ response: `Doesn't exist the user with the id ${id}` })
            }
        break;

        case 'gifts':
            model = await Gift.findById(id);
            if(!model) {
                return res.status(400).json({ response: `Doesn't exist the gift with the id ${id}` })
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Invalid collection' });
    };

    if(model.image) {
        const nameArray = model.image.split('/');
        const name = nameArray[nameArray.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    };

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;

    await model.save();
    res.status(200).json({ response: model });

};

module.exports = {
    updateFileCloudinary
};
