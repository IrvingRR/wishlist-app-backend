const mongoose = require('mongoose');
require('dotenv').config();

const connectionDB = async () => {

    try {

        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN);
        
    } catch (error) {
        console.log('[Database error] - ', error);
        throw new Error('Error database', error);
    }

    console.log('Database connected!');

};

module.exports = { connectionDB };