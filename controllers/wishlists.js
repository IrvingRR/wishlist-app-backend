const { Wishlist } = require('../models');

const createWishlist = async (req, res) => {

    
    try {
        const data = req.body;
        data.user = req.user.id;

        const wishlist = new Wishlist(data);
        await wishlist.save();

        res.status(201).json({ response: wishlist })
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

};

const updateWishlist = async (req, res) => {
    
   try {
        const { id } = req.params;
        const data = req.body;

        const wishlist = await Wishlist.findByIdAndUpdate(id, data, { new: true });
        await wishlist.save();

        res.status(200).json({ response: wishlist });
   } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
   }


};

const deleteWishlist = async (req, res) => {

    try {
        
        const { id } = req.params;

        const wishlist = await Wishlist.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        await wishlist.save();

        res.status(200).json({ response: wishlist });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

}

const getWishlists = async (req, res) => {
    
    try {
        
        const { limit=5, start=0} = req.params;

        const query = {
            isDeleted: false,
            user: req.user.id
        }

        const requests = await Promise.all([
            Wishlist.find(query).skip(start).limit(limit).populate('category', 'category').populate('user', 'name'),
            Wishlist.countDocuments(query)
        ]);

        const [ wishlists, total ] = requests;

        res.status(200).json({ response:{
            total,
            wishlists
        } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

}

const getWishlist = async (req, res) => {
    try {
        const { id } = req.params;

        const wishlist = await Wishlist.findById(id).populate('category', 'category').populate('user', 'name');
        res.status(200).json({ response: wishlist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }
}

module.exports = {
    createWishlist,
    updateWishlist,
    deleteWishlist,
    getWishlists,
    getWishlist
};