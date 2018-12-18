const mongoose = require('mongoose');

const { MONGO_URL, MONGO_PORT, MONGO_USER, MONGO_PASS, MONGODB_NAME } = process.env;

let mongoURL = ''

if(MONGO_USER) 
    mongoURL =  `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${MONGODB_NAME}` 
else    
    mongoURL = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGODB_NAME}` ;

module.exports = () => {
    mongoose.connect(mongoURL, {autoReconnect: true, useNewUrlParser: true}).catch(err => {
        console.log(err);
        return err;
    });
}