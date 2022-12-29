require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connectionDB } = require('../db/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            categories: '/api/v1/categories',
            wishlists: '/api/v1/wishlists',
            gifts: '/api/v1/gifts',
            searchs: '/api/v1/searchs',
            uploads: '/api/v1/uploads'
        };

        // Connect with the database
        this.databaseConnection();

        // Middlewares
        this.middlewares();

        // Application routes
        this.routes();

    };

    async databaseConnection() { await connectionDB() };


    // Middlewares
    middlewares() {
        this.app.use(cors()); // CORS
        this.app.use( express.json() ); // Parse and read of the body
        // this.app.use(express.static('public')); // Public directoy
        this.app.use(fileUpload({ // Fileupload - Load files
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    // Routes
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.wishlists, require('../routes/wishlists'));
        this.app.use(this.paths.gifts, require('../routes/gifts'));
        this.app.use(this.paths.searchs, require('../routes/searchs'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen at: http://localhost:${this.port}`);
        });
    }
    

};

module.exports = Server;