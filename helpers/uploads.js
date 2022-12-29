const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFiles = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    
    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        if(!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is invalid`);
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', folder, tempName);

        file.mv(uploadPath, (error) => {
            if(error) {
                reject(error);
            }

            resolve(tempName);
        })
    }); 

};

module.exports = {
    uploadFiles
};