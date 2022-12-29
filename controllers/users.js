const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        
        const data = req.body;
    
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(data.password, salt);
        
        const user = new User(data);
        await user.save();

        res.status(201).json({ response: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }
};

const updateUser = async (req, res) => {
   
    try {
        
        const { id } = req.params;
        const { email, isDeleted, ...data } = req.body;
    
        if(data.password) {
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync(data.password, salt);
        }
    
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        await user.save();
    
        res.status(200).json({ response: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }
};

const getUsers = async (req, res) => {
    try {
        const { limit=5, start=0 } = req.query;
        const query = { isDeleted: false };

        const requests = await Promise.all([
            User.find(query).skip(start).limit(limit),
            User.countDocuments(query)
        ]);

        const  [users, total] = requests;

        res.status(200).json({ response: {
            total,
            users
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }
};

const getUser = async (req, res) => {
    try {
        
        const { id } = req.params;

        const user = await User.findById(id);

        res.status(200).json({ response: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }
}

const deleteUser = async (req, res) => {

    try {
        
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        await user.save();

        res.status(200).json({ response: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ response: 'Server error'});
    }

};

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser
};