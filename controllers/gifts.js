const { Gift } = require('../models');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const createGift = async (req, res) => {
    
    try {
        
        const { id } = req.params; // ID of the wishlist where we want to save the gift
        const data = req.body;
        data.wishlist = id;

        if(req.files?.image) {
            
            const { tempFilePath } = req.files.image;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
            data.image = secure_url;
        }

        const gift = new Gift(data);
        await gift.save();

        res.status(201).json({ response: gift });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }

};

const updateGift = async (req, res) => {

    try {

        const { gift_id } = req.params;
        const data = req.body;

        const gift = await Gift.findByIdAndUpdate(gift_id, data, { new: true });
        await gift.save();

        res.status(200).json({ response: gift });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
};

const deleteGift = async (req, res) => {
    try {

        const { gift_id } = req.params;

        const gift = await Gift.findByIdAndUpdate(gift_id, { isDeleted: true }, { new: true });
        await gift.save();

        res.status(200).json({ response: gift });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
}

const getGifts = async (req, res) => {
    try {
        
        const { id, limit=5, start=0, } = req.params;

        const query = {
            isDeleted: false,
            wishlist: id
        };

        const requests = await Promise.all([
            Gift.find(query).skip(start).limit(limit).populate('category', 'category').populate('wishlist', 'title'),
            Gift.countDocuments(query)
        ]);

        const [gifts, total] = requests;

        res.status(200).json({
            response: { total, gifts }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
}

const getGift = async (req, res) => {
    try {

        const { gift_id } = req.params;
        const gift = await Gift.findById(gift_id).populate('category', 'category').populate('wishlist', 'title');

        res.json({ response: gift });        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error' });
    }
}

module.exports = {
    createGift,
    updateGift,
    deleteGift,
    getGifts,
    getGift
};